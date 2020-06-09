import React from 'react';
import Modal from 'rc-dialog';
import ReactToPrint from 'react-to-print';

import { Icon, Spin } from 'antd';
import { fromJS } from 'immutable';
import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import StyledContent from './StyledContent';
import { template } from '../config';

const textareaStyle = {
  padding: '5px 5px 15px 5px',
  border: 0,
  width: '100%',
  borderBottom: '1px solid #d9e0e7',
  fontSize: '14px',
  color: '#111b27',
  minHeight: '50px',
};

class JobEvaluationReadOnly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: true,
      info: {},
      data: fromJS([]),
      type: '',
      comment: '',
      result: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.selectTitle = this.selectTitle.bind(this);
    this.getResultScore = this.getResultScore.bind(this);
    this.getHandlingFinalResult = this.getHandlingFinalResult.bind(this);
    this.getFinalResult = this.getFinalResult.bind(this);
    this.getHandlingResultScore = this.getHandlingResultScore.bind(this);
  }

  handleOpenModal(info, type, data, comment, result) {
    this.setState({ isOpen: true, isLoading: false, info, type, data: fromJS(data), comment, result });
  }

  selectTitle() {
    const { type } = this.state;
    switch (type) {
      case 'job':
        return '직무능력평가';
      case 'job_mask':
        return '직무능력평가(MASK)';
      case 'job_meter':
        return '직무능력평가(계측기)';
      case 'job_handling':
        return 'HANDLING 평가표';
      case 'job_proc':
        return '공정 교육';
      case 'job_clean':
        return '청정도 교육';
      case 'job_mashine':
        return '장비 교육인증';
      default:
        return '';
    }
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
      isLoading: true,
      info: {},
      data: fromJS([]),
      type: '',
      comment: '',
      result: '',
    });
  }

  handleAfterOpen() {
    const { id } = this.state;
  }

  getProcResultScore(data) {
    return data
      .map(({ selectedAnswer, correctAnswer, total }) => (selectedAnswer === correctAnswer ? total : 0))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  getTotalTime(data) {
    return data
      .toJS()
      .map(row => (row.time ? Number(row.time) : 0))
      .reduce((accumulator, next) => accumulator + next, 0);
  }

  getResultScore() {
    const { data } = this.state;
    const convertedData = data.toJS();
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
    return ((results / totalScore) * 100).toFixed(2);
  }

  getHandlingResultScore() {
    const { data } = this.state;
    const results = data.toJS().map(row => row.itemNumber || parseInt(row.score.substr(0, 2), 10));
    return results.length > 0 ? results.reduce((accumulator, currentValue) => accumulator + currentValue) : 0;
  }

  getHandlingFinalResult() {
    const score = this.getHandlingResultScore();
    return score >= 90 ? <strong style={{ color: '#1fb5ad' }}>합격</strong> : <strong style={{ color: 'red' }}>불합격</strong>;
  }

  getFinalResult() {
    const score = this.getResultScore();
    return score >= 90 ? <strong style={{ color: '#1fb5ad' }}>합격</strong> : <strong style={{ color: 'red' }}>불합격</strong>;
  }

  getResultText(type) {
    switch (type) {
      case 'O':
        return '합격';
      case 'X':
        return '불합격';
      default:
        return '-';
    }
  }

  render() {
    const { isOpen, isLoading, info, type, data, comment, result } = this.state;
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
              {/* {this.selectTitle()} */}
              수료 정보
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <StyledCommonForm className="print-body" onSubmit={this.saveData} autoComplete="off" ref={el => (this.printComponentRef = el)}>
                  <div className="sub_form_tit cr">기본정보</div>
                  <div className="ta_wrap">
                    <table className="tb02">
                      <colgroup>
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                      </colgroup>
                      <tbody>
                        <tr className="bd">
                          <th>근무지</th>
                          <td>{info.site}</td>
                          <th>AREA / 근무조</th>
                          <td>{`${info.area} / ${info.workjo}`}</td>
                        </tr>
                        <tr className="bd">
                          <th>BAY</th>
                          <td>{info.bay}</td>
                          <th>사 번</th>
                          <td>{info.empno}</td>
                        </tr>
                        <tr className="bd">
                          <th>직 책</th>
                          <td>{info.position}</td>
                          <th>성 명</th>
                          <td>{info.usrnm}</td>
                        </tr>
                        <tr className="bd">
                          <th>성 별</th>
                          <td>{info.sex}</td>
                          <th>평가결과</th>
                          <td>{this.getResultText(result)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {template[type] && (
                    <>
                      <br />
                      <div className="sub_form_tit cr">평가기준</div>
                      {template[type]}
                    </>
                  )}
                  <br />
                  <div className="sub_form_tit cr">평가정보</div>
                  {type === 'job_proc' && (
                    <div className="ta_wrap">
                      <table className="tb02">
                        <thead>
                          <tr className="bd">
                            <th rowSpan={2}>평가 항목</th>
                            <th rowSpan={2}>점수 배분</th>
                            <th rowSpan={1} colSpan={4}>
                              객관식
                            </th>
                            <th rowSpan={2}>결과</th>
                          </tr>
                          <tr className="bd">
                            <th>정답</th>
                            <th>오답1</th>
                            <th>오답2</th>
                            <th>오답3</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map(row => (
                            <tr key={row.get('key')}>
                              <td style={{ textAlign: 'left', fontSize: '12px' }}>{`${row.get('title')}`}</td>
                              <td style={{ fontSize: '12px' }}>{row.get('total')}</td>
                              <td
                                style={{
                                  textAlign: 'left',
                                  fontSize: '12px',
                                  color: row.getIn(['originAnswers', 0]) === row.get('selectedAnswer') ? 'red' : 'black',
                                }}
                              >
                                {row.getIn(['originAnswers', 0]) || row.get('correctAnswer')}
                              </td>
                              <td
                                style={{
                                  textAlign: 'left',
                                  fontSize: '12px',
                                  color: row.getIn(['originAnswers', 1]) === row.get('selectedAnswer') ? 'red' : 'black',
                                }}
                              >
                                {row.getIn(['originAnswers', 1])}
                              </td>
                              <td
                                style={{
                                  textAlign: 'left',
                                  fontSize: '12px',
                                  color: row.getIn(['originAnswers', 2]) === row.get('selectedAnswer') ? 'red' : 'black',
                                }}
                              >
                                {row.getIn(['originAnswers', 2])}
                              </td>
                              <td
                                style={{
                                  textAlign: 'left',
                                  fontSize: '12px',
                                  color: row.getIn(['originAnswers', 3]) === row.get('selectedAnswer') ? 'red' : 'black',
                                }}
                              >
                                {row.getIn(['originAnswers', 3])}
                              </td>
                              <td>{row.get('correctAnswer') === row.get('selectedAnswer') ? 'O' : 'X'}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={2}>T O T A L</td>
                            <td colSpan={4}>{this.getProcResultScore(data.toJS())}</td>
                            <td>{this.getFinalResult()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  {type !== 'job_proc' && (
                    <div className="ta_wrap">
                      <table className="tb02">
                        <colgroup>
                          <col width="40%" />
                          <col width="5%" />
                          <col width="5%" />
                          {type === 'job_return' && <col width="5%" />}
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
                            {type === 'job_return' && <th rowSpan={2}>교육 시간</th>}
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
                          {data.map((row, index) => (
                            <tr key={row.get('key')}>
                              <td style={{ textAlign: 'left' }}>{`${row.get('title')}`}</td>
                              <td>{row.get('theory') ? '○' : ''}</td>
                              <td>{row.get('practice') ? '○' : ''}</td>
                              <td>{row.get('total')}</td>
                              {type === 'job_return' && (
                                <td className="tb_is">
                                  <input type="text" defaultValue={row.get('time') || 0} disabled />
                                </td>
                              )}
                              <td>
                                <div className="table_radio">
                                  <input
                                    type="radio"
                                    name={`${row.get('key')}-count`}
                                    id={`${row.get('key')}-count-a`}
                                    checked={row.get('result') === 'A'}
                                    disabled
                                  />
                                  <label htmlFor={`${row.get('key')}-count-a`}>
                                    <span />
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="table_radio">
                                  <input
                                    type="radio"
                                    name={`${row.get('key')}-count`}
                                    id={`${row.get('key')}-count-b`}
                                    checked={row.get('result') === 'B'}
                                    disabled
                                  />
                                  <label htmlFor={`${row.get('key')}-count-b`}>
                                    <span />
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="table_radio">
                                  <input
                                    type="radio"
                                    name={`${row.get('key')}-count`}
                                    id={`${row.get('key')}-count-c`}
                                    checked={row.get('result') === 'C'}
                                    disabled
                                  />
                                  <label htmlFor={`${row.get('key')}-count-c`}>
                                    <span />
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="table_radio">
                                  <input
                                    type="radio"
                                    name={`${row.get('key')}-count`}
                                    id={`${row.get('key')}-count-d`}
                                    checked={row.get('result') === 'D'}
                                    disabled
                                  />
                                  <label htmlFor={`${row.get('key')}-count-d`}>
                                    <span />
                                  </label>
                                </div>
                              </td>
                              <td className="tb_is">
                                <input type="text" value={row.get('bigo')} disabled />
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={4}>T O T A L</td>
                            {type === 'job_return' && <td>{this.getTotalTime(data)}</td>}
                            <td colSpan={4}>{this.getResultScore()}</td>
                            <td>{this.getFinalResult()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  {type !== 'job_proc' && (
                    <>
                      <br />
                      <div className="sub_form_tit cr">의견</div>
                      <div>
                        <textarea
                          name="comment"
                          id=""
                          cols="30"
                          rows="10"
                          placeholder="의견을 작성해 주세요.(300자 내)"
                          maxLength={300}
                          style={textareaStyle}
                          value={comment}
                          disabled
                        />
                      </div>
                    </>
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

export default JobEvaluationReadOnly;
