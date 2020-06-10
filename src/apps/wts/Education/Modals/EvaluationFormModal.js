import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
// import { debounce } from 'lodash';
import { Icon, Spin } from 'antd';
import { fromJS } from 'immutable';

import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import Button from 'components/Button';
import { jsonToQueryString } from 'utils/helpers';
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
    this.handleChangeScore = this.handleChangeScore.bind(this);
    this.getResultScore = this.getResultScore.bind(this);
  }

  handleOpenModal(planseq, empno, step, site, jobType = 'job_common', area) {
    this.setState({ isOpen: true, planseq, empno, step, site, jobType, area }, () => {
      this.getQuestions(planseq, empno, step, site, jobType);
    });
  }

  getQuestions(planseq, empno, step, site, jobType) {
    this.setState({ isLoading: true }, () => {
      this.fetchData(planseq, empno, step, site, jobType).then(({ data, isFinished, isError, checked }) => {
        if (!isError) {
          this.setState({ questions: fromJS(data), isLoading: false, isFinished, checked });
        } else {
          alert('시험지를 생성하는 과정에서 오류가 발생했습니다.');
          this.handleCloseModal();
        }
      });
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

  async updateData(payload) {
    const { response, error } = await service.user.put(payload);
    if (response && !error) {
      const { updateyn } = response;
      return updateyn;
    }
    return false;
  }

  handleClickSubmit() {
    const { questions, planseq, empno, step, isFinished, jobType, area } = this.state;
    const questionsJS = questions.toJS();
    // const result = this.getResultScore() >= 90 ? 'O' : 'X';
    const noCheckedData = questionsJS.some(row => row.total && !row.result);
    if (noCheckedData) {
      alert('평가하지 않은 항목이 있습니다.');
    } else if (window.confirm('제출하시겠습니까?')) {
      const payload = {
        type: isFinished ? 'updateEduEvaluationForm' : 'insEvalForm',
        empno,
        step_level: step,
        form_content: JSON.stringify(questionsJS),
        plan_seq: planseq,
        tot_score: this.getResultScore(),
        plan_result: this.getResultScore() >= 90 ? 'O' : 'X',
        study: jobType,
        checkAll: step === 3 && area.includes('PHOTO'),
      };
      if (isFinished) {
        this.updateData(payload).then(result => {
          if (result) {
            alert('평가 완료하였습니다.');
            this.handleCloseModal();
            this.props.callbackHandler();
          } else {
            alert('평가를 제출하는 과정에서 오류가 발생했습니다.');
          }
        });
      } else {
        this.postData(payload).then(result => {
          if (result) {
            alert('평가를 마쳤습니다.');
            this.handleCloseModal();
            this.props.callbackHandler();
          } else {
            alert('답안을 제출하는 과정에서 오류가 발생했습니다.');
          }
        });
      }
    }
  }

  handleChangeScore(index, value) {
    this.setState(prevState => {
      const { questions } = prevState;
      return {
        questions: questions.setIn([index, 'result'], value),
      };
    });
  }

  handleChangeBigo(index, value) {
    this.setState(prevState => {
      const { questions } = prevState;
      return {
        questions: questions.setIn([index, 'bigo'], value),
      };
    });
  }

  getResultScore() {
    const { questions } = this.state;
    const convertedData = questions.toJS();
    const totalScore = convertedData.map(({ total }) => total || 0).reduce((accumulator, currentValue) => accumulator + currentValue, 0) || 100;
    const results = convertedData
      .map(({ result, scoreA, scoreB, scoreC, scoreD }) => {
        switch (result) {
          case 'A':
            return Number(scoreA) || 0;
          case 'B':
            return Number(scoreB) || 0;
          case 'C':
            return Number(scoreC) || 0;
          case 'D':
            return Number(scoreD) || 0;
          default:
            return 0;
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return Number(((results / totalScore) * 100).toFixed(2));
  }

  getFinalResult() {
    const score = this.getResultScore();
    return score >= 90 ? <strong style={{ color: '#1fb5ad' }}>합격</strong> : <strong style={{ color: 'red' }}>불합격</strong>;
  }

  render() {
    const { isOpen, isLoading, questions, isFinished } = this.state;
    const { readOnly } = this.props;
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
                <StyledCommonForm onSubmit={this.saveData} autoComplete="off" ref={el => (this.printComponentRef = el)}>
                  <div className="sub_form_tit cr">평가기준</div>
                  <div className="ta_wrap">
                    <p style={{ padding: '10px', border: '1px solid #eaecee' }}>
                      ① A등급 ( 단독 작업가능 / 타인 교육 가능 ) <br />
                      ② B등급 ( 단독 작업 가능 ) <br />
                      ③ C등급 ( 타인 도움을 받아 작업 가능 ) <br />
                      ④ D등급 ( 타인의 도움을 받아도 작업이 어려운 상태 ) <br />
                      <span style={{ color: 'red' }}>
                        ※ 평가 항목은 Total 90점이상 합격이며 한 항목이라도 C등급 미만 일 경우 재 교육 후 재 평가를 실시한다.
                      </span>
                    </p>
                  </div>
                  <br />
                  <div className="sub_form_tit cr">평가정보</div>
                  <div className="ta_wrap">
                    <table className="tb02">
                      <colgroup>
                        <col width="40%" />
                        <col width="5%" />
                        <col width="5%" />
                        <col width="5%" />
                        <col width="5%" />
                        <col width="5%" />
                        <col width="5%" />
                        <col width="5%" />
                        <col width="20%" />
                      </colgroup>
                      <thead>
                        <tr className="bd">
                          <th rowSpan={2}>평가 항목</th>
                          <th colSpan={2}>평가 구분</th>
                          <th rowSpan={2}>점수 배분</th>
                          <th colSpan={4}>평가 결과</th>
                          <th rowSpan={2}>비고</th>
                        </tr>
                        <tr className="bd">
                          <th>이론</th>
                          <th>실기</th>
                          <th>A</th>
                          <th>B</th>
                          <th>C</th>
                          <th>D</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questions.map((row, index) => (
                          <tr key={row.get('key')}>
                            <td style={{ textAlign: 'left' }}>{`${row.get('title')}`}</td>
                            <td>{row.get('theory') ? '○' : ''}</td>
                            <td>{row.get('practice') ? '○' : ''}</td>
                            <td>{row.get('total')}</td>
                            <td>
                              {row.get('total') && (
                                <div className="table_radio">
                                  <input
                                    type="radio"
                                    name={`${row.get('key')}-count`}
                                    id={`${row.get('key')}-count-a`}
                                    checked={row.get('result') === 'A'}
                                    onChange={() => this.handleChangeScore(index, 'A')}
                                    disabled={readOnly}
                                  />
                                  <label htmlFor={`${row.get('key')}-count-a`}>
                                    <span />
                                  </label>
                                </div>
                              )}
                            </td>
                            <td>
                              {row.get('total') && (
                                <div className="table_radio">
                                  <input
                                    type="radio"
                                    name={`${row.get('key')}-count`}
                                    id={`${row.get('key')}-count-b`}
                                    checked={row.get('result') === 'B'}
                                    onChange={() => this.handleChangeScore(index, 'B')}
                                    disabled={readOnly}
                                  />
                                  <label htmlFor={`${row.get('key')}-count-b`}>
                                    <span />
                                  </label>
                                </div>
                              )}
                            </td>
                            <td>
                              {row.get('total') && (
                                <div className="table_radio">
                                  <input
                                    type="radio"
                                    name={`${row.get('key')}-count`}
                                    id={`${row.get('key')}-count-c`}
                                    checked={row.get('result') === 'C'}
                                    onChange={() => this.handleChangeScore(index, 'C')}
                                    disabled={readOnly}
                                  />
                                  <label htmlFor={`${row.get('key')}-count-c`}>
                                    <span />
                                  </label>
                                </div>
                              )}
                            </td>
                            <td>
                              {row.get('total') && (
                                <div className="table_radio">
                                  <input
                                    type="radio"
                                    name={`${row.get('key')}-count`}
                                    id={`${row.get('key')}-count-d`}
                                    checked={row.get('result') === 'D'}
                                    onChange={() => this.handleChangeScore(index, 'D')}
                                    disabled={readOnly}
                                  />
                                  <label htmlFor={`${row.get('key')}-count-d`}>
                                    <span />
                                  </label>
                                </div>
                              )}
                            </td>
                            <td className="tb_is">
                              {row.get('total') && (
                                <input type="text" value={row.get('bigo')} onChange={e => this.handleChangeBigo(index, e.target.value)} disabled={readOnly} />
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={4}>T O T A L</td>
                          <td colSpan={4}>{this.getResultScore()}</td>
                          <td>{this.getFinalResult()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {!readOnly && (
                    <div className="btn_wrap">
                      <Button type="button" size="small" color="primary" onClick={this.handleClickSubmit}>
                        {!isFinished ? '등록' : '수정'}
                      </Button>
                      <Button type="button" size="small" color="default" onClick={this.handleCloseModal}>
                        취소
                      </Button>
                    </div>
                  )}
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
