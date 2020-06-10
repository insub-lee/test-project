import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import { Icon, Spin } from 'antd';
import { fromJS } from 'immutable';
import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import Button from 'components/Button';
import { jsonToQueryString } from 'utils/helpers';
import moment from 'moment';
import service from '../service';
import StyledContent from './StyledContent';
import { template } from '../config';

const textareaStyle = {
  padding: '5px 0 15px 0',
  border: 0,
  width: '100%',
  borderBottom: '1px solid #d9e0e7',
  fontSize: '14px',
  color: '#111b27',
  minHeight: '50px',
};

class JobEvaluation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: true,
      info: {},
      data: fromJS([]),
      jobStatus: '00',
      handlingResult: '',
      result: '',
      comment: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.handleChangeFormInfo = this.handleChangeFormInfo.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.postData = this.postData.bind(this);
    this.handleSaveData = this.handleSaveData.bind(this);
    this.selectTitle = this.selectTitle.bind(this);
    this.handleUpdateJobStatus = this.handleUpdateJobStatus.bind(this);
    this.handleChangeScore = this.handleChangeScore.bind(this);
    this.getResultScore = this.getResultScore.bind(this);
    this.handleChangeBigo = this.handleChangeBigo.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.getHandlingFinalResult = this.getHandlingFinalResult.bind(this);
    this.getFinalResult = this.getFinalResult.bind(this);
    this.handleChangeHandlingScore = this.handleChangeHandlingScore.bind(this);
    this.handleChangeHandlingResult = this.handleChangeHandlingResult.bind(this);
    this.getHandlingResultScore = this.getHandlingResultScore.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.getProcFinalResult = this.getProcFinalResult.bind(this);
    this.isOverfall = this.isOverfall.bind(this);
  }

  handleOpenModal(type, rowData, collseq, create) {
    const { site } = this.props;
    this.setState({ isOpen: true, info: rowData, type, create, collseq, isLoading: true }, () => {
      const {
        info: { area },
      } = this.state;
      const areaText = area.split(' ');
      let searchArea = '';
      if (areaText.length > 1) {
        searchArea = areaText[1];
      } else {
        searchArea = areaText[0];
      }

      if (create && type !== 'job_proc') {
        this.checkData(rowData.empno, type, collseq).then(({ isError, hasData, info }) => {
          if (isError) {
            const message = '자료를 가져오는 과정에서 오류가 발생했습니다.';
            alert(message);
          } else if (hasData) {
            this.setState({
              data: fromJS(JSON.parse(info.chk_content)),
              create: false,
              isLoading: false,
              handlingResult: info.job_chk_result,
              result: info.job_chk_result,
              comment: info.comment,
            });
          } else {
            this.fetchData(site, type, searchArea).then(({ data }) => {
              this.setState({ data: fromJS(data), isLoading: false });
            });
          }
        });
      } else {
        this.checkData(rowData.empno, type, collseq).then(({ isError, hasData, info }) => {
          if (isError || !hasData) {
            const message = isError ? '자료를 가져오는 과정에서 오류가 발생했습니다.' : '공정교육을 이수하여 주십시오';
            alert(message);
            this.handleCloseModal();
          } else {
            this.setState({
              data: fromJS(JSON.parse(info.chk_content)),
              create: false,
              isLoading: false,
              handlingResult: info.job_chk_result,
              result: info.job_chk_result,
            });
          }
        });
      }
    });
  }

  selectTitle() {
    const { type } = this.state;
    const { info } = this.state;
    const timeTypeStr = info.timetype;
    let eduTimeStr = '(16시간)';
    if (timeTypeStr === 'B') {
      eduTimeStr = '(40시간)';
    }
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
      case 'job_return':
        return `복직자 교육 ${eduTimeStr}`;
      default:
        return '';
    }
  }

  handleCloseModal() {
    this.setState({ isOpen: false, isLoading: true, form: [], info: {}, data: fromJS([]), jobStatus: '00', handlingResult: '', result: '' });
  }

  handleAfterOpen() {
    const { id } = this.state;
  }

  handleChangeFormInfo(key, value) {
    this.setState(prevState => {
      const { formInfo } = prevState;
      return { formInfo: formInfo.set(key, value) };
    });
  }

  handleUpdateJobStatus(e) {
    const { value } = e.target;
    this.setState({ jobStatus: value });
  }

  handleChangeHandlingScore(e, index, target, target1) {
    const { value } = e.target;
    this.setState(prevState => {
      const { data } = prevState;
      return {
        data: data
          .setIn([index, 'itemNumber'], value === '' ? 0 : parseInt(target.substr(0, 2), 10) - parseInt(value, 10) * parseInt(target1, 10))
          .setIn([index, 'minusNumber'], value === '' ? 0 : parseInt(value, 10)),
      };
    });
  }

  handleChangeComment(e) {
    const { value } = e.target;
    this.setState({ comment: value });
  }

  handleChangeHandlingResult(e) {
    const { value } = e.target;
    this.setState({ handlingResult: value });
  }

  handleSaveData() {
    const { create, data, info, type, collseq, handlingResult, comment } = this.state;
    const { empno } = this.props;
    // if (type === 'job_handling' && handlingResult !== '') {
    //   alert('HANDLING 평가표에 대한 합격여부를 결정하셔야 합니다.');
    // } else {
    let jobChkResult = 'X';
    if (type === 'job_handling') {
      jobChkResult = this.getHandlingResultScore() >= 90 ? 'O' : 'X';
    } else {
      jobChkResult = this.getResultScore() >= 90 ? 'O' : 'X';
    }
    const payload = {
      type: create ? 'insEduJobChkList' : 'updEduJobChkList',
      chkdt: moment(new Date()).format('YYYYMMDD'),
      empNo: info.empno,
      job_chk_result: jobChkResult,
      study: type,
      chk_content: JSON.stringify(data.toJS()),
      tot_score: type === 'job_handling' ? this.getHandlingResultScore() : parseFloat(this.getResultScore()),
      usrId: empno,
      regdt: moment(new Date()).format('YYYYMMDD'),
      collseq,
      comment,
    };
    if (create) {
      this.postData(payload).then(result => {
        if (result) {
          this.handleCloseModal();
          this.props.callbackHandler();
        } else {
          alert('등록하는 과정에서 오류가 발생했습니다.');
        }
      });
    } else {
      this.updateData(payload).then(result => {
        if (result) {
          this.handleCloseModal();
          this.props.callbackHandler();
        } else {
          alert('등록하는 과정에서 오류가 발생했습니다.');
        }
      });
    }
  }
  // }

  handleChangeScore(index, value) {
    this.setState(prevState => {
      const { data } = prevState;
      return {
        data: data.setIn([index, 'result'], value),
      };
    });
  }

  onlyNumber(e) {
    if (e.keyCode < 48 || e.keyCode > 57) e.returnValue = false;
  }

  handleChangeTime(index, e) {
    const { value } = e.target;
    const numberValue = parseInt(value, 10);
    const nextValue = isNaN(numberValue) ? '0' : numberValue.toString();
    e.target.value = nextValue;
    this.setState(prevState => {
      const { data } = prevState;
      return {
        data: data.setIn([index, 'time'], nextValue),
      };
    });
  }

  handleChangeBigo(index, value) {
    this.setState(prevState => {
      const { data } = prevState;
      return {
        data: data.setIn([index, 'bigo'], value),
      };
    });
  }

  getProcResultScore(data) {
    return data
      .map(({ selectedAnswer, correctAnswer, total }) => (selectedAnswer === correctAnswer ? total : 0))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  getProcFinalResult(data) {
    return this.getProcResultScore(data) >= 90 ? <strong style={{ color: '#1fb5ad' }}>합격</strong> : <strong style={{ color: 'red' }}>불합격</strong>;
  }

  getTotalTime(data) {
    return data
      .toJS()
      .map(row => (row.time ? Number(row.time) : 0))
      .reduce((accumulator, next) => accumulator + next, 0);
  }

  isOverfall() {
    const { data } = this.state;
    const { type } = this.state;
    const convertedData = data.toJS();
    let cls = 'D';
    if (type === 'job_handling') {
      cls = 'C';
    }
    return convertedData.some(row => row.result === cls);
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

  getFinalResult(data) {
    const score = this.getResultScore();
    const { info } = this.state;
    const time = Number(this.getTotalTime(data));
    const timeTypeStr = info.timetype;
    let eduTimeInt = 16;
    if (timeTypeStr === 'B') {
      eduTimeInt = 40;
    }
    const isOverfall = this.isOverfall();
    let passYnStr = <strong style={{ color: 'red' }}>불합격</strong>;

    if (!timeTypeStr && !isOverfall && score >= 90) {
      passYnStr = <strong style={{ color: '#1fb5ad' }}>합격</strong>;
    }

    if (timeTypeStr && !isOverfall && score >= 90 && eduTimeInt === time) {
      passYnStr = <strong style={{ color: '#1fb5ad' }}>합격</strong>;
    }
    return passYnStr;
  }

  async checkData(empno, study, collseq) {
    const requestQuery = {
      type: 'eduJobChkInfo',
      empNo: empno,
      collseq,
      searchStudy: study,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { eduJobChkInfo } = response;
      return {
        hasData: !!eduJobChkInfo,
        info: eduJobChkInfo,
      };
    }
    return {
      isError: true,
    };
  }

  async fetchData(site, study, area) {
    const requestQuery = {
      type: 'checkListContent',
      searchSite: site,
      searchStudy: study,
      area: study === 'job_proc' ? area : undefined,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { checkListContent } = response;
      return {
        data: checkListContent && checkListContent.length > 0 ? JSON.parse(checkListContent[0].chk_content) : [],
      };
    }
    return {
      data: [],
    };
  }

  async updateData(payload) {
    const { response, error } = await service.manage.put(payload);
    if (response && !error) {
      const { updateyn } = response;
      return updateyn;
    }
    return false;
  }

  async postData(payload) {
    const { response, error } = await service.manage.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    return false;
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
    const { isOpen, info, type, isLoading, create, data, handlingResult, result, comment } = this.state;
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
              {this.selectTitle()}
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
                <StyledCommonForm onSubmit={this.saveData} autoComplete="off" ref={el => (this.printComponentRef = el)}>
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
                            <td>{this.getProcFinalResult(data.toJS())}</td>
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
                                  <input
                                    type="text"
                                    defaultValue={row.get('time') || 0}
                                    onKeyPress={this.onlyNumber}
                                    onChange={e => this.handleChangeTime(index, e)}
                                  />
                                </td>
                              )}
                              <td>
                                {row.get('total') && (
                                  <div className="table_radio">
                                    <input
                                      type="radio"
                                      name={`${row.get('key')}-count`}
                                      id={`${row.get('key')}-count-a`}
                                      checked={row.get('result') === 'A'}
                                      onChange={() => this.handleChangeScore(index, 'A')}
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
                                    />
                                    <label htmlFor={`${row.get('key')}-count-d`}>
                                      <span />
                                    </label>
                                  </div>
                                )}
                              </td>
                              <td className="tb_is">
                                {row.get('total') && <input type="text" value={row.get('bigo')} onChange={e => this.handleChangeBigo(index, e.target.value)} />}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={4}>T O T A L</td>
                            {type === 'job_return' && <td>{this.getTotalTime(data)}</td>}
                            <td colSpan={4}>{this.getResultScore()}</td>
                            <td>{this.getFinalResult(data)}</td>
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
                          onChange={this.handleChangeComment}
                        />
                      </div>
                      <div className="btn_wrap">
                        <Button type="button" size="small" color="primary" onClick={this.handleSaveData}>
                          {create ? '등록' : '수정'}
                        </Button>
                        <Button type="button" size="small" color="default" onClick={this.handleCloseModal}>
                          취소
                        </Button>
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

JobEvaluation.propTypes = {
  callbackHandler: PropTypes.func,
  readOnly: PropTypes.bool,
};

JobEvaluation.defaultProps = {
  callbackHandler: () => false,
  readOnly: false,
};

export default JobEvaluation;
