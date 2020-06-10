import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
// import { debounce } from 'lodash';
import { Icon, Spin } from 'antd';
import { fromJS } from 'immutable';

import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import Button from 'components/Button';
import { jsonToQueryString } from 'utils/helpers';
import StyledEvaluationForm from 'apps/wts/components/CommonStyledElement/StyledEvaluationForm';
import service from '../service';
import StyledContent from './StyledContent';

class EvaluationFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      questions: fromJS([]),
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
    this.getTotalQuestionScore = this.getTotalQuestionScore.bind(this);
    this.getTotalScore = this.getTotalScore.bind(this);
    this.getFinalScore = this.getFinalScore.bind(this);
  }

  handleOpenModal(planseq, empno, step) {
    const { site } = this.props;
    console.debug('@@@@@ TEST : >>> ', site);
    this.setState({ isOpen: true, planseq, empno, step }, () => {
      this.getQuestions(planseq, empno, step, site);
    });
  }

  getQuestions(planseq, empno, step, site) {
    this.setState({ isLoading: true }, () => {
      this.fetchData(planseq, empno, step, site).then(({ data, isFinished, isError, checked }) => {
        if (!isError) {
          this.setState({ questions: fromJS(data), isLoading: false, isFinished, checked });
        } else {
          alert('시험지를 생성하는 과정에서 오류가 발생했습니다.');
          this.handleCloseModal();
        }
      });
    });
  }

  handleChangeAnswer(index, answer) {
    this.setState(prevState => {
      const { questions } = prevState;
      this.setState({ questions: questions.setIn([index, 'answer'], answer) });
    });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  async fetchData(planseq, empno, step, site, jobType = 'job_common') {
    const requestQuery = {
      type: 'evaluationForm',
      planSeq: planseq,
      empNo: empno,
      searchStep: step,
      searchSite: site,
      jobType,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.user.get(queryString);
    if (response && !error) {
      const { evalutaionForm, isFinished } = response;
      return {
        data: JSON.parse(evalutaionForm.form_content),
        isFinished,
        checked: isFinished && !!evalutaionForm.tot_score,
      };
    }
    return {
      isError: true,
    };
  }

  async postData(payload) {
    const { response, error } = await service.user.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
  }

  handleClickSubmit() {
    const { questions, planseq, empno, step } = this.state;
    const questionsJS = questions.toJS();
    let noAnswerQuestionNumber = -1;
    const hasNoAnswer = questionsJS.some((question, index) => {
      if (!question.answer || question.answer.trim() === '') {
        noAnswerQuestionNumber = index + 1;
        return true;
      }
      return false;
    });
    if (hasNoAnswer) {
      alert(`${noAnswerQuestionNumber}번 문제의 답변이 비어있습니다.`);
    } else if (window.confirm('제출하시겠습니까?')) {
      console.debug('## => 제출', questionsJS);
      const payload = {
        type: 'insEvalForm',
        empno,
        step_level: step,
        form_content: JSON.stringify(questionsJS),
        plan_seq: planseq,
      };
      this.postData(payload).then(result => {
        if (result) {
          alert('답안을 제출하였습니다.');
          this.handleCloseModal();
          this.props.callbackHandler();
        } else {
          alert('답안을 제출하는 과정에서 오류가 발생했습니다.');
        }
      });
    }
  }

  getTotalQuestionScore() {
    const { questions } = this.state;
    const numbers = questions.toJS().map(question => question.q_score);
    return numbers.reduce((accumulator, next) => accumulator + next, 0);
  }

  getTotalScore() {
    const { questions } = this.state;
    const numbers = questions.toJS().map(question => question.score || 0);
    return numbers.reduce((accumulator, next) => accumulator + next, 0);
  }

  getFinalScore() {
    return (this.getTotalScore() / this.getTotalQuestionScore()) * 100;
  }

  render() {
    const { isOpen, isLoading, questions, isFinished, checked } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 750,
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
              평가 수행
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <StyledCommonForm onSubmit={e => e.preventDefault()} autoComplete="off">
                  <StyledEvaluationForm>
                    <div className="assessment">
                      <ul className="assessWrap">
                        {questions.map((question, index) => (
                          <li key={question.get('seq')}>
                            <div className="question">
                              <span className="point">Q</span>
                              {`${index + 1}. ${question.get('q_content')} `}
                              <span>{`(${question.get('q_score') || 0}점)`}</span>
                              {checked && (
                                <div className="score">
                                  <input
                                    type="number"
                                    className="number"
                                    value={question.get('score')}
                                    name={`a${index}_score`}
                                    min={0}
                                    max={question.get('q_score')}
                                    readOnly
                                  />
                                  점
                                </div>
                              )}
                            </div>
                            <div className="text">
                              {isFinished ? (
                                <p>{question.get('answer')}</p>
                              ) : (
                                <textarea
                                  name={`a${index}_content`}
                                  rows="5"
                                  placeholder="내용을 작성해주세요. (300자 내)"
                                  maxLength={300}
                                  onChange={e => this.handleChangeAnswer(index, e.target.value)}
                                />
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                      {checked && (
                        <div className="score_board">
                          {`(${this.getTotalScore()}/${this.getTotalQuestionScore()})`}{' '}
                          <span
                            style={{ color: this.getFinalScore() >= 90 ? 'rgba(31, 181, 173, 0.8)' : 'red', fontSize: '20px' }}
                          >{`${this.getFinalScore()}점`}</span>
                        </div>
                      )}
                      {!isFinished && (
                        <div className="btn_wrap">
                          <Button type="button" size="small" color="primary" onClick={this.handleClickSubmit}>
                            제출하기
                          </Button>
                        </div>
                      )}
                    </div>
                  </StyledEvaluationForm>
                </StyledCommonForm>
              </Spin>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

EvaluationFormModal.propTypes = {
  callbackHandler: PropTypes.func,
  site: PropTypes.string,
};

EvaluationFormModal.defaultProps = {
  callbackHandler: () => false,
  site: '',
};

export default EvaluationFormModal;
