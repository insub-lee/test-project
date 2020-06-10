import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import { Icon, Spin } from 'antd';

import StyledEvaluationForm from 'apps/wts/components/CommonStyledElement/StyledEvaluationForm';
import Button from 'components/Button';
import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import StyledRadio from 'apps/wts/components/RadioGroup/StyledRadio';
import { shuffleArray, jsonToQueryString } from 'utils/helpers';

import moment from 'moment';
import StyledContent from './StyledContent';
import service from '../service';

class JobProcEduViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: true,
      collseq: -1,
      empno: '',
      testForm: [],
      testResult: [],
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.initData = this.initData.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  handleOpenModal(collseq, empno) {
    this.setState({ isOpen: true, collseq, empno });
    this.initData(collseq, empno);
    // Get Form Data
  }

  handleCloseModal() {
    this.setState({ isOpen: false, collseq: -1, empno: '' });
  }

  handleAfterOpen() {}

  initData(collseq, empno) {
    this.getTestForm(collseq, empno).then(({ isError, testForm, testResult }) => {
      if (!isError) {
        this.setState({ testForm, testResult });
      } else {
        console.error('@Result', testForm, testResult);
      }
    });
  }

  getTotalScore() {}

  submitData(e) {
    e.preventDefault();
    const { testForm, collseq } = this.state;
    const { empno } = this.props;
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    let index = 0;
    const invalidAnswer = testForm.some((answer, answerIndex) => {
      if (!data[`answer-${answerIndex}`]) {
        index = answerIndex + 1;
      }
      return !data[`answer-${index}`];
    });
    if (invalidAnswer) {
      alert(`${index}번 문제를 풀어주세요.`);
      return;
    }
    if (window.confirm('답안을 제출하시겠습니까?')) {
      const testResult = testForm.map((answer, answerIndex) => ({
        ...answer,
        selectedAnswer: data[`answer-${answerIndex}`],
      }));
      const totalScore = testResult
        .map(({ selectedAnswer, correctAnswer, total }) => (selectedAnswer === correctAnswer ? total : 0))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const payload = {
        type: 'insEduJobChkList',
        chkdt: moment(new Date()).format('YYYYMMDD'),
        regdt: moment(new Date()).format('YYYYMMDD'),
        empNo: empno,
        usrId: empno,
        study: 'job_proc',
        collseq,
        chk_content: JSON.stringify(testResult),
        tot_score: totalScore,
        job_chk_result: totalScore >= 90 ? 'O' : 'X',
      };
      this.postData(payload).then(result => {
        if (result) {
          this.handleCloseModal();
          this.props.callbackHandler();
        } else {
          alert('등록하는 과정에서 오류가 발생했습니다.');
        }
      });
    }
  }

  checkHint(parentNodeId, correct) {
    const parentNode = document.querySelector(`#${parentNodeId}`);
    const dataAsk = parentNode.getAttribute('data-ask');
    if (!correct && Number(dataAsk) < 1) {
      alert('현재 선택한 답은 틀립니다. 다시 한번 선택해주세요.');
      parentNode.setAttribute('data-ask', (Number(dataAsk) + 1).toString());
    }
  }

  async postData(payload) {
    const { response, error } = await service.manage.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
  }

  async getTestForm(collseq, empNo) {
    const requestQuery = {
      type: 'getJobProcTestForm',
      collseq,
      empNo,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.user.get(queryString);
    if (response && !error) {
      const { jobProcTestForm, jobProcTestResult } = response;
      return {
        testForm: JSON.parse(jobProcTestForm.chk_content || []).map(question => ({
          ...question,
          originAnswers: question.answers,
          answers: shuffleArray(question.answers),
        })),
        testResult: JSON.parse(jobProcTestResult ? jobProcTestResult.chk_content || '[]' : '[]'),
        isError: false,
      };
    }
    return {
      isError: true,
    };
  }

  render() {
    const { isOpen, jobProcTestForm, testForm, testResult } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 1000,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledContent>
            <div className="pop_tit">
              공정 교육
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con" style={{ background: '#ebf0f6' }}>
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={false}>
                <StyledCommonForm onSubmit={this.submitData} autoComplete="off">
                  <StyledEvaluationForm>
                    <div className="assessment">
                      <ul className="assessWrap">
                        {testResult.length > 0 &&
                          testResult.map((row, rowIndex) => (
                            <li key={row.title} id={`test-${rowIndex}-list`} data-ask="0">
                              <div className="question">
                                <span className="point">Q</span>
                                {row.title}
                                <span>{`(${row.total || 0}점)`}</span>
                              </div>
                              <ul>
                                {row.answers.map((answer, answerIndex) => (
                                  <li key={answer} data-ask="0">
                                    <StyledRadio fullWidth noPadding>
                                      <label
                                        htmlFor={`${rowIndex}-${answerIndex}`}
                                        className="radio"
                                        style={answer === row.correctAnswer ? { background: 'rgba(22, 181, 204, 0.7)', color: 'white' } : {}}
                                      >
                                        <input
                                          type="radio"
                                          id={`${rowIndex}-${answerIndex}`}
                                          name={`answer-${rowIndex}`}
                                          value={answer}
                                          style={{ display: 'none' }}
                                          checked={answer === row.selectedAnswer}
                                          disabled
                                        />
                                        <span />
                                        {`${answerIndex + 1}. ${answer}`}
                                      </label>
                                    </StyledRadio>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        {testResult.length < 1 &&
                          testForm.map((row, rowIndex) => (
                            <li key={row.title} id={`test-${rowIndex}-list`} data-ask="0">
                              <div className="question">
                                <span className="point">Q</span>
                                {row.title}
                                <span>{`(${row.total || 0}점)`}</span>
                              </div>
                              <ul>
                                {row.answers.map((answer, answerIndex) => (
                                  <li key={answer} data-ask="0">
                                    <StyledRadio fullWidth noPadding>
                                      <label htmlFor={`${rowIndex}-${answerIndex}`} className="radio">
                                        <input
                                          type="radio"
                                          id={`${rowIndex}-${answerIndex}`}
                                          name={`answer-${rowIndex}`}
                                          value={answer}
                                          style={{ display: 'none' }}
                                          onChange={() => this.checkHint(`test-${rowIndex}-list`, answer === row.correctAnswer)}
                                        />
                                        <span />
                                        {`${answerIndex + 1}. ${answer}`}
                                      </label>
                                    </StyledRadio>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </StyledEvaluationForm>
                  <div className="btn_wrap">
                    {!(testResult.length > 0) && (
                      <Button type="submit" size="small" color="primary">
                        제출하기
                      </Button>
                    )}
                  </div>
                </StyledCommonForm>
              </Spin>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

JobProcEduViewer.propTypes = {
  callbackHandler: PropTypes.func,
  collseq: PropTypes.number,
  empno: PropTypes.string,
};

JobProcEduViewer.defaultProps = {
  callbackHandler: () => {},
  collseq: -1,
  empno: '',
};

export default JobProcEduViewer;
