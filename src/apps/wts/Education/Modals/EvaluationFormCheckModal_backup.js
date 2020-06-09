import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import { Icon, Spin } from 'antd';
import { fromJS } from 'immutable';

import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import Button from 'components/Button';
import { jsonToQueryString } from 'utils/helpers';
import StyledEvaluationForm from 'apps/wts/components/CommonStyledElement/StyledEvaluationForm';
import service from '../service';
import StyledContent from './StyledContent';

class EvaluationFormCheckModal extends React.Component {
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
    this.getTotalQuestionScore = this.getTotalQuestionScore.bind(this);
    this.getTotalScore = this.getTotalScore.bind(this);
    this.getFinalScore = this.getFinalScore.bind(this);
  }

  handleOpenModal(planseq, empno, step) {
    this.setState({ isOpen: true, planseq, empno, step }, () => {
      this.getQuestions(planseq, empno, step);
    });
  }

  getQuestions(planseq, empno, step) {
    this.setState({ isLoading: true }, () => {
      this.fetchData(planseq, empno, step).then(({ data, noData, isError }) => {
        if (!isError && !noData) {
          this.setState({ questions: fromJS(data), isLoading: false });
        } else if (noData) {
          alert('현재 교육생이 시험을 보지 않은 상태입니다.');
          this.handleCloseModal();
        } else {
          alert('시험지를 생성하는 과정에서 오류가 발생했습니다.');
          this.handleCloseModal();
        }
      });
    });
  }

  handleChangeScore(index, score) {
    this.setState(prevState => {
      const { questions } = prevState;
      let digitScore = Number.isNaN(score) ? 0 : parseInt(score, 10);
      const maxScore = questions.getIn([index, 'q_score']);
      if (digitScore > maxScore) {
        digitScore = maxScore;
      }
      if (digitScore < 0) {
        digitScore = 0;
      }
      this.setState({ questions: questions.setIn([index, 'score'], digitScore) });
    });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  async fetchData(planseq, empno, step) {
    const requestQuery = {
      type: 'checkEvaluationForm',
      planSeq: planseq,
      empNo: empno,
      searchStep: step,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.user.get(queryString);
    if (response && !error) {
      const { evalutaionForm } = response;
      if (evalutaionForm) {
        return {
          data: JSON.parse(evalutaionForm.form_content),
        };
      }
      return {
        noData: true,
      };
    }
    return {
      isError: true,
    };
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
    const { questions, planseq, empno, step } = this.state;
    const questionsJS = questions.toJS();
    let noAnswerQuestionNumber = -1;
    const hasNoScore = questionsJS.some((question, index) => {
      if (!question.score) {
        noAnswerQuestionNumber = index + 1;
        return true;
      }
      return false;
    });
    if (hasNoScore) {
      alert(`${noAnswerQuestionNumber}번 문제의 평가점수가 비어있습니다.`);
    } else if (window.confirm('평가 완료 하시겠습니까?')) {
      const payload = {
        type: 'updateEduEvaluationForm',
        empno,
        step_level: step,
        form_content: JSON.stringify(questionsJS),
        plan_seq: planseq,
        tot_score: this.getFinalScore(),
        plan_result: this.getFinalScore() >= 90 ? 'O' : 'X',
      };
      this.updateData(payload).then(result => {
        if (result) {
          alert('평가 완료하였습니다.');
          this.handleCloseModal();
          this.props.callbackHandler();
        } else {
          alert('평가를 제출하는 과정에서 오류가 발생했습니다.');
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
    const { isOpen, isLoading, questions } = this.state;
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
                              <div className="score">
                                <input
                                  type="number"
                                  className="number"
                                  value={question.get('score')}
                                  name={`a${index}_score`}
                                  min={0}
                                  max={question.get('q_score')}
                                  onChange={e => this.handleChangeScore(index, e.target.value)}
                                />
                                점
                              </div>
                            </div>
                            <div className="text">
                              <p>{question.get('answer')}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="score_board">
                        {`(${this.getTotalScore()}/${this.getTotalQuestionScore()})`}{' '}
                        <span
                          style={{ color: this.getFinalScore() >= 90 ? 'rgba(31, 181, 173, 0.8)' : 'red', fontSize: '20px' }}
                        >{`${this.getFinalScore()}점`}</span>
                      </div>
                      <div className="btn_wrap">
                        <Button type="button" size="small" color="primary" onClick={this.handleClickSubmit}>
                          평가하기
                        </Button>
                      </div>
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

EvaluationFormCheckModal.propTypes = {
  callbackHandler: PropTypes.func,
};

EvaluationFormCheckModal.defaultProps = {
  callbackHandler: () => false,
};

export default EvaluationFormCheckModal;
