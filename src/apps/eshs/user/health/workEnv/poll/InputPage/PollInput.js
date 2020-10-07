import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Input, Checkbox, Modal, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

import UserSearchModal from 'apps/eshs/common/userSearchModal';
import Styled from 'apps/eshs/user/health/ChkReservation/Questionnaire/Styled';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import PollImg from 'apps/eshs/user/health/workEnv/poll/InputPage/poll.gif';
import moment from 'moment';

const currentYear = moment(new Date()).format('YYYY');
const today = moment(new Date()).format('YYYYMMDD');

const AntInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class PollInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        POYEAR: currentYear,
        SEX: '1',
        JOBYEAR01: '1',
        JOBYEAR02: '0',
        ISMATE: '1',
        JOB02: '1',
        JOB03: '0',
        RECESS01: '5',
        RECESS02: '1',
        JOB05: '1',
        JOB06: '0',
        WORKTIME01: '1',
        WORKTIME02: '00',
      },
      questionData: {},
    };
  };

  setSelectOption = (keyPrefix, textSuffix, startNum, endNum, increase) => {
    const options = [];
    for (let i = startNum; i <= endNum; i += increase) {
      options.push(<AntdSelect.Option key={`${keyPrefix}_${i}`} value={String(i)}>{`${i}${textSuffix}`}</AntdSelect.Option>);
    }

    return options;
  };

  getUserDetail = regNo => {
    if (regNo === '0') return { AGE: '', SEX: '1' };
    const genType = regNo.substring(6, 7);
    const age = currentYear - ((genType <= 2 ? 1900 : 2000) + Number(regNo.substring(0, 2))) + (currentYear + regNo.substring(2, 6) > today ? 1 : 0);

    return { AGE: age, SEX: genType === '2' || genType === '4' ? '2' : '1' };
  };

  changeFormData = (key, value) => this.setState(prevState => ({ formData: Object.assign(prevState.formData, { [key]: value }) }));

  changeQuestionData = (key, value) => this.setState(prevState => ({ questionData: Object.assign(prevState.questionData, { [key]: value }) }));

  showMessage = text => message.info(<MessageContent>{text}</MessageContent>);

  validationChk = submitData => {
    let msg = '';
    const userId = (submitData && submitData.user_id) || '';
    const job01 = (submitData && submitData.JOB01) || '';
    const q1 = (submitData && submitData.Q1) || '';
    const q2 = (submitData && submitData.Q2) || '';
    const q3 = (submitData && submitData.Q3) || '';
    const q4 = (submitData && submitData.Q4) || '';
    const q5 = (submitData && submitData.Q5) || '';
    const q6 = (submitData && submitData.Q6) || '';
    const q7 = (submitData && submitData.Q7) || '';
    const q8 = (submitData && submitData.Q8) || '';
    const qck = (submitData && submitData.QCK) || '';

    const q11 = (submitData && submitData.Q11) || '';
    const q12 = (submitData && submitData.Q12) || '';
    const q13 = (submitData && submitData.Q13) || '';
    const q14 = (submitData && submitData.Q14) || '';
    const q15 = (submitData && submitData.Q15) || '';
    const q16 = (submitData && submitData.Q16) || '';

    const q21 = (submitData && submitData.Q21) || '';
    const q22 = (submitData && submitData.Q22) || '';
    const q23 = (submitData && submitData.Q23) || '';
    const q24 = (submitData && submitData.Q24) || '';
    const q25 = (submitData && submitData.Q25) || '';
    const q26 = (submitData && submitData.Q26) || '';

    const q31 = (submitData && submitData.Q31) || '';
    const q32 = (submitData && submitData.Q32) || '';
    const q33 = (submitData && submitData.Q33) || '';
    const q34 = (submitData && submitData.Q34) || '';
    const q35 = (submitData && submitData.Q35) || '';
    const q36 = (submitData && submitData.Q36) || '';

    const q41 = (submitData && submitData.Q41) || '';
    const q42 = (submitData && submitData.Q42) || '';
    const q43 = (submitData && submitData.Q43) || '';
    const q44 = (submitData && submitData.Q44) || '';
    const q45 = (submitData && submitData.Q45) || '';
    const q46 = (submitData && submitData.Q46) || '';

    const q51 = (submitData && submitData.Q51) || '';
    const q52 = (submitData && submitData.Q52) || '';
    const q53 = (submitData && submitData.Q53) || '';
    const q54 = (submitData && submitData.Q54) || '';
    const q55 = (submitData && submitData.Q55) || '';
    const q56 = (submitData && submitData.Q56) || '';

    const q61 = (submitData && submitData.Q61) || '';
    const q62 = (submitData && submitData.Q62) || '';
    const q63 = (submitData && submitData.Q63) || '';
    const q64 = (submitData && submitData.Q64) || '';
    const q65 = (submitData && submitData.Q65) || '';
    const q66 = (submitData && submitData.Q66) || '';

    if (!userId) msg = '사번을 선택해주세요.';
    else if (!job01) msg = '작업내용을 입력하세요.';
    else if (!q1) msg = '1번문제에 답해 주십시요.';
    else if (!q2) msg = '2번문제에 답해 주십시요.';
    else if (q4 === '2') {
      if (!q5) msg = '치료 여부를 체크 해주십시요.';
      else if (!q3) msg = '해당 질환 체크를 해주십시요.';
    }

    if (msg) return msg;
    if (!q4) msg = '3번문제에 답해 주십시요.';
    else if (q6 === '2') {
      if (!q7) msg = '해당 부위 체크를 해주십시요.';
    }

    if (msg) return msg;
    if (!q6) msg = '4번문제에 답해 주십시요.';
    else if (!q8) msg = '5번문제에 답해 주십시요.';
    else if (!qck) msg = '통증 여부를 체크 해주세요.';
    else if (qck === '1') {
      if (!q11) msg = '손/손목/손가락 통증 부위 체크를 해주십시요.';
      else if (!q21) msg = '팔/ 팔꿈치 통증 부위 체크를 해주십시요.';
      else if (!q31) msg = '어깨 통증 부위 체크를 해주십시요.';
      else if (!q41) msg = '목 통증 부위 체크를 해주십시요.';
      else if (!q51) msg = '허리 통증 부위 체크를 해주십시요.';
      else if (!q61) msg = '무릅 통증 부위 체크를 해주십시요.';
      else if (q11 === '4' && q21 === '4' && q31 === '4' && q41 === '4' && q51 === '4' && q61 === '4')
        msg = '예를 선택하셨으면 통증 부위에 대해 하나 이상은 선택 하셔야 합니다.';
      else if (q11 !== '4') {
        if (!q12) msg = '[손/손목/손가락] 통증 지속 기간에 대해 체크 해주십시요.';
        else if (!q13) msg = '[손/손목/손가락] 아픈 정도에 대해 체크를 해주십시요.';
        else if (!q14) msg = '[손/손목/손가락] 증상의 주기를 체크 해주십시요.';
        else if (!q15) msg = '[손/손목/손가락] 지난 1주일 동안에 증상 여부를 체크 해주십시요.';
        else if (!q16) msg = '[손/손목/손가락] 통증으로인한 조치를 체크 해주십시요.';
      }
      if (msg) return msg;
      if (q21 !== '4') {
        if (!q22) msg = '[팔/팔꿈치] 통증 지속 기간에 대해 체크 해주십시요.';
        else if (!q23) msg = '[팔/팔꿈치] 아픈 정도에 대해 체크를 해주십시요.';
        else if (!q24) msg = '[팔/팔꿈치] 증상의 주기를 체크 해주십시요.';
        else if (!q25) msg = '[팔/팔꿈치] 지난 1주일 동안에 증상 여부를 체크 해주십시요.';
        else if (!q26) msg = '[팔/팔꿈치] 통증으로인한 조치를 체크 해주십시요.';
      }
      if (msg) return msg;
      if (q31 !== '4') {
        if (!q32) msg = '[어깨] 통증 지속 기간에 대해 체크 해주십시요.';
        else if (!q33) msg = '[어깨] 아픈 정도에 대해 체크를 해주십시요.';
        else if (!q34) msg = '[어깨] 증상의 주기를 체크 해주십시요.';
        else if (!q35) msg = '[어깨] 지난 1주일 동안에 증상 여부를 체크 해주십시요.';
        else if (!q36) msg = '[어깨] 통증으로인한 조치를 체크 해주십시요.';
      }
      if (msg) return msg;
      if (q41 !== '4') {
        if (!q42) msg = '[목] 통증 지속 기간에 대해 체크 해주십시요.';
        else if (!q43) msg = '[목] 아픈 정도에 대해 체크를 해주십시요.';
        else if (!q44) msg = '[목] 증상의 주기를 체크 해주십시요.';
        else if (!q45) msg = '[목] 지난 1주일 동안에 증상 여부를 체크 해주십시요.';
        else if (!q46) msg = '[목] 통증으로인한 조치를 체크 해주십시요.';
      }
      if (msg) return msg;
      if (q51 !== '4') {
        if (!q52) msg = '[허리] 통증 지속 기간에 대해 체크 해주십시요.';
        else if (!q53) msg = '[허리] 아픈 정도에 대해 체크를 해주십시요.';
        else if (!q54) msg = '[허리] 증상의 주기를 체크 해주십시요.';
        else if (!q55) msg = '[허리] 지난 1주일 동안에 증상 여부를 체크 해주십시요.';
        else if (!q56) msg = '[허리] 통증으로인한 조치를 체크 해주십시요.';
      }
      if (msg) return msg;
      if (q61 !== '4') {
        if (!q62) msg = '[무릎] 통증 지속 기간에 대해 체크 해주십시요.';
        else if (!q63) msg = '[무릎] 아픈 정도에 대해 체크를 해주십시요.';
        else if (!q64) msg = '[무릎] 증상의 주기를 체크 해주십시요.';
        else if (!q65) msg = '[무릎] 지난 1주일 동안에 증상 여부를 체크 해주십시요.';
        else if (!q66) msg = '[무릎] 통증으로인한 조치를 체크 해주십시요.';
      }
    }

    return msg;
  };

  save = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const { formData, questionData } = this.state;

    const submitData = this.setSubmitData(formData, questionData);
    const msg = this.validationChk(submitData);

    if (msg) return this.showMessage(msg);

    spinningOn();
    submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/health/eshsHealthPoll', { PARAM: submitData }, (id, res) => {
      if (res && res.result >= 2) {
        spinningOff();
        this.showMessage('설문조사에 참여해주셔서 감사합니다!');
      } else {
        spinningOff();
        this.showMessage('저장에 실패하였습니다. 다시 시도해주십시오.');
      }
    });

    console.debug('submitData', submitData);
  };

  setSubmitData = (formData, questionData) => {
    const qck = (formData && formData.QCK) || '';
    const q4 = (formData && formData.Q4) || '';
    const q6 = (formData && formData.Q6) || '';
    const q11 = (questionData && questionData.Q11) || '';
    const q21 = (questionData && questionData.Q21) || '';
    const q31 = (questionData && questionData.Q31) || '';
    const q41 = (questionData && questionData.Q41) || '';
    const q51 = (questionData && questionData.Q51) || '';
    const q61 = (questionData && questionData.Q61) || '';

    let submitData = {};
    if (qck === '2') {
      submitData = { ...formData, QCK: '2', Q11: '4', Q21: '4', Q31: '4', Q41: '4', Q51: '4', Q61: '4' };
    } else {
      submitData = { ...formData, ...questionData };
      if (q11 === '4') submitData = { ...submitData, Q12: '', Q13: '', Q14: '', Q15: '', Q16: '' };
      if (q21 === '4') submitData = { ...submitData, Q22: '', Q23: '', Q24: '', Q25: '', Q26: '' };
      if (q31 === '4') submitData = { ...submitData, Q32: '', Q33: '', Q34: '', Q35: '', Q36: '' };
      if (q41 === '4') submitData = { ...submitData, Q42: '', Q43: '', Q44: '', Q45: '', Q46: '' };
      if (q51 === '4') submitData = { ...submitData, Q52: '', Q53: '', Q54: '', Q55: '', Q56: '' };
      if (q61 === '4') submitData = { ...submitData, Q62: '', Q63: '', Q64: '', Q65: '', Q66: '' };
      if (q4 === '1') submitData = { ...submitData, Q3: '', Q5: '' };
      if (q6 === '1') submitData = { ...submitData, Q7: '' };
    }

    return submitData;
  };

  render() {
    const { formData, questionData } = this.state;
    const qck = (formData && formData.QCK) || '';
    const q4 = (formData && formData.Q4) || '';
    const q6 = (formData && formData.Q6) || '';
    const q11 = (questionData && questionData.Q11) || '';
    const q21 = (questionData && questionData.Q21) || '';
    const q31 = (questionData && questionData.Q31) || '';
    const q41 = (questionData && questionData.Q41) || '';
    const q51 = (questionData && questionData.Q51) || '';
    const q61 = (questionData && questionData.Q61) || '';
    return (
      <Styled>
        <StyledContentsWrapper>
          <div className="text-area">
            <p>
              ○ 본 조사는 <b>근골격계질환에 대한 건강장해 실태</b>를 조사하기 위하여 실시되는 설문조사 입니다. 조사목적 이외의 어떠한 목적으로도 개인 자료는
              공개되지 않고 비밀로 보장되오니 <b>다른 사람과 절대 상의하지 말고</b> 본인이 생각하는 것을 솔직하게 기입해 주시기 바랍니다.
            </p>
            <p>
              ○ 신체 부위별 증상의 물음에는{' '}
              <b>'어제 운동을 하여 아프다', '감기로 아프다', 등과 같이 일시적이거나 직업과 관련이 없는 증상은 기입하지 마십시오.</b>
            </p>
            <p>
              ○ 문진표를 다 기입하고 나서 <b>누락된 곳이 없는지 다시 한번 확인해 주십시오.</b> 누락된 곳이 있으면 안됩니다.
            </p>
          </div>
          <div className="examination-area">
            <div className="question-item">
              <p className="add-title">I. 아래 사항을 직접 기입해 주시기 바랍니다.</p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '25%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th>사번</th>
                    <td>
                      <UserSearchModal
                        customWidth="100%"
                        modalOnCancel={() => {}}
                        onClickRow={record =>
                          this.setState(prevState => ({
                            formData: { ...prevState.formData, ...record, user_id: record.USER_ID, ...this.getUserDetail(record.REGNO || '0') },
                          }))
                        }
                      />
                    </td>
                    <th>이름</th>
                    <td>{(formData && formData.NAME_KOR) || ''}</td>
                    <th>연령</th>
                    <td>{`만 ${(formData && formData.AGE) || ''}세`}</td>
                  </tr>
                  <tr>
                    <th>성별</th>
                    <td colSpan={2}>
                      <Radio.Group value={(formData && formData.SEX) || '1'} onChange={e => this.changeFormData('SEX', e.target.value)}>
                        <Radio value="1">남</Radio>
                        <Radio value="2">여</Radio>
                      </Radio.Group>
                    </td>
                    <th>현직장 경력</th>
                    <td colSpan={2}>
                      <AntdSelect className="select-sm mr5" style={{ width: 100 }} defaultValue="1" onChange={value => this.changeFormData('JOBYEAR01', value)}>
                        {this.setSelectOption('JOBYEAR', '년', 1, 40, 1)}
                      </AntdSelect>
                      <AntdSelect className="select-sm mr5" style={{ width: 100 }} defaultValue="0" onChange={value => this.changeFormData('JOBYEAR02', value)}>
                        {this.setSelectOption('JOBMONTH', '개월', 0, 11, 1)}
                      </AntdSelect>
                      근무중
                    </td>
                  </tr>
                  <tr>
                    <th>부서/직무</th>
                    <td>{(formData && formData.DEPT_NAME_KOR) || ''}</td>
                    <td>{(formData && formData.STLTX) || ''}</td>
                    <th>결혼 여부</th>
                    <td colSpan={2}>
                      <Radio.Group defaultValue="1" onChange={e => this.changeFormData('ISMATE', e.target.value)}>
                        <Radio value="1">미혼</Radio>
                        <Radio value="2">결혼</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={2}>
                      현재 하고 있는 일<br />
                      (구체적으로)
                    </th>
                    <th>작업내용</th>
                    <td colSpan={4}>
                      <AntInput
                        className="ant-input-xxs ant-input-inline"
                        style={{ width: '100%' }}
                        onChange={e => this.changeFormData('JOB01', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>일하고 있는 기간</th>
                    <td colSpan={4}>
                      <AntdSelect className="select-sm mr5" style={{ width: 100 }} defaultValue="1" onChange={value => this.changeFormData('JOB02', value)}>
                        {this.setSelectOption('JOB02', '년', 1, 40, 1)}
                      </AntdSelect>
                      <AntdSelect className="select-sm mr5" style={{ width: 100 }} defaultValue="0" onChange={value => this.changeFormData('JOB03', value)}>
                        {this.setSelectOption('JOB03', '개월', 0, 11, 1)}
                      </AntdSelect>
                      동안 하고 있음
                    </td>
                  </tr>
                  <tr>
                    <th>1일 근무시간</th>
                    <td>
                      <AntdSelect
                        className="select-sm mr5"
                        style={{ width: 100 }}
                        defaultValue="1"
                        onChange={value => this.changeFormData('WORKTIME01', value)}
                      >
                        {this.setSelectOption('WORKTIME01', '시간', 1, 12, 1)}
                      </AntdSelect>
                    </td>
                    <th colSpan={2}>작업 중 휴식시간(식사시간 제외)</th>
                    <td colSpan={2}>
                      1일
                      <AntdSelect
                        className="select-sm mr5 ml5"
                        style={{ width: 100 }}
                        defaultValue="5"
                        onChange={value => this.changeFormData('RECESS01', value)}
                      >
                        {this.setSelectOption('RECESS01', '분', 5, 25, 5)}
                        <AntdSelect.Option value="30">30분 이상</AntdSelect.Option>
                      </AntdSelect>
                      <AntdSelect className="select-sm mr5" style={{ width: 100 }} defaultValue="1" onChange={value => this.changeFormData('RECESS02', value)}>
                        {this.setSelectOption('RECESS02', '회', 1, 9, 1)}
                        <AntdSelect.Option value="10">10회 이상</AntdSelect.Option>
                      </AntdSelect>
                      휴식
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={2}>
                      현재 일을 하기
                      <br />
                      전에 했던 일
                    </th>
                    <th>작업내용</th>
                    <td colSpan={4}>
                      <AntInput
                        className="ant-input-xxs ant-input-inline"
                        style={{ width: '100%' }}
                        onChange={e => this.changeFormData('JOB04', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>일했던 기간</th>
                    <td colSpan={4}>
                      <AntdSelect className="select-sm mr5" style={{ width: 100 }} defaultValue="1" onChange={value => this.changeFormData('JOB05', value)}>
                        {this.setSelectOption('JOB05', '년', 1, 40, 1)}
                      </AntdSelect>
                      <AntdSelect className="select-sm mr5" style={{ width: 100 }} defaultValue="0" onChange={value => this.changeFormData('JOB06', value)}>
                        {this.setSelectOption('JOB06', '개월', 0, 11, 1)}
                      </AntdSelect>
                      동안 했음
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">1. </span>규칙적인 <b>(한번에 30분 이상, 1주일에 적어도 2-3회 이상)</b> 여가 및 취미활동을 하고 계시는 곳에
                표시(√)하여 주십시오.
              </p>
              <div className="question-article">
                <Radio.Group onChange={e => this.changeFormData('Q1', e.target.value)}>
                  <Radio value="1">컴퓨터 관련 활동</Radio>
                  <Radio value="2">악기연주 (피아노, 바이올린등)</Radio>
                  <Radio value="3">뜨개질, 자수</Radio>
                  <Radio value="4">붓글씨</Radio>
                  <Radio value="5">테니스/배드민턴/스쿼시</Radio>
                  <Radio value="6">촉구/족구/농구/스키</Radio>
                  <Radio value="7">해당사항 없음</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">2. </span>귀하의 하루 평균 가사노동시간(밥하기, 빨래하기, 청소하기, 2살 미만의 아이 돌보기 등)은 얼마나 됩니까?
              </p>
              <div className="question-article">
                <Radio.Group onChange={e => this.changeFormData('Q2', e.target.value)}>
                  <Radio value="1">거의 하지 않는다</Radio>
                  <Radio value="2">1시간 미만</Radio>
                  <Radio value="3">1-2시간</Radio>
                  <Radio value="4">2-3시간</Radio>
                  <Radio value="5">3시간 이상</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">3. </span>귀하는 의사로부터 다음과 같은 질병에 대해 진단을 받은 적이 있습니까? (해당 질병에 체크)
              </p>
              <div className="question-article">
                <Radio.Group onChange={e => this.changeFormData('Q4', e.target.value)}>
                  <Radio value="1">아니오</Radio>
                  <Radio value="2">예</Radio>
                </Radio.Group>
                <p className="question-txt">'예'인 경우 현재 상태는 ?</p>
                <div className="question-article">
                  <Radio.Group onChange={e => this.changeFormData('Q5', e.target.value)} style={{ display: q4 === '1' ? 'none' : '' }}>
                    <Radio value="1">완치</Radio>
                    <Radio value="2">치료나 관찰 중</Radio>
                  </Radio.Group>

                  <Radio.Group disabled style={{ display: q4 === '1' ? '' : 'none' }}>
                    <Radio value="1">완치</Radio>
                    <Radio value="2">치료나 관찰 중</Radio>
                  </Radio.Group>
                </div>
                <p className="question-txt">보기</p>
                <div className="question-article">
                  <Radio.Group onChange={e => this.changeFormData('Q3', e.target.value)} style={{ display: q4 === '1' ? 'none' : '' }}>
                    <Radio value="1">류마티스 관절염</Radio>
                    <Radio value="2">당뇨병</Radio>
                    <Radio value="3">루프스병</Radio>
                    <Radio value="4">통풍</Radio>
                    <Radio value="5">알콜중독 </Radio>
                  </Radio.Group>

                  <Radio.Group disabled style={{ display: q4 === '1' ? '' : 'none' }}>
                    <Radio value="1">류마티스 관절염</Radio>
                    <Radio value="2">당뇨병</Radio>
                    <Radio value="3">루프스병</Radio>
                    <Radio value="4">통풍</Radio>
                    <Radio value="5">알콜중독 </Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">4. </span>과거에 운동 중 혹은 사고로 (교통사고, 넘어짐 추락 등) 인해 손/손가락/손목, 팔/팔꿈치, 어깨, 목, 허리,
                무릎 부의를 다친 적이 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group onChange={e => this.changeFormData('Q6', e.target.value)}>
                  <Radio value="1">아니오</Radio>
                  <Radio value="2">예</Radio>
                </Radio.Group>
                <p className="question-txt">'예'인 경우 상해 부위는 ?</p>
                <div className="question-article">
                  <Radio.Group onChange={e => this.changeFormData('Q7', e.target.value)} style={{ display: q6 === '1' ? 'none' : '' }}>
                    <Radio value="1">손/손가락/손목</Radio>
                    <Radio value="2">팔/팔꿈치</Radio>
                    <Radio value="3">어깨</Radio>
                    <Radio value="4">목</Radio>
                    <Radio value="5">허리</Radio>
                    <Radio value="6">무릎</Radio>
                  </Radio.Group>

                  <Radio.Group disabled style={{ display: q6 === '1' ? '' : 'none' }}>
                    <Radio value="1">손/손가락/손목</Radio>
                    <Radio value="2">팔/팔꿈치</Radio>
                    <Radio value="3">어깨</Radio>
                    <Radio value="4">목</Radio>
                    <Radio value="5">허리</Radio>
                    <Radio value="6">무릎</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">5. </span>현재 하고 계시는 일의 작업강도 (육체적 부담 정도)는 어느 정도라고 생각하십니까?
              </p>
              <div className="question-article">
                <Radio.Group onChange={e => this.changeFormData('Q8', e.target.value)}>
                  <Radio value="1">전혀 힘들지 않다</Radio>
                  <Radio value="2">견딜만 하다</Radio>
                  <Radio value="3">약간 힘들다</Radio>
                  <Radio value="4">매우 힘들다</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div style={{ display: 'inline-block' }}>
            <div className="examination-area" style={{ float: 'left', width: '90%' }}>
              <div className="question-item">
                <p className="add-title">
                  Ⅱ. 지난 1년 동안 손/손가락/손목, 팔/팔꿈치, 어깨, 허리, 무릎 중 어느 한 부위 에서라도 귀하의 직업과 관련하여 통증이나 불편함(통증,쑤시는 느낌,
                  뻣뻣함, 화끈거리는 느낌, 무감각 혹은 찌릿찌릿함 등)을 느끼신 적이 있습니까?(오른쪽 그림을 참고하십시오)
                </p>
                <div className="question-article">
                  <Radio.Group onChange={e => this.changeFormData('QCK', e.target.value)}>
                    <Radio value="1">예 (아래 표의 해당 사항에 체크(√)해 주십시오.)</Radio>
                    <Radio value="2">아니오 (수고 하셨습니다. 설문을 다 마치셨습니다. 맨아래 설문완료하기 버튼을 눌러 저장하시기 바랍니다.)</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div style={{ float: 'right', width: '10%' }}>
              <img src={PollImg} alt="pollImg" />
            </div>
          </div>
          <div className="examination-area">
            <div className="question-item">
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '14%' }} />
                  <col style={{ width: '14%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>손/손목/손가락</th>
                    <th>팔/팔꿈치</th>
                    <th>어깨</th>
                    <th>목</th>
                    <th>허리</th>
                    <th>무릎</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={{ textAlign: 'left' }}>1. 해당 되는 통증 부위는?</th>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q11', e.target.value)} style={{ display: qck === '2' ? 'none' : '' }}>
                        <Radio value="4">없음</Radio>
                        <br />
                        <Radio value="1">왼쪽</Radio>
                        <br />
                        <Radio value="2">오른쪽</Radio>
                        <br />
                        <Radio value="3">양쪽</Radio>
                        <br />
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' ? '' : 'none' }}>
                        <Radio value="4">없음</Radio>
                        <br />
                        <Radio value="1">왼쪽</Radio>
                        <br />
                        <Radio value="2">오른쪽</Radio>
                        <br />
                        <Radio value="3">양쪽</Radio>
                        <br />
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q21', e.target.value)} style={{ display: qck === '2' ? 'none' : '' }}>
                        <Radio value="4">없음</Radio>
                        <br />
                        <Radio value="1">왼쪽</Radio>
                        <br />
                        <Radio value="2">오른쪽</Radio>
                        <br />
                        <Radio value="3">양쪽</Radio>
                        <br />
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' ? '' : 'none' }}>
                        <Radio value="4">없음</Radio>
                        <br />
                        <Radio value="1">왼쪽</Radio>
                        <br />
                        <Radio value="2">오른쪽</Radio>
                        <br />
                        <Radio value="3">양쪽</Radio>
                        <br />
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q31', e.target.value)} style={{ display: qck === '2' ? 'none' : '' }}>
                        <Radio value="4">없음</Radio>
                        <br />
                        <Radio value="1">왼쪽</Radio>
                        <br />
                        <Radio value="2">오른쪽</Radio>
                        <br />
                        <Radio value="3">양쪽</Radio>
                        <br />
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' ? '' : 'none' }}>
                        <Radio value="4">없음</Radio>
                        <br />
                        <Radio value="1">왼쪽</Radio>
                        <br />
                        <Radio value="2">오른쪽</Radio>
                        <br />
                        <Radio value="3">양쪽</Radio>
                        <br />
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q41', e.target.value)} style={{ display: qck === '2' ? 'none' : '' }}>
                        <Radio value="4">없음</Radio>
                        <br />
                        <Radio value="3">있음</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' ? '' : 'none' }}>
                        <Radio value="4">없음</Radio>
                        <br />
                        <Radio value="3">있음</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q51', e.target.value)} style={{ display: qck === '2' ? 'none' : '' }}>
                        <Radio value="4">없음</Radio>
                        <br />
                        <Radio value="3">있음</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' ? '' : 'none' }}>
                        <Radio value="4">없음</Radio>
                        <br />
                        <Radio value="3">있음</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q61', e.target.value)} style={{ display: qck === '2' ? 'none' : '' }}>
                        <Radio value="4">없음</Radio>
                        <br />
                        <Radio value="1">왼쪽</Radio>
                        <br />
                        <Radio value="2">오른쪽</Radio>
                        <br />
                        <Radio value="3">양쪽</Radio>
                        <br />
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' ? '' : 'none' }}>
                        <Radio value="4">없음</Radio>
                        <br />
                        <Radio value="1">왼쪽</Radio>
                        <br />
                        <Radio value="2">오른쪽</Radio>
                        <br />
                        <Radio value="3">양쪽</Radio>
                        <br />
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left' }}>
                      2. 한번 아프기 시작하면 통증 기간은 <b>얼마동안</b> 지속됩니까?
                    </th>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q12', e.target.value)} style={{ display: qck === '2' || q11 === '4' ? 'none' : '' }}>
                        <Radio value="1">1일 미만</Radio>
                        <br />
                        <Radio value="2">1일 - 1주일</Radio>
                        <br />
                        <Radio value="3">1주일 - 1달</Radio>
                        <br />
                        <Radio value="4">1달 - 6개월</Radio>
                        <br />
                        <Radio value="5">6개월 이상</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q11 === '4' ? '' : 'none' }}>
                        <Radio value="1">1일 미만</Radio>
                        <br />
                        <Radio value="2">1일 - 1주일</Radio>
                        <br />
                        <Radio value="3">1주일 - 1달</Radio>
                        <br />
                        <Radio value="4">1달 - 6개월</Radio>
                        <br />
                        <Radio value="5">6개월 이상</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q22', e.target.value)} style={{ display: qck === '2' || q21 === '4' ? 'none' : '' }}>
                        <Radio value="1">1일 미만</Radio>
                        <br />
                        <Radio value="2">1일 - 1주일</Radio>
                        <br />
                        <Radio value="3">1주일 - 1달</Radio>
                        <br />
                        <Radio value="4">1달 - 6개월</Radio>
                        <br />
                        <Radio value="5">6개월 이상</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q21 === '4' ? '' : 'none' }}>
                        <Radio value="1">1일 미만</Radio>
                        <br />
                        <Radio value="2">1일 - 1주일</Radio>
                        <br />
                        <Radio value="3">1주일 - 1달</Radio>
                        <br />
                        <Radio value="4">1달 - 6개월</Radio>
                        <br />
                        <Radio value="5">6개월 이상</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q32', e.target.value)} style={{ display: qck === '2' || q31 === '4' ? 'none' : '' }}>
                        <Radio value="1">1일 미만</Radio>
                        <br />
                        <Radio value="2">1일 - 1주일</Radio>
                        <br />
                        <Radio value="3">1주일 - 1달</Radio>
                        <br />
                        <Radio value="4">1달 - 6개월</Radio>
                        <br />
                        <Radio value="5">6개월 이상</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q31 === '4' ? '' : 'none' }}>
                        <Radio value="1">1일 미만</Radio>
                        <br />
                        <Radio value="2">1일 - 1주일</Radio>
                        <br />
                        <Radio value="3">1주일 - 1달</Radio>
                        <br />
                        <Radio value="4">1달 - 6개월</Radio>
                        <br />
                        <Radio value="5">6개월 이상</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q42', e.target.value)} style={{ display: qck === '2' || q41 === '4' ? 'none' : '' }}>
                        <Radio value="1">1일 미만</Radio>
                        <br />
                        <Radio value="2">1일 - 1주일</Radio>
                        <br />
                        <Radio value="3">1주일 - 1달</Radio>
                        <br />
                        <Radio value="4">1달 - 6개월</Radio>
                        <br />
                        <Radio value="5">6개월 이상</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q41 === '4' ? '' : 'none' }}>
                        <Radio value="1">1일 미만</Radio>
                        <br />
                        <Radio value="2">1일 - 1주일</Radio>
                        <br />
                        <Radio value="3">1주일 - 1달</Radio>
                        <br />
                        <Radio value="4">1달 - 6개월</Radio>
                        <br />
                        <Radio value="5">6개월 이상</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q52', e.target.value)} style={{ display: qck === '2' || q51 === '4' ? 'none' : '' }}>
                        <Radio value="1">1일 미만</Radio>
                        <br />
                        <Radio value="2">1일 - 1주일</Radio>
                        <br />
                        <Radio value="3">1주일 - 1달</Radio>
                        <br />
                        <Radio value="4">1달 - 6개월</Radio>
                        <br />
                        <Radio value="5">6개월 이상</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q51 === '4' ? '' : 'none' }}>
                        <Radio value="1">1일 미만</Radio>
                        <br />
                        <Radio value="2">1일 - 1주일</Radio>
                        <br />
                        <Radio value="3">1주일 - 1달</Radio>
                        <br />
                        <Radio value="4">1달 - 6개월</Radio>
                        <br />
                        <Radio value="5">6개월 이상</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q62', e.target.value)} style={{ display: qck === '2' || q61 === '4' ? 'none' : '' }}>
                        <Radio value="1">1일 미만</Radio>
                        <br />
                        <Radio value="2">1일 - 1주일</Radio>
                        <br />
                        <Radio value="3">1주일 - 1달</Radio>
                        <br />
                        <Radio value="4">1달 - 6개월</Radio>
                        <br />
                        <Radio value="5">6개월 이상</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q61 === '4' ? '' : 'none' }}>
                        <Radio value="1">1일 미만</Radio>
                        <br />
                        <Radio value="2">1일 - 1주일</Radio>
                        <br />
                        <Radio value="3">1주일 - 1달</Radio>
                        <br />
                        <Radio value="4">1달 - 6개월</Radio>
                        <br />
                        <Radio value="5">6개월 이상</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left' }}>
                      3. 그 때의 아픈 정도는 <b>어느정도</b> 입니까?
                      <br />
                      (보기를 참고하여 체크해 주십시오)
                    </th>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q13', e.target.value)} style={{ display: qck === '2' || q11 === '4' ? 'none' : '' }}>
                        <Radio value="1">통증 없음</Radio>
                        <br />
                        <Radio value="2">약한 통증</Radio>
                        <br />
                        <Radio value="3">중간 통증</Radio>
                        <br />
                        <Radio value="4">심한 통증</Radio>
                        <br />
                        <Radio value="5">매우심한 통증</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q11 === '4' ? '' : 'none' }}>
                        <Radio value="1">통증 없음</Radio>
                        <br />
                        <Radio value="2">약한 통증</Radio>
                        <br />
                        <Radio value="3">중간 통증</Radio>
                        <br />
                        <Radio value="4">심한 통증</Radio>
                        <br />
                        <Radio value="5">매우심한 통증</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q23', e.target.value)} style={{ display: qck === '2' || q21 === '4' ? 'none' : '' }}>
                        <Radio value="1">통증 없음</Radio>
                        <br />
                        <Radio value="2">약한 통증</Radio>
                        <br />
                        <Radio value="3">중간 통증</Radio>
                        <br />
                        <Radio value="4">심한 통증</Radio>
                        <br />
                        <Radio value="5">매우심한 통증</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q21 === '4' ? '' : 'none' }}>
                        <Radio value="1">통증 없음</Radio>
                        <br />
                        <Radio value="2">약한 통증</Radio>
                        <br />
                        <Radio value="3">중간 통증</Radio>
                        <br />
                        <Radio value="4">심한 통증</Radio>
                        <br />
                        <Radio value="5">매우심한 통증</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q33', e.target.value)} style={{ display: qck === '2' || q31 === '4' ? 'none' : '' }}>
                        <Radio value="1">통증 없음</Radio>
                        <br />
                        <Radio value="2">약한 통증</Radio>
                        <br />
                        <Radio value="3">중간 통증</Radio>
                        <br />
                        <Radio value="4">심한 통증</Radio>
                        <br />
                        <Radio value="5">매우심한 통증</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q31 === '4' ? '' : 'none' }}>
                        <Radio value="1">통증 없음</Radio>
                        <br />
                        <Radio value="2">약한 통증</Radio>
                        <br />
                        <Radio value="3">중간 통증</Radio>
                        <br />
                        <Radio value="4">심한 통증</Radio>
                        <br />
                        <Radio value="5">매우심한 통증</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q43', e.target.value)} style={{ display: qck === '2' || q41 === '4' ? 'none' : '' }}>
                        <Radio value="1">통증 없음</Radio>
                        <br />
                        <Radio value="2">약한 통증</Radio>
                        <br />
                        <Radio value="3">중간 통증</Radio>
                        <br />
                        <Radio value="4">심한 통증</Radio>
                        <br />
                        <Radio value="5">매우심한 통증</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q41 === '4' ? '' : 'none' }}>
                        <Radio value="1">통증 없음</Radio>
                        <br />
                        <Radio value="2">약한 통증</Radio>
                        <br />
                        <Radio value="3">중간 통증</Radio>
                        <br />
                        <Radio value="4">심한 통증</Radio>
                        <br />
                        <Radio value="5">매우심한 통증</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q53', e.target.value)} style={{ display: qck === '2' || q51 === '4' ? 'none' : '' }}>
                        <Radio value="1">통증 없음</Radio>
                        <br />
                        <Radio value="2">약한 통증</Radio>
                        <br />
                        <Radio value="3">중간 통증</Radio>
                        <br />
                        <Radio value="4">심한 통증</Radio>
                        <br />
                        <Radio value="5">매우심한 통증</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q51 === '4' ? '' : 'none' }}>
                        <Radio value="1">통증 없음</Radio>
                        <br />
                        <Radio value="2">약한 통증</Radio>
                        <br />
                        <Radio value="3">중간 통증</Radio>
                        <br />
                        <Radio value="4">심한 통증</Radio>
                        <br />
                        <Radio value="5">매우심한 통증</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q63', e.target.value)} style={{ display: qck === '2' || q61 === '4' ? 'none' : '' }}>
                        <Radio value="1">통증 없음</Radio>
                        <br />
                        <Radio value="2">약한 통증</Radio>
                        <br />
                        <Radio value="3">중간 통증</Radio>
                        <br />
                        <Radio value="4">심한 통증</Radio>
                        <br />
                        <Radio value="5">매우심한 통증</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q61 === '4' ? '' : 'none' }}>
                        <Radio value="1">통증 없음</Radio>
                        <br />
                        <Radio value="2">약한 통증</Radio>
                        <br />
                        <Radio value="3">중간 통증</Radio>
                        <br />
                        <Radio value="4">심한 통증</Radio>
                        <br />
                        <Radio value="5">매우심한 통증</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={2}>☞ 보기 : 아픈 정도에 대한 기준</th>
                    <th colSpan={5} style={{ textAlign: 'left' }}>
                      ■ 통 증 없 음 : 전혀 안 아프다.
                      <br />
                      ■ 약 한 통 증 : 약간 불편한 정도이나 작업에 열중할 때는 못 느낀다.
                      <br />
                      ■ 중 간 통 증 : 작업 중 통증이 있으나, 귀가 후 휴식을 취하면 괜찮다.
                      <br />
                      ■ 심 한 통 증 : 작업 중 통증이 비교적 심하고, 귀가 후에도 통증이 계속된다.
                      <br />
                      ■ 매우 심한 통증 : 통증 때문에 작업은 물론 일상생활을 하기가 어렵다.
                      <br />
                    </th>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left' }}>
                      4. <b>지난 1년 동안</b> 이러한 증상을 얼마나 자주 경혐하였습니까?
                    </th>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q14', e.target.value)} style={{ display: qck === '2' || q11 === '4' ? 'none' : '' }}>
                        <Radio value="1">6개월에 1번</Radio>
                        <br />
                        <Radio value="2">2-3달에 1번</Radio>
                        <br />
                        <Radio value="3">1달에 1번</Radio>
                        <br />
                        <Radio value="4">1주일에 1번</Radio>
                        <br />
                        <Radio value="5">매일</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q11 === '4' ? '' : 'none' }}>
                        <Radio value="1">6개월에 1번</Radio>
                        <br />
                        <Radio value="2">2-3달에 1번</Radio>
                        <br />
                        <Radio value="3">1달에 1번</Radio>
                        <br />
                        <Radio value="4">1주일에 1번</Radio>
                        <br />
                        <Radio value="5">매일</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q24', e.target.value)} style={{ display: qck === '2' || q21 === '4' ? 'none' : '' }}>
                        <Radio value="1">6개월에 1번</Radio>
                        <br />
                        <Radio value="2">2-3달에 1번</Radio>
                        <br />
                        <Radio value="3">1달에 1번</Radio>
                        <br />
                        <Radio value="4">1주일에 1번</Radio>
                        <br />
                        <Radio value="5">매일</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q21 === '4' ? '' : 'none' }}>
                        <Radio value="1">6개월에 1번</Radio>
                        <br />
                        <Radio value="2">2-3달에 1번</Radio>
                        <br />
                        <Radio value="3">1달에 1번</Radio>
                        <br />
                        <Radio value="4">1주일에 1번</Radio>
                        <br />
                        <Radio value="5">매일</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q34', e.target.value)} style={{ display: qck === '2' || q31 === '4' ? 'none' : '' }}>
                        <Radio value="1">6개월에 1번</Radio>
                        <br />
                        <Radio value="2">2-3달에 1번</Radio>
                        <br />
                        <Radio value="3">1달에 1번</Radio>
                        <br />
                        <Radio value="4">1주일에 1번</Radio>
                        <br />
                        <Radio value="5">매일</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q31 === '4' ? '' : 'none' }}>
                        <Radio value="1">6개월에 1번</Radio>
                        <br />
                        <Radio value="2">2-3달에 1번</Radio>
                        <br />
                        <Radio value="3">1달에 1번</Radio>
                        <br />
                        <Radio value="4">1주일에 1번</Radio>
                        <br />
                        <Radio value="5">매일</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q44', e.target.value)} style={{ display: qck === '2' || q41 === '4' ? 'none' : '' }}>
                        <Radio value="1">6개월에 1번</Radio>
                        <br />
                        <Radio value="2">2-3달에 1번</Radio>
                        <br />
                        <Radio value="3">1달에 1번</Radio>
                        <br />
                        <Radio value="4">1주일에 1번</Radio>
                        <br />
                        <Radio value="5">매일</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q41 === '4' ? '' : 'none' }}>
                        <Radio value="1">6개월에 1번</Radio>
                        <br />
                        <Radio value="2">2-3달에 1번</Radio>
                        <br />
                        <Radio value="3">1달에 1번</Radio>
                        <br />
                        <Radio value="4">1주일에 1번</Radio>
                        <br />
                        <Radio value="5">매일</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q54', e.target.value)} style={{ display: qck === '2' || q51 === '4' ? 'none' : '' }}>
                        <Radio value="1">6개월에 1번</Radio>
                        <br />
                        <Radio value="2">2-3달에 1번</Radio>
                        <br />
                        <Radio value="3">1달에 1번</Radio>
                        <br />
                        <Radio value="4">1주일에 1번</Radio>
                        <br />
                        <Radio value="5">매일</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q51 === '4' ? '' : 'none' }}>
                        <Radio value="1">6개월에 1번</Radio>
                        <br />
                        <Radio value="2">2-3달에 1번</Radio>
                        <br />
                        <Radio value="3">1달에 1번</Radio>
                        <br />
                        <Radio value="4">1주일에 1번</Radio>
                        <br />
                        <Radio value="5">매일</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q64', e.target.value)} style={{ display: qck === '2' || q61 === '4' ? 'none' : '' }}>
                        <Radio value="1">6개월에 1번</Radio>
                        <br />
                        <Radio value="2">2-3달에 1번</Radio>
                        <br />
                        <Radio value="3">1달에 1번</Radio>
                        <br />
                        <Radio value="4">1주일에 1번</Radio>
                        <br />
                        <Radio value="5">매일</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q61 === '4' ? '' : 'none' }}>
                        <Radio value="1">6개월에 1번</Radio>
                        <br />
                        <Radio value="2">2-3달에 1번</Radio>
                        <br />
                        <Radio value="3">1달에 1번</Radio>
                        <br />
                        <Radio value="4">1주일에 1번</Radio>
                        <br />
                        <Radio value="5">매일</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left' }}>
                      5. <b>지난 1주일</b> 동안 에도 그러한 증상이 있었습니까?
                    </th>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q15', e.target.value)} style={{ display: qck === '2' || q11 === '4' ? 'none' : '' }}>
                        <Radio value="1">예</Radio>
                        <br />
                        <Radio value="2">아니오</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q11 === '4' ? '' : 'none' }}>
                        <Radio value="1">예</Radio>
                        <br />
                        <Radio value="2">아니오</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q25', e.target.value)} style={{ display: qck === '2' || q21 === '4' ? 'none' : '' }}>
                        <Radio value="1">예</Radio>
                        <br />
                        <Radio value="2">아니오</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q21 === '4' ? '' : 'none' }}>
                        <Radio value="1">예</Radio>
                        <br />
                        <Radio value="2">아니오</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q35', e.target.value)} style={{ display: qck === '2' || q31 === '4' ? 'none' : '' }}>
                        <Radio value="1">예</Radio>
                        <br />
                        <Radio value="2">아니오</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q31 === '4' ? '' : 'none' }}>
                        <Radio value="1">예</Radio>
                        <br />
                        <Radio value="2">아니오</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q45', e.target.value)} style={{ display: qck === '2' || q41 === '4' ? 'none' : '' }}>
                        <Radio value="1">예</Radio>
                        <br />
                        <Radio value="2">아니오</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q41 === '4' ? '' : 'none' }}>
                        <Radio value="1">예</Radio>
                        <br />
                        <Radio value="2">아니오</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q55', e.target.value)} style={{ display: qck === '2' || q51 === '4' ? 'none' : '' }}>
                        <Radio value="1">예</Radio>
                        <br />
                        <Radio value="2">아니오</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q51 === '4' ? '' : 'none' }}>
                        <Radio value="1">예</Radio>
                        <br />
                        <Radio value="2">아니오</Radio>
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q65', e.target.value)} style={{ display: qck === '2' || q61 === '4' ? 'none' : '' }}>
                        <Radio value="1">예</Radio>
                        <br />
                        <Radio value="2">아니오</Radio>
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q61 === '4' ? '' : 'none' }}>
                        <Radio value="1">예</Radio>
                        <br />
                        <Radio value="2">아니오</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left' }}>
                      6. <b>지난 1년 동안</b> 그러한 통증으로 인해 어떤 일이 있었습니까?
                    </th>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q16', e.target.value)} style={{ display: qck === '2' || q11 === '4' ? 'none' : '' }}>
                        <Radio value="1">
                          병원 혹은
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한의원 치료
                        </Radio>
                        <br />
                        <Radio value="2">약국 치료</Radio>
                        <br />
                        <Radio value="3">병가, 산재</Radio>
                        <br />
                        <Radio value="4">부서전환</Radio>
                        <br />
                        <Radio value="5">해당사항없음</Radio>
                        <br />
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q11 === '4' ? '' : 'none' }}>
                        <Radio value="1">
                          병원 혹은
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한의원 치료
                        </Radio>
                        <br />
                        <Radio value="2">약국 치료</Radio>
                        <br />
                        <Radio value="3">병가, 산재</Radio>
                        <br />
                        <Radio value="4">부서전환</Radio>
                        <br />
                        <Radio value="5">해당사항없음</Radio>
                        <br />
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q26', e.target.value)} style={{ display: qck === '2' || q21 === '4' ? 'none' : '' }}>
                        <Radio value="1">
                          병원 혹은
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한의원 치료
                        </Radio>
                        <br />
                        <Radio value="2">약국 치료</Radio>
                        <br />
                        <Radio value="3">병가, 산재</Radio>
                        <br />
                        <Radio value="4">부서전환</Radio>
                        <br />
                        <Radio value="5">해당사항없음</Radio>
                        <br />
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q21 === '4' ? '' : 'none' }}>
                        <Radio value="1">
                          병원 혹은
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한의원 치료
                        </Radio>
                        <br />
                        <Radio value="2">약국 치료</Radio>
                        <br />
                        <Radio value="3">병가, 산재</Radio>
                        <br />
                        <Radio value="4">부서전환</Radio>
                        <br />
                        <Radio value="5">해당사항없음</Radio>
                        <br />
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q36', e.target.value)} style={{ display: qck === '2' || q31 === '4' ? 'none' : '' }}>
                        <Radio value="1">
                          병원 혹은
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한의원 치료
                        </Radio>
                        <br />
                        <Radio value="2">약국 치료</Radio>
                        <br />
                        <Radio value="3">병가, 산재</Radio>
                        <br />
                        <Radio value="4">부서전환</Radio>
                        <br />
                        <Radio value="5">해당사항없음</Radio>
                        <br />
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q31 === '4' ? '' : 'none' }}>
                        <Radio value="1">
                          병원 혹은
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한의원 치료
                        </Radio>
                        <br />
                        <Radio value="2">약국 치료</Radio>
                        <br />
                        <Radio value="3">병가, 산재</Radio>
                        <br />
                        <Radio value="4">부서전환</Radio>
                        <br />
                        <Radio value="5">해당사항없음</Radio>
                        <br />
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q46', e.target.value)} style={{ display: qck === '2' || q41 === '4' ? 'none' : '' }}>
                        <Radio value="1">
                          병원 혹은
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한의원 치료
                        </Radio>
                        <br />
                        <Radio value="2">약국 치료</Radio>
                        <br />
                        <Radio value="3">병가, 산재</Radio>
                        <br />
                        <Radio value="4">부서전환</Radio>
                        <br />
                        <Radio value="5">해당사항없음</Radio>
                        <br />
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q41 === '4' ? '' : 'none' }}>
                        <Radio value="1">
                          병원 혹은
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한의원 치료
                        </Radio>
                        <br />
                        <Radio value="2">약국 치료</Radio>
                        <br />
                        <Radio value="3">병가, 산재</Radio>
                        <br />
                        <Radio value="4">부서전환</Radio>
                        <br />
                        <Radio value="5">해당사항없음</Radio>
                        <br />
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q56', e.target.value)} style={{ display: qck === '2' || q51 === '4' ? 'none' : '' }}>
                        <Radio value="1">
                          병원 혹은
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한의원 치료
                        </Radio>
                        <br />
                        <Radio value="2">약국 치료</Radio>
                        <br />
                        <Radio value="3">병가, 산재</Radio>
                        <br />
                        <Radio value="4">부서전환</Radio>
                        <br />
                        <Radio value="5">해당사항없음</Radio>
                        <br />
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q51 === '4' ? '' : 'none' }}>
                        <Radio value="1">
                          병원 혹은
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한의원 치료
                        </Radio>
                        <br />
                        <Radio value="2">약국 치료</Radio>
                        <br />
                        <Radio value="3">병가, 산재</Radio>
                        <br />
                        <Radio value="4">부서전환</Radio>
                        <br />
                        <Radio value="5">해당사항없음</Radio>
                        <br />
                      </Radio.Group>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <Radio.Group onChange={e => this.changeQuestionData('Q66', e.target.value)} style={{ display: qck === '2' || q61 === '4' ? 'none' : '' }}>
                        <Radio value="1">
                          병원 혹은
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한의원 치료
                        </Radio>
                        <br />
                        <Radio value="2">약국 치료</Radio>
                        <br />
                        <Radio value="3">병가, 산재</Radio>
                        <br />
                        <Radio value="4">부서전환</Radio>
                        <br />
                        <Radio value="5">해당사항없음</Radio>
                        <br />
                      </Radio.Group>
                      <Radio.Group disabled style={{ display: qck === '2' || q61 === '4' ? '' : 'none' }}>
                        <Radio value="1">
                          병원 혹은
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한의원 치료
                        </Radio>
                        <br />
                        <Radio value="2">약국 치료</Radio>
                        <br />
                        <Radio value="3">병가, 산재</Radio>
                        <br />
                        <Radio value="4">부서전환</Radio>
                        <br />
                        <Radio value="5">해당사항없음</Radio>
                        <br />
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </StyledContentsWrapper>
        <StyledButtonWrapper className=" btn-wrap-center btn-wrap-mt-20  btn-wrap-mb-10">
          <StyledButton className="btn-primary" onClick={this.save}>
            설문완료하기
          </StyledButton>
          <p>
            <b>※ 협조해 주셔서 대단히 감사합니다. </b>
          </p>
        </StyledButtonWrapper>
      </Styled>
    );
  }
}

PollInput.propTypes = {};

PollInput.defaultProps = {};

export default PollInput;
