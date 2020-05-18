import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Input, Checkbox, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import Styled from './Styled';

const AntInput = StyledInput(Input);
const AntTextarea = StyledTextarea(Input.TextArea);

class QuestionnaireView extends Component {
  state = {
    qData: {},
    year: '',
    saveType: 'I',
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandlerReturnRes } = this.props;
    console.debug('##### componentDidMount #####');
    console.debug('sagaKey >> ', sagaKey);
    const apiInfo = {
      key: 'questionnaire',
      url: `/api/eshs/v1/common/health/healthChkQuestionnaire`,
      type: 'GET',
      params: {},
    };
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      if (res && res.detail) {
        this.setState({
          qData: JSON.parse(res.detail.ANSWER_JSON),
          year: res.detail.YEAR,
          saveType: 'U',
        });
      }
    });
  }

  onSave = () => {
    const { saveType, qData, year } = this.state;
    const { sagaKey, submitHandlerBySaga, onCancelPopup } = this.props;

    const submitData = {
      YEAR: year,
      ANSWER: {
        ...qData,
      },
    };
    Modal.confirm({
      title: `설문을 ${saveType === 'I' ? '등록' : '저장'}하시겠습니까?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        submitHandlerBySaga(sagaKey, saveType === 'I' ? 'POST' : 'PUT', '/api/eshs/v1/common/health/healthChkQuestionnaire', submitData, () => {
          onCancelPopup();
        });
      },
    });
  };

  onChangeDataOneKey = (key, val) => {
    this.setState(prevState => {
      const { qData } = prevState;
      if (key.indexOf('MENTAL_QUESTION') > -1) {
        console.debug('qData.MENTAL_SCORE >> ', qData.MENTAL_SCORE);
        console.debug('qData[', key, '] >> ', qData[key]);
        let socre = qData.MENTAL_SCORE ? Number(qData.MENTAL_SCORE) : 0;
        const selVal = qData[key] ? Number(qData[key]) : 0;
        socre = socre - selVal + Number(val);
        qData.MENTAL_SCORE = socre;
      }
      qData[key] = val;
      return { qData };
    });
  };

  onChangeDataTowKey = (key1, key2, val) => {
    this.setState(prevState => {
      const { qData } = prevState;
      if (!qData[key1]) {
        qData[key1] = {};
      }
      qData[key1][key2] = val;
      return { qData };
    });
  };

  onChangeDataThreeKey = (key1, key2, key3, val) => {
    this.setState(prevState => {
      const { qData } = prevState;
      if (!qData[key1]) {
        qData[key1] = {};
      }
      if (!qData[key1][key2]) {
        qData[key1][key2] = {};
      }
      qData[key1][key2][key3] = val;
      return { qData };
    });
  };

  render() {
    const { qData, saveType } = this.state;
    console.debug('### qData >> ', qData);
    return (
      <Styled>
        <StyledContentsWrapper>
          <div className="text-area">
            <p>* 검진 대상자는 문진 문항을 빠짐없이 표시하여야만 정확한 건강 위험 평과 결과를 통보받으실 수 있습니다.</p>
            <p>* 귀하께서는 국민건강보험공단 또는 보건소에서 제공하는 건강 관련 정보 및 사업 안내를 메일 또는 우편 등으로 받아 보는 것에 동의하십니까?</p>
            <Radio.Group style={{ paddingLeft: 10 }} value={qData.RECEIVE_AGREE} onChange={e => this.onChangeDataOneKey('RECEIVE_AGREE', e.target.value)}>
              <Radio value="Y">예</Radio>
              <Radio value="N">아니오</Radio>
            </Radio.Group>
          </div>
          <div className="examination-area">
            <div className="question-item">
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '30%' }} />
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '30%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th>성명</th>
                    <td></td>
                    <th>사번</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>주민등록번호</th>
                    <td></td>
                    <th>사업장명</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>부서</th>
                    <td colSpan={3}></td>
                  </tr>
                  <tr>
                    <th>작업내용</th>
                    <td colSpan={3}></td>
                  </tr>
                  <tr>
                    <th>입사일</th>
                    <td></td>
                    <th>
                      현직전입일 <span className="span-xs">(현부서근무시작일)</span>
                    </th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>폭로개월</th>
                    <td>
                      <AntInput className="ant-input-xxs ant-input-full" placeholder="입력해 주세요."></AntInput>
                    </td>
                    <th>
                      1일폭로시간 <span className="span-xs">(1일작업시간)</span>
                    </th>
                    <td>
                      <AntInput className="ant-input-xxs ant-input-full" placeholder="입력해 주세요."></AntInput>
                    </td>
                  </tr>
                  <tr>
                    <th>E-mail</th>
                    <td></td>
                    <th>전화번호</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td colSpan={3}></td>
                  </tr>
                </tbody>
              </table>
              <table className="question-table" style={{ marginTop: 10, borderTop: '1px solid #e2e4e8' }}>
                <colgroup>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '40%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th rowSpan="3">
                      과거직력 <span className="span-xs">(현부서 제외)</span>
                    </th>
                    <td>작업공정명</td>
                    <td>노출기간</td>
                  </tr>
                  <tr>
                    <td>
                      <AntInput className="ant-input-xxs ant-input-full" placeholder="입력해 주세요."></AntInput>
                    </td>
                    <td>
                      <AntInput className="ant-input-xxs ant-input-inline ant-input-full ant-input-right" style={{ width: 50 }}></AntInput>{' '}
                      <span className="txt">년</span>
                      <AntInput className="ant-input-xxs ant-input-inline ant-input-full ant-input-right" style={{ width: 50 }}></AntInput>{' '}
                      <span className="txt">개월</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <AntInput className="ant-input-xxs ant-input-full" placeholder="입력해 주세요."></AntInput>
                    </td>
                    <td>
                      <AntInput className="ant-input-xxs ant-input-inline ant-input-full ant-input-right" style={{ width: 50 }}></AntInput>{' '}
                      <span className="txt">년</span>
                      <AntInput className="ant-input-xxs ant-input-inline ant-input-full ant-input-right" style={{ width: 50 }}></AntInput>{' '}
                      <span className="txt">개월</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">질환력(과거력, 가족력)</p>
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">1.</span>다음과 같은 질병으로&nbsp;
                <b>
                  진단을 받았거나, <span className="point">현재</span> 약물 치료 중
                </b>
                이십니까?
              </p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '40%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>진단</th>
                    <th>약물치료</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>뇌졸중(중풍)</th>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE1 ? qData.QUESTION1.DISEASE1.DIAGNOSIS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE1', 'DIAGNOSIS', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE1 ? qData.QUESTION1.DISEASE1.MEDICATION : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE1', 'MEDICATION', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>심근경색/협심증</th>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE2 ? qData.QUESTION1.DISEASE2.DIAGNOSIS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE2', 'DIAGNOSIS', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE2 ? qData.QUESTION1.DISEASE2.MEDICATION : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE2', 'MEDICATION', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>고혈압</th>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE3 ? qData.QUESTION1.DISEASE3.DIAGNOSIS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE3', 'DIAGNOSIS', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE3 ? qData.QUESTION1.DISEASE3.MEDICATION : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE3', 'MEDICATION', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>당뇨병</th>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE4 ? qData.QUESTION1.DISEASE4.DIAGNOSIS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE4', 'DIAGNOSIS', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE4 ? qData.QUESTION1.DISEASE4.MEDICATION : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE4', 'MEDICATION', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>이상지질혈증</th>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE5 ? qData.QUESTION1.DISEASE5.DIAGNOSIS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE5', 'DIAGNOSIS', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE5 ? qData.QUESTION1.DISEASE5.MEDICATION : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE5', 'MEDICATION', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>폐결핵</th>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE6 ? qData.QUESTION1.DISEASE6.DIAGNOSIS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE6', 'DIAGNOSIS', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE6 ? qData.QUESTION1.DISEASE6.MEDICATION : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE6', 'MEDICATION', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>기타(암포함)</th>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE7 ? qData.QUESTION1.DISEASE7.DIAGNOSIS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE7', 'DIAGNOSIS', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION1 && qData.QUESTION1.DISEASE7 ? qData.QUESTION1.DISEASE7.MEDICATION : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION1', 'DISEASE7', 'MEDICATION', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">2.</span>
                <b>부모, 형제, 자매 중에 다음 질환을 앓았거나 해당 질환으로 사망한 경우</b>가 있으십니까?
              </p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '40%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th>뇌졸중(중풍)</th>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION2 ? qData.QUESTION2.DISEASE1 : ''}
                        onChange={e => this.onChangeDataTowKey('QUESTION2', 'DISEASE1', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>심근경색/협심증</th>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION2 ? qData.QUESTION2.DISEASE2 : ''}
                        onChange={e => this.onChangeDataTowKey('QUESTION2', 'DISEASE2', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>고혈압</th>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION2 ? qData.QUESTION2.DISEASE3 : ''}
                        onChange={e => this.onChangeDataTowKey('QUESTION2', 'DISEASE3', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>당뇨병</th>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION2 ? qData.QUESTION2.DISEASE4 : ''}
                        onChange={e => this.onChangeDataTowKey('QUESTION2', 'DISEASE4', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>기타(암포함)</th>
                    <td className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        value={qData.QUESTION2 ? qData.QUESTION2.DISEASE5 : ''}
                        onChange={e => this.onChangeDataTowKey('QUESTION2', 'DISEASE5', e.target.value)}
                      >
                        <Radio.Button value="Y">예</Radio.Button>
                        <Radio.Button value="N">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">3.</span>
                <b>B형간염 바이러스 보유자</b>입니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.QUESTION3} onChange={e => this.onChangeDataOneKey('QUESTION3', e.target.value)}>
                  <Radio value="Y">예</Radio>
                  <Radio value="N">아니오</Radio>
                  <Radio value="Z">모름</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">흡연 및 전자담배</p>
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">4.</span>지금까지&nbsp;
                <b>평생 총 5갑(100개비) 이상</b>의 <b>일반담배(궐련)</b>를 피운 적이 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.QUESTION4} onChange={e => this.onChangeDataOneKey('QUESTION4', e.target.value)}>
                  <Radio value="N">
                    <b>아니오 (☞ 5번 문항으로 가세요)</b>
                  </Radio>
                  <Radio value="Y">
                    예, 지금은 끊었음 <b>(☞ 4-1번 문항으로 가세요)</b>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">4-1.</span>
                <b>현재 일반담배(궐련)</b>을 피우십니까?
              </p>
              <Radio.Group
                value={qData.QUESTION4_1 ? qData.QUESTION4_1.GENERAL_SMOKING : ''}
                onChange={e => this.onChangeDataTowKey('QUESTION4_1', 'GENERAL_SMOKING', e.target.value)}
              >
                <table className="question-table">
                  <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '20%' }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <Radio value="Y" className="radio-item"></Radio>
                      </td>
                      <td className="td-left">1. 현재 피움</td>
                      <td>
                        총
                        <AntInput
                          className="ant-input-xxs ant-input-inline ml5"
                          style={{ width: 50 }}
                          value={qData.QUESTION4_1 && qData.QUESTION4_1.SMOKING ? qData.QUESTION4_1.SMOKING.SMOKING_YEAR : ''}
                          onChange={e => this.onChangeDataThreeKey('QUESTION4_1', 'SMOKING', 'SMOKING_YEAR', e.target.value)}
                        />{' '}
                        년
                      </td>
                      <td className="td-left">
                        하루 평균
                        <AntInput
                          className="ant-input-xxs ant-input-inline ml5"
                          style={{ width: 50 }}
                          value={qData.QUESTION4_1 && qData.QUESTION4_1.SMOKING ? qData.QUESTION4_1.SMOKING.DAY_AVG_SMOKING_CNT : ''}
                          onChange={e => this.onChangeDataThreeKey('QUESTION4_1', 'SMOKING', 'DAY_AVG_SMOKING_CNT', e.target.value)}
                        />{' '}
                        개비
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>
                        <Radio value="N" className="radio-item"></Radio>
                      </td>
                      <td className="td-left">2. 과거에는 피웠으나 현재에는 피우지 않음</td>
                      <td>
                        총
                        <AntInput
                          className="ant-input-xxs ant-input-inline ml5"
                          style={{ width: 50 }}
                          value={qData.QUESTION4_1 && qData.QUESTION4_1.NO_SMOKING ? qData.QUESTION4_1.NO_SMOKING.SMOKING_YEAR : ''}
                          onChange={e => this.onChangeDataThreeKey('QUESTION4_1', 'NO_SMOKING', 'SMOKING_YEAR', e.target.value)}
                        />{' '}
                        년
                      </td>
                      <td className="td-left">
                        흡연했을 때 하루 평균
                        <AntInput
                          className="ant-input-xxs ant-input-inline ml5"
                          style={{ width: 50 }}
                          value={qData.QUESTION4_1 && qData.QUESTION4_1.NO_SMOKING ? qData.QUESTION4_1.NO_SMOKING.DAY_AVG_SMOKING_CNT : ''}
                          onChange={e => this.onChangeDataThreeKey('QUESTION4_1', 'NO_SMOKING', 'DAY_AVG_SMOKING_CNT', e.target.value)}
                        />{' '}
                        개비
                      </td>
                      <td>
                        끊은 지
                        <AntInput
                          className="ant-input-xxs ant-input-inline ml5"
                          style={{ width: 50 }}
                          value={qData.QUESTION4_1 && qData.QUESTION4_1.NO_SMOKING ? qData.QUESTION4_1.NO_SMOKING.NO_SMOKING_YEAR : ''}
                          onChange={e => this.onChangeDataThreeKey('QUESTION4_1', 'NO_SMOKING', 'NO_SMOKING_YEAR', e.target.value)}
                        />{' '}
                        년
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Radio.Group>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">5.</span>지금까지&nbsp;
                <b>궐련형 전자담배(가열담배, 예) 아이코스, 글로, 릴 등)을</b>&nbsp;피운 적이 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.QUESTION5} onChange={e => this.onChangeDataOneKey('QUESTION5', e.target.value)}>
                  <Radio value="N">
                    <b>아니오 (☞ 6번 문항으로 가세요)</b>
                  </Radio>
                  <Radio value="Y">
                    예, 지금은 끊었음 <b>(☞ 5-1번 문항으로 가세요)</b>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">5-1.</span>
                <b>현재 일반 궐련형 전자담배(가열담배)</b>을 피우십니까?
              </p>
              <Radio.Group
                value={qData.QUESTION5_1 ? qData.QUESTION5_1.ELEC_SMOKING : ''}
                onChange={e => this.onChangeDataTowKey('QUESTION5_1', 'ELEC_SMOKING', e.target.value)}
              >
                <table className="question-table">
                  <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '20%' }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <Radio value="Y" className="radio-item"></Radio>
                      </td>
                      <td className="td-left">1. 현재 피움</td>
                      <td>
                        총
                        <AntInput
                          className="ant-input-xxs ant-input-inline ml5"
                          style={{ width: 50 }}
                          value={qData.QUESTION5_1 && qData.QUESTION5_1.SMOKING ? qData.QUESTION5_1.SMOKING.SMOKING_YEAR : ''}
                          onChange={e => this.onChangeDataThreeKey('QUESTION5_1', 'SMOKING', 'SMOKING_YEAR', e.target.value)}
                        />{' '}
                        년
                      </td>
                      <td className="td-left">
                        하루 평균
                        <AntInput
                          className="ant-input-xxs ant-input-inline ml5"
                          style={{ width: 50 }}
                          value={qData.QUESTION5_1 && qData.QUESTION5_1.SMOKING ? qData.QUESTION5_1.SMOKING.DAY_AVG_SMOKING_CNT : ''}
                          onChange={e => this.onChangeDataThreeKey('QUESTION5_1', 'SMOKING', 'DAY_AVG_SMOKING_CNT', e.target.value)}
                        />{' '}
                        개비
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>
                        <Radio value="N" className="radio-item"></Radio>
                      </td>
                      <td className="td-left">2. 과거에는 피웠으나 현재에는 피우지 않음</td>
                      <td>
                        총
                        <AntInput
                          className="ant-input-xxs ant-input-inline ml5"
                          style={{ width: 50 }}
                          value={qData.QUESTION5_1 && qData.QUESTION5_1.NO_SMOKING ? qData.QUESTION5_1.NO_SMOKING.SMOKING_YEAR : ''}
                          onChange={e => this.onChangeDataThreeKey('QUESTION5_1', 'NO_SMOKING', 'SMOKING_YEAR', e.target.value)}
                        />{' '}
                        년
                      </td>
                      <td className="td-left">
                        흡연했을 때 하루 평균
                        <AntInput
                          className="ant-input-xxs ant-input-inline ml5"
                          style={{ width: 50 }}
                          value={qData.QUESTION5_1 && qData.QUESTION5_1.NO_SMOKING ? qData.QUESTION5_1.NO_SMOKING.DAY_AVG_SMOKING_CNT : ''}
                          onChange={e => this.onChangeDataThreeKey('QUESTION5_1', 'NO_SMOKING', 'DAY_AVG_SMOKING_CNT', e.target.value)}
                        />{' '}
                        개비
                      </td>
                      <td>
                        끊은 지
                        <AntInput
                          className="ant-input-xxs ant-input-inline ml5"
                          style={{ width: 50 }}
                          value={qData.QUESTION5_1 && qData.QUESTION5_1.NO_SMOKING ? qData.QUESTION5_1.NO_SMOKING.NO_SMOKING_YEAR : ''}
                          onChange={e => this.onChangeDataThreeKey('QUESTION5_1', 'NO_SMOKING', 'NO_SMOKING_YEAR', e.target.value)}
                        />{' '}
                        년
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Radio.Group>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">6.</span>
                <b>액상형 전자담배</b>를 사용한 경험이 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.QUESTION6} onChange={e => this.onChangeDataOneKey('QUESTION6', e.target.value)}>
                  <Radio value="Y">
                    예 <b>(☞ 6-1번 문항으로 가세요)</b>
                  </Radio>
                  <Radio value="N">
                    <b>아니오</b>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">6-1.</span>
                <b>최근 한 달 동안 액상형 전자담배</b>를 사용한 경험이 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.QUESTION6_1} onChange={e => this.onChangeDataOneKey('QUESTION6_1', e.target.value)}>
                  <Radio value="0">
                    <b>아니오</b>
                  </Radio>
                  <Radio value="1">월 1~2일</Radio>
                  <Radio value="2">월 3~9일</Radio>
                  <Radio value="3">월 10~29일</Radio>
                  <Radio value="4">매일</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">음주 관련 문항</p>
            <div className="question-item">
              <p className="add-title">※ 지난 1년간</p>
              <p className="question-txt">
                <span className="question-num">7.</span>술을 마시는 횟수는 어느 정도입니까? (1개만 응답)
              </p>
              <div className="question-article">
                <Radio.Group value={qData.QUESTION7} onChange={e => this.onChangeDataOneKey('QUESTION7', e.target.value)}>
                  <Radio value="0">
                    일주일에
                    <AntInput
                      className="ant-input-xxs ant-input-inline ml5"
                      style={{ width: 50 }}
                      value={qData.QUESTION7_WEEK_CNT}
                      onChange={e => {
                        e.stopPropagation();
                        this.onChangeDataOneKey('QUESTION7_WEEK_CNT', e.target.value);
                      }}
                    />{' '}
                    번
                  </Radio>
                  <Radio value="1">
                    한 달에
                    <AntInput
                      className="ant-input-xxs ant-input-inline ml5"
                      style={{ width: 50 }}
                      value={qData.QUESTION7_MONTH_CNT}
                      onChange={e => this.onChangeDataOneKey('QUESTION7_MONTH_CNT', e.target.value)}
                    />{' '}
                    번
                  </Radio>
                  <Radio value="2">
                    1년에
                    <AntInput
                      className="ant-input-xxs ant-input-inline ml5"
                      style={{ width: 50 }}
                      value={qData.QUESTION7_YEAR_CNT}
                      onChange={e => this.onChangeDataOneKey('QUESTION7_YEAR_CNT', e.target.value)}
                    />{' '}
                    번
                  </Radio>
                  <Radio value="3">
                    <b>술을 마시지 않는다</b>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">7-1.</span>술을 마시는 날은 보통 어느 정도 마십니까?
                <span className="point span-block span-sm">
                  * 잔 또는 병 또는 캔 또는 cc 중 한 곳에만 작성해 주십시오.
                  <br />
                  &nbsp;&nbsp;(술 종류는 복수 응답 가능, 기타 술 종류는 비슷한 술 종류에 표기)
                </span>
              </p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '24%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '19%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>술 종류</th>
                    <th>잔</th>
                    <th>병</th>
                    <th>캔</th>
                    <th>cc</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>소주</th>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL1 ? qData.QUESTION7_1.ALCOHOL1.GLASS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL1', 'GLASS', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL1 ? qData.QUESTION7_1.ALCOHOL1.BOTTLE : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL1', 'BOTTLE', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL1 ? qData.QUESTION7_1.ALCOHOL1.CAN : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL1', 'CAN', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL1 ? qData.QUESTION7_1.ALCOHOL1.CC : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL1', 'CC', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>맥주</th>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL2 ? qData.QUESTION7_1.ALCOHOL2.GLASS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL2', 'GLASS', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL2 ? qData.QUESTION7_1.ALCOHOL2.BOTTLE : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL2', 'BOTTLE', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL2 ? qData.QUESTION7_1.ALCOHOL2.CAN : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL2', 'CAN', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL2 ? qData.QUESTION7_1.ALCOHOL2.CC : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL2', 'CC', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>양주</th>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL3 ? qData.QUESTION7_1.ALCOHOL3.GLASS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL3', 'GLASS', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL3 ? qData.QUESTION7_1.ALCOHOL3.BOTTLE : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL3', 'BOTTLE', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL3 ? qData.QUESTION7_1.ALCOHOL3.CAN : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL3', 'CAN', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL3 ? qData.QUESTION7_1.ALCOHOL3.CC : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL3', 'CC', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>막걸리</th>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL4 ? qData.QUESTION7_1.ALCOHOL4.GLASS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL4', 'GLASS', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL4 ? qData.QUESTION7_1.ALCOHOL4.BOTTLE : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL4', 'BOTTLE', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL4 ? qData.QUESTION7_1.ALCOHOL4.CAN : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL4', 'CAN', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL4 ? qData.QUESTION7_1.ALCOHOL4.CC : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL4', 'CC', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>와인</th>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL5 ? qData.QUESTION7_1.ALCOHOL5.GLASS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL5', 'GLASS', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL5 ? qData.QUESTION7_1.ALCOHOL5.BOTTLE : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL5', 'BOTTLE', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL5 ? qData.QUESTION7_1.ALCOHOL5.CAN : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL5', 'CAN', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_1 && qData.QUESTION7_1.ALCOHOL5 ? qData.QUESTION7_1.ALCOHOL5.CC : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_1', 'ALCOHOL5', 'CC', e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">7-2.</span>가장 많이 마셨던 하루 음주량은 어느 정도입니까?
                <span className="point span-block span-sm">
                  * 잔 또는 병 또는 캔 또는 cc 중 한 곳에만 작성해 주십시오.
                  <br />
                  &nbsp;&nbsp;(술 종류는 복수 응답 가능, 기타 술 종류는 비슷한 술 종류에 표기)
                </span>
              </p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '24%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '19%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>술 종류</th>
                    <th>잔</th>
                    <th>병</th>
                    <th>캔</th>
                    <th>cc</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>소주</th>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL1 ? qData.QUESTION7_2.ALCOHOL1.GLASS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL1', 'GLASS', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL1 ? qData.QUESTION7_2.ALCOHOL1.BOTTLE : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL1', 'BOTTLE', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL1 ? qData.QUESTION7_2.ALCOHOL1.CAN : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL1', 'CAN', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL1 ? qData.QUESTION7_2.ALCOHOL1.CC : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL1', 'CC', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>맥주</th>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL2 ? qData.QUESTION7_2.ALCOHOL2.GLASS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL2', 'GLASS', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL2 ? qData.QUESTION7_2.ALCOHOL2.BOTTLE : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL2', 'BOTTLE', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL2 ? qData.QUESTION7_2.ALCOHOL2.CAN : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL2', 'CAN', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL2 ? qData.QUESTION7_2.ALCOHOL2.CC : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL2', 'CC', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>양주</th>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL3 ? qData.QUESTION7_2.ALCOHOL3.GLASS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL3', 'GLASS', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL3 ? qData.QUESTION7_2.ALCOHOL3.BOTTLE : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL3', 'BOTTLE', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL3 ? qData.QUESTION7_2.ALCOHOL3.CAN : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL3', 'CAN', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL3 ? qData.QUESTION7_2.ALCOHOL3.CC : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL3', 'CC', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>막걸리</th>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL4 ? qData.QUESTION7_2.ALCOHOL4.GLASS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL4', 'GLASS', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL4 ? qData.QUESTION7_2.ALCOHOL4.BOTTLE : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL4', 'BOTTLE', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL4 ? qData.QUESTION7_2.ALCOHOL4.CAN : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL4', 'CAN', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL4 ? qData.QUESTION7_2.ALCOHOL4.CC : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL4', 'CC', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>와인</th>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL5 ? qData.QUESTION7_2.ALCOHOL5.GLASS : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL5', 'GLASS', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL5 ? qData.QUESTION7_2.ALCOHOL5.BOTTLE : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL5', 'BOTTLE', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL5 ? qData.QUESTION7_2.ALCOHOL5.CAN : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL5', 'CAN', e.target.value)}
                      />
                    </td>
                    <td className="td-pad-none">
                      <AntInput
                        className="ant-input-xxs ant-input-inline ant-input-full"
                        value={qData.QUESTION7_2 && qData.QUESTION7_2.ALCOHOL5 ? qData.QUESTION7_2.ALCOHOL5.CC : ''}
                        onChange={e => this.onChangeDataThreeKey('QUESTION7_2', 'ALCOHOL5', 'CC', e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">신체활동(운동) 관련 문항</p>
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">8-1.</span>평소 일주일간, 숨이 많이 차게 만드는 <b>고강도 신체활동</b>을 며칠 하십니까?
                <span className="span-block span-sm span-gray">
                  * 고강도 신체활동의 예) 달리기, 에어로빅, 빠른 속도로 자전거 타기, 건설 현장 노동, 계단으로 물건 나르기 등
                </span>
              </p>
              <div className="question-article">
                <p>
                  주당 (
                  <AntInput
                    className="ant-input-xs ant-input-inline ml5 mr5"
                    style={{ width: 50 }}
                    value={qData.QUESTION8_1}
                    onChange={e => this.onChangeDataOneKey('QUESTION8_1', e.target.value)}
                  />
                  ) 일
                </p>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">8-2.</span>평소 하루에 숨이 많이 차게 만드는 <b>고강도 신체활동</b>을 몇 시간 하십니까?
              </p>
              <div className="question-article">
                <p>
                  하루에 (
                  <AntInput
                    className="ant-input-xs ant-input-inline ml5 mr5"
                    style={{ width: 50 }}
                    value={qData.QUESTION8_2_HOUR}
                    onChange={e => this.onChangeDataOneKey('QUESTION8_2_HOUR', e.target.value)}
                  />
                  ) 시간 (
                  <AntInput
                    className="ant-input-xs ant-input-inline ml5 mr5"
                    style={{ width: 50 }}
                    value={qData.QUESTION8_2_MINUTE}
                    onChange={e => this.onChangeDataOneKey('QUESTION8_2_MINUTE', e.target.value)}
                  />
                  ) 분
                </p>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">9-1.</span>평소 일주일간, 숨이 약간 차게 만드는 <b>중강도 신체활동</b>을 며칠 하십니까?
                <span className="span-block span-sm span-gray">
                  * 8번 응답에 관련된 신체활동은 제외하고 답해 주십시오.<br></br>* 중강도 신체활동의 예) 빠르게 걷기, 복식 테니스, 보통 속도로 자전거 타기,
                  가벼운 물건 나르기, 청소 등
                </span>
              </p>
              <div className="question-article">
                <p>
                  주당 (
                  <AntInput
                    className="ant-input-xs ant-input-inline ml5 mr5"
                    style={{ width: 50 }}
                    value={qData.QUESTION9_1}
                    onChange={e => this.onChangeDataOneKey('QUESTION9_1', e.target.value)}
                  />
                  ) 일
                </p>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">9-2.</span>평소 하루에 숨이 약간 차게 만드는 <b>중강도 신체활동</b>을 며칠 하십니까?
              </p>
              <div className="question-article">
                <p>
                  하루에 (
                  <AntInput
                    className="ant-input-xs ant-input-inline ml5 mr5"
                    style={{ width: 50 }}
                    value={qData.QUESTION9_2_HOUR}
                    onChange={e => this.onChangeDataOneKey('QUESTION9_2_HOUR', e.target.value)}
                  />
                  ) 시간 (
                  <AntInput
                    className="ant-input-xs ant-input-inline ml5 mr5"
                    style={{ width: 50 }}
                    value={qData.QUESTION9_2_MINUTE}
                    onChange={e => this.onChangeDataOneKey('QUESTION9_2_MINUTE', e.target.value)}
                  />
                  ) 분
                </p>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">10.</span>최근 1주일 동안 팔굽혀펴기, 윗몸일으키기, 아령, 역기, 철봉 등 근력 운동을 한 날은 며칠입니까?
              </p>
              <div className="question-article">
                <p>
                  주당 (
                  <AntInput
                    className="ant-input-xs ant-input-inline ml5 mr5"
                    style={{ width: 50 }}
                    value={qData.QUESTION10}
                    onChange={e => this.onChangeDataOneKey('QUESTION10', e.target.value)}
                  />
                  ) 일
                </p>
              </div>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">
              정신건강(우울증) 평가도구
              <span className="point" style={{ marginLeft: 5 }}>
                (만 20, 30, 40, 50, 60, 70세 해당)
              </span>
            </p>
            <div className="question-item">
              <p className="question-txt pad-none">2주 동안, 아래 나열되는 증상들에 얼마나 자주 시달렸습니까?</p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '12%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>
                      전혀
                      <br />
                      아니다
                    </th>
                    <th>
                      여러날
                      <br />
                      동안
                    </th>
                    <th>
                      일주일
                      <br />
                      이상
                    </th>
                    <th>
                      거의
                      <br />
                      매일
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">1.</span>일을 하는 것에 대한 흥미나 재미가 거의 없음
                    </td>
                    <td className="radio-td" colSpan="4">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w25"
                        value={qData.MENTAL_QUESTION1}
                        onChange={e => this.onChangeDataOneKey('MENTAL_QUESTION1', e.target.value)}
                      >
                        <Radio.Button value="0">0</Radio.Button>
                        <Radio.Button value="1">1</Radio.Button>
                        <Radio.Button value="2">2</Radio.Button>
                        <Radio.Button value="3">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">2.</span>가라앉은 느낌, 우울감 혹은 절망감
                    </td>
                    <td className="radio-td" colSpan="4">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w25"
                        value={qData.MENTAL_QUESTION2}
                        onChange={e => this.onChangeDataOneKey('MENTAL_QUESTION2', e.target.value)}
                      >
                        <Radio.Button value="0">0</Radio.Button>
                        <Radio.Button value="1">1</Radio.Button>
                        <Radio.Button value="2">2</Radio.Button>
                        <Radio.Button value="3">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">3.</span>잠들기 어렵거나 자꾸 깨어남, 혹은 너무 많이 잠
                    </td>
                    <td className="radio-td" colSpan="4">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w25"
                        value={qData.MENTAL_QUESTION3}
                        onChange={e => this.onChangeDataOneKey('MENTAL_QUESTION3', e.target.value)}
                      >
                        <Radio.Button value="0">0</Radio.Button>
                        <Radio.Button value="1">1</Radio.Button>
                        <Radio.Button value="2">2</Radio.Button>
                        <Radio.Button value="3">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">4.</span>피곤함, 기력이 저하됨
                    </td>
                    <td className="radio-td" colSpan="4">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w25"
                        value={qData.MENTAL_QUESTION4}
                        onChange={e => this.onChangeDataOneKey('MENTAL_QUESTION4', e.target.value)}
                      >
                        <Radio.Button value="0">0</Radio.Button>
                        <Radio.Button value="1">1</Radio.Button>
                        <Radio.Button value="2">2</Radio.Button>
                        <Radio.Button value="3">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">5.</span>식욕 저하 혹은 과식
                    </td>
                    <td className="radio-td" colSpan="4">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w25"
                        value={qData.MENTAL_QUESTION5}
                        onChange={e => this.onChangeDataOneKey('MENTAL_QUESTION5', e.target.value)}
                      >
                        <Radio.Button value="0">0</Radio.Button>
                        <Radio.Button value="1">1</Radio.Button>
                        <Radio.Button value="2">2</Radio.Button>
                        <Radio.Button value="3">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">6.</span>내 자신이 나쁜 사람이라는 느낌 혹은 내 자신을 실패자라고 느끼거나 나 때문에 나 자신이나 내 가족이 불행하게
                      되었다는 느낌
                    </td>
                    <td className="radio-td td-2rows" colSpan="4">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w25"
                        value={qData.MENTAL_QUESTION6}
                        onChange={e => this.onChangeDataOneKey('MENTAL_QUESTION6', e.target.value)}
                      >
                        <Radio.Button value="0">0</Radio.Button>
                        <Radio.Button value="1">1</Radio.Button>
                        <Radio.Button value="2">2</Radio.Button>
                        <Radio.Button value="3">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">7.</span> 신문을 읽거나 TV를 볼 때 집중하기 어려움
                    </td>
                    <td className="radio-td" colSpan="4">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w25"
                        value={qData.MENTAL_QUESTION7}
                        onChange={e => this.onChangeDataOneKey('MENTAL_QUESTION7', e.target.value)}
                      >
                        <Radio.Button value="0">0</Radio.Button>
                        <Radio.Button value="1">1</Radio.Button>
                        <Radio.Button value="2">2</Radio.Button>
                        <Radio.Button value="3">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">8.</span>남들이 알아챌 정도로 거동이나 말이 느림, 또는 반대로 너무 초조하고 안절부절못해서 평소보다 많이 돌아다니고
                      서성거림
                    </td>
                    <td className="radio-td td-2rows" colSpan="4">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w25"
                        value={qData.MENTAL_QUESTION8}
                        onChange={e => this.onChangeDataOneKey('MENTAL_QUESTION8', e.target.value)}
                      >
                        <Radio.Button value="0">0</Radio.Button>
                        <Radio.Button value="1">1</Radio.Button>
                        <Radio.Button value="2">2</Radio.Button>
                        <Radio.Button value="3">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">9.</span>나는 차라리 죽는 것이 낫겠다는 등의 생각 혹은 어떤 식으로든 스스로를 자해하는 생각듦
                    </td>
                    <td className="radio-td td-2rows" colSpan="4">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w25"
                        value={qData.MENTAL_QUESTION9}
                        onChange={e => this.onChangeDataOneKey('MENTAL_QUESTION9', e.target.value)}
                      >
                        <Radio.Button value="0">0</Radio.Button>
                        <Radio.Button value="1">1</Radio.Button>
                        <Radio.Button value="2">2</Radio.Button>
                        <Radio.Button value="3">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>점수</td>
                    <td colSpan="4">
                      <AntInput className="ant-input-xxs ant-input-inline mr5" style={{ width: 50 }} value={qData.MENTAL_SCORE} readOnly /> / 27
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="add-title" style={{ marginTop: 10 }}>
                ☞ 의사와 상담하고 싶은 사항이 있으시면 기록하십시오.
              </p>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">※ 암 검진 관련 문항입니다.</p>
            <div className="question-item">
              <p className="add-title point2">※ 아래 문항을 읽고 자신의 현재 상태에 해당하는 답에 &#39;O&#39; 표시 해 주십시오.</p>
              <p className="question-txt">
                <span className="question-num">1.</span>
                현재 신체 어느 부위에든 불편한 증상이 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.CANCER_QUESTION1} onChange={e => this.onChangeDataOneKey('CANCER_QUESTION1', e.target.value)}>
                  <Radio value="Y">
                    예 (증상:
                    <AntInput
                      className="ant-input-xxs ant-input-inline ml5 mr5"
                      style={{ width: 100 }}
                      value={qData.CANCER_QUESTION1_SYMPTOM}
                      onChange={e => {
                        e.stopPropagation();
                        this.onChangeDataOneKey('CANCER_QUESTION1_SYMPTOM', e.target.value);
                      }}
                    />
                    )
                  </Radio>
                  <Radio value="N">
                    <b>아니오</b>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">2.</span>
                최근 6개월간 특별한 이유 없이 5kg 이상의 체중 감소가 있었습니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.CANCER_QUESTION2} onChange={e => this.onChangeDataOneKey('CANCER_QUESTION2', e.target.value)}>
                  <Radio value="N">
                    <b>아니오</b>
                  </Radio>
                  <Radio value="Y">
                    체중 감소 (
                    <AntInput
                      className="ant-input-xxs ant-input-inline ml5 mr5"
                      style={{ width: 50 }}
                      value={qData.CANCER_QUESTION2_WEIGHT}
                      onChange={e => this.onChangeDataOneKey('CANCER_QUESTION2_WEIGHT', e.target.value)}
                    />{' '}
                    kg)
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">3.</span>
                본인, 부모, 형제, 자매, 자녀 중에 현재 암에 걸리신 분이나 과거에 걸리셨던 분이 계십니까?
              </p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '30%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '8%' }} />
                  <col style={{ width: '8%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th rowSpan="2">암의 종류</th>
                    <th rowSpan="2">
                      <b>없다</b>
                    </th>
                    <th rowSpan="2">모르겠다</th>
                    <th colSpan="5">있다 (복수 선택 가능)</th>
                  </tr>
                  <tr>
                    <th className="bg-lightgray">본인</th>
                    <th className="bg-lightgray">부모</th>
                    <th className="bg-lightgray">형제</th>
                    <th className="bg-lightgray">자매</th>
                    <th className="bg-lightgray">자녀</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>위암</td>
                    <td colSpan={2} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w50"
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER1 ? qData.CANCER_QUESTION3.CANCER1 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER1', e.target.value)}
                      >
                        <Radio.Button value="N">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER1 && qData.CANCER_QUESTION3.CANCER1 === 'N' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="Z">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER1 && qData.CANCER_QUESTION3.CANCER1 === 'Z' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                    <td colSpan={5} className="chk-custom">
                      <Checkbox.Group
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER1 ? qData.CANCER_QUESTION3.CANCER1 : []}
                        onChange={val => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER1', val)}
                      >
                        <Checkbox value="0" />
                        <Checkbox value="1" />
                        <Checkbox value="2" />
                        <Checkbox value="3" />
                        <Checkbox value="4" />
                      </Checkbox.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>유방암</td>
                    <td colSpan={2} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w50"
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER2 ? qData.CANCER_QUESTION3.CANCER2 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER2', e.target.value)}
                      >
                        <Radio.Button value="N">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER2 && qData.CANCER_QUESTION3.CANCER2 === 'N' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="Z">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER2 && qData.CANCER_QUESTION3.CANCER2 === 'Z' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                    <td colSpan={5} className="chk-custom">
                      <Checkbox.Group
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER2 ? qData.CANCER_QUESTION3.CANCER2 : []}
                        onChange={val => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER2', val)}
                      >
                        <Checkbox value="0" />
                        <Checkbox value="1" />
                        <Checkbox value="2" />
                        <Checkbox value="3" />
                        <Checkbox value="4" />
                      </Checkbox.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>대장암</td>
                    <td colSpan={2} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w50"
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER3 ? qData.CANCER_QUESTION3.CANCER3 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER3', e.target.value)}
                      >
                        <Radio.Button value="N">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER3 && qData.CANCER_QUESTION3.CANCER3 === 'N' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="Z">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER3 && qData.CANCER_QUESTION3.CANCER3 === 'Z' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                    <td colSpan={5} className="chk-custom">
                      <Checkbox.Group
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER3 ? qData.CANCER_QUESTION3.CANCER3 : []}
                        onChange={val => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER3', val)}
                      >
                        <Checkbox value="0" />
                        <Checkbox value="1" />
                        <Checkbox value="2" />
                        <Checkbox value="3" />
                        <Checkbox value="4" />
                      </Checkbox.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>간암</td>
                    <td colSpan={2} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w50"
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER4 ? qData.CANCER_QUESTION3.CANCER4 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER4', e.target.value)}
                      >
                        <Radio.Button value="N">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER4 && qData.CANCER_QUESTION3.CANCER4 === 'N' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="Z">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER4 && qData.CANCER_QUESTION3.CANCER4 === 'Z' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                    <td colSpan={5} className="chk-custom">
                      <Checkbox.Group
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER4 ? qData.CANCER_QUESTION3.CANCER4 : []}
                        onChange={val => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER4', val)}
                      >
                        <Checkbox value="0" />
                        <Checkbox value="1" />
                        <Checkbox value="2" />
                        <Checkbox value="3" />
                        <Checkbox value="4" />
                      </Checkbox.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>자궁경부암</td>
                    <td colSpan={2} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w50"
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER5 ? qData.CANCER_QUESTION3.CANCER5 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER5', e.target.value)}
                      >
                        <Radio.Button value="N">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER5 && qData.CANCER_QUESTION3.CANCER5 === 'N' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="Z">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER5 && qData.CANCER_QUESTION3.CANCER5 === 'Z' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                    <td colSpan={5} className="chk-custom">
                      <Checkbox.Group
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER5 ? qData.CANCER_QUESTION3.CANCER5 : []}
                        onChange={val => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER5', val)}
                      >
                        <Checkbox value="0" />
                        <Checkbox value="1" />
                        <Checkbox value="2" />
                        <Checkbox value="3" />
                        <Checkbox value="4" />
                      </Checkbox.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>폐암</td>
                    <td colSpan={2} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w50"
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER6 ? qData.CANCER_QUESTION3.CANCER6 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER6', e.target.value)}
                      >
                        <Radio.Button value="N">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER6 && qData.CANCER_QUESTION3.CANCER6 === 'N' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="Z">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER6 && qData.CANCER_QUESTION3.CANCER6 === 'Z' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                    <td colSpan={5} className="chk-custom">
                      <Checkbox.Group
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER6 ? qData.CANCER_QUESTION3.CANCER6 : []}
                        onChange={val => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER6', val)}
                      >
                        <Checkbox value="0" />
                        <Checkbox value="1" />
                        <Checkbox value="2" />
                        <Checkbox value="3" />
                        <Checkbox value="4" />
                      </Checkbox.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      기타 ({' '}
                      <AntInput
                        className="ant-input-xxs ant-input-inline ml5 mr5"
                        style={{ width: 50 }}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER7_ETC_NAME', e.target.value)}
                      />{' '}
                      암)
                    </td>
                    <td colSpan={2} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w50"
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER7 ? qData.CANCER_QUESTION3.CANCER7 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER7', e.target.value)}
                      >
                        <Radio.Button value="N">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER7 && qData.CANCER_QUESTION3.CANCER7 === 'N' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="Z">
                          {qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER7 && qData.CANCER_QUESTION3.CANCER7 === 'Z' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                    <td colSpan={5} className="chk-custom">
                      <Checkbox.Group
                        value={qData.CANCER_QUESTION3 && qData.CANCER_QUESTION3.CANCER7 ? qData.CANCER_QUESTION3.CANCER7 : []}
                        onChange={val => this.onChangeDataTowKey('CANCER_QUESTION3', 'CANCER7', val)}
                      >
                        <Checkbox value="0" />
                        <Checkbox value="1" />
                        <Checkbox value="2" />
                        <Checkbox value="3" />
                        <Checkbox value="4" />
                      </Checkbox.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">4.</span>
                귀하는 다음의 검사를 받은 적이 있습니까?
              </p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '25%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th rowSpan="2" colSpan="2">
                      검사명
                    </th>
                    <th colSpan="4">검사시기</th>
                  </tr>
                  <tr>
                    <th className="bg-lightgray">
                      <b>
                        10년 이상 또는
                        <br />한 적 없음
                      </b>
                    </th>
                    <th className="bg-lightgray">1년 미만</th>
                    <th className="bg-lightgray">
                      1년 이상~
                      <br />
                      2년 미만
                    </th>
                    <th className="bg-lightgray">
                      2년 이상~
                      <br />
                      10년 미만
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th rowSpan="2">위암</th>
                    <th className="bg-lightgray">
                      위장조영검사 <span className="span-sm">(위장 X선 촬영)</span>
                    </th>
                    <td colSpan={4} className="radio-td">
                      <Radio.Group
                        className="w25"
                        buttonStyle="solid"
                        value={qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK1 && qData.CANCER_QUESTION4.CHECK1 ? qData.CANCER_QUESTION4.CHECK1 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION4', 'CHECK1', e.target.value)}
                      >
                        <Radio.Button value="0">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK1 && qData.CANCER_QUESTION4.CHECK1 === '0' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="1">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK1 && qData.CANCER_QUESTION4.CHECK1 === '1' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="2">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK1 && qData.CANCER_QUESTION4.CHECK1 === '2' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="3">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK1 && qData.CANCER_QUESTION4.CHECK1 === '3' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-lightgray">위내시경</th>
                    <td colSpan={4} className="radio-td">
                      <Radio.Group
                        className="w25"
                        buttonStyle="solid"
                        value={qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK2 && qData.CANCER_QUESTION4.CHECK2 ? qData.CANCER_QUESTION4.CHECK2 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION4', 'CHECK2', e.target.value)}
                      >
                        <Radio.Button value="0">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK2 && qData.CANCER_QUESTION4.CHECK2 === '0' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="1">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK2 && qData.CANCER_QUESTION4.CHECK2 === '1' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="2">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK2 && qData.CANCER_QUESTION4.CHECK2 === '2' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="3">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK2 && qData.CANCER_QUESTION4.CHECK2 === '3' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>유방암</th>
                    <th className="bg-lightgray">유방촬영</th>
                    <td colSpan={4} className="radio-td">
                      <Radio.Group
                        className="w25"
                        buttonStyle="solid"
                        value={qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK3 && qData.CANCER_QUESTION4.CHECK3 ? qData.CANCER_QUESTION4.CHECK3 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION4', 'CHECK3', e.target.value)}
                      >
                        <Radio.Button value="0">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK3 && qData.CANCER_QUESTION4.CHECK3 === '0' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="1">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK3 && qData.CANCER_QUESTION4.CHECK3 === '1' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="2">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK3 && qData.CANCER_QUESTION4.CHECK3 === '2' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="3">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK3 && qData.CANCER_QUESTION4.CHECK3 === '3' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan="3">대장암</th>
                    <th className="bg-lightgray">
                      분변잠혈검사 <span className="span-sm">(대변 검사)</span>
                    </th>
                    <td colSpan={4} className="radio-td">
                      <Radio.Group
                        className="w25"
                        buttonStyle="solid"
                        value={qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK4 && qData.CANCER_QUESTION4.CHECK4 ? qData.CANCER_QUESTION4.CHECK4 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION4', 'CHECK4', e.target.value)}
                      >
                        <Radio.Button value="0">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK4 && qData.CANCER_QUESTION4.CHECK4 === '0' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="1">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK4 && qData.CANCER_QUESTION4.CHECK4 === '1' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="2">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK4 && qData.CANCER_QUESTION4.CHECK4 === '2' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="3">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK4 && qData.CANCER_QUESTION4.CHECK4 === '3' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-lightgray">
                      대장이중조영검사 <span className="span-sm">(대장 X선 촬영)</span>
                    </th>
                    <td colSpan={4} className="radio-td">
                      <Radio.Group
                        className="w25"
                        buttonStyle="solid"
                        value={qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK5 && qData.CANCER_QUESTION4.CHECK5 ? qData.CANCER_QUESTION4.CHECK5 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION4', 'CHECK5', e.target.value)}
                      >
                        <Radio.Button value="0">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK5 && qData.CANCER_QUESTION4.CHECK5 === '0' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="1">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK5 && qData.CANCER_QUESTION4.CHECK5 === '1' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="2">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK5 && qData.CANCER_QUESTION4.CHECK5 === '2' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="3">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK5 && qData.CANCER_QUESTION4.CHECK5 === '3' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-lightgray">대장내시경</th>
                    <td colSpan={4} className="radio-td">
                      <Radio.Group
                        className="w25"
                        buttonStyle="solid"
                        value={qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK6 && qData.CANCER_QUESTION4.CHECK6 ? qData.CANCER_QUESTION4.CHECK6 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION4', 'CHECK6', e.target.value)}
                      >
                        <Radio.Button value="0">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK6 && qData.CANCER_QUESTION4.CHECK6 === '0' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="1">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK6 && qData.CANCER_QUESTION4.CHECK6 === '1' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="2">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK6 && qData.CANCER_QUESTION4.CHECK6 === '2' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="3">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK6 && qData.CANCER_QUESTION4.CHECK6 === '3' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>자궁경부암</th>
                    <th className="bg-lightgray">자궁경부세포검사</th>
                    <td colSpan={4} className="radio-td">
                      <Radio.Group
                        className="w25"
                        buttonStyle="solid"
                        value={qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK7 && qData.CANCER_QUESTION4.CHECK7 ? qData.CANCER_QUESTION4.CHECK7 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION4', 'CHECK7', e.target.value)}
                      >
                        <Radio.Button value="0">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK7 && qData.CANCER_QUESTION4.CHECK7 === '0' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="1">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK7 && qData.CANCER_QUESTION4.CHECK7 === '1' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="2">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK7 && qData.CANCER_QUESTION4.CHECK7 === '2' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="3">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK7 && qData.CANCER_QUESTION4.CHECK7 === '3' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th>폐암</th>
                    <th className="bg-lightgray">흉부CT</th>
                    <td colSpan={4} className="radio-td">
                      <Radio.Group
                        className="w25"
                        buttonStyle="solid"
                        value={qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK8 && qData.CANCER_QUESTION4.CHECK8 ? qData.CANCER_QUESTION4.CHECK8 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION4', 'CHECK8', e.target.value)}
                      >
                        <Radio.Button value="0">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK8 && qData.CANCER_QUESTION4.CHECK8 === '0' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="1">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK8 && qData.CANCER_QUESTION4.CHECK8 === '1' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="2">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK8 && qData.CANCER_QUESTION4.CHECK8 === '2' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="3">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK8 && qData.CANCER_QUESTION4.CHECK8 === '3' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan="2">간암</th>
                    <th className="bg-lightgray" rowSpan="2">
                      간초음파
                    </th>
                    <th className="bg-lightgray">
                      <b>한 적 없음</b>
                    </th>
                    <th className="bg-lightgray">6개월 이내</th>
                    <th className="bg-lightgray">6개월에서 1년 사이</th>
                    <th className="bg-lightgray">1년보다 오래 전에</th>
                  </tr>
                  <tr>
                    <td colSpan={4} className="radio-td">
                      <Radio.Group
                        className="w25"
                        buttonStyle="solid"
                        value={qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK9 && qData.CANCER_QUESTION4.CHECK9 ? qData.CANCER_QUESTION4.CHECK9 : ''}
                        onChange={e => this.onChangeDataTowKey('CANCER_QUESTION4', 'CHECK9', e.target.value)}
                      >
                        <Radio.Button value="0">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK9 && qData.CANCER_QUESTION4.CHECK9 === '0' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="1">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK9 && qData.CANCER_QUESTION4.CHECK9 === '1' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="2">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK9 && qData.CANCER_QUESTION4.CHECK9 === '2' ? 'O' : ''}
                        </Radio.Button>
                        <Radio.Button value="3">
                          {qData.CANCER_QUESTION4 && qData.CANCER_QUESTION4.CHECK9 && qData.CANCER_QUESTION4.CHECK9 === '3' ? 'O' : ''}
                        </Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="add-title point2">※ 해당되는 곳에 &#39;O&#39; 표시 해 주십시오.</p>
              <p className="question-txt">
                <span className="question-num">5.</span>
                현재 또는 과거에 진단받은 위장질환이 있습니까?
              </p>
              <table className="question-table">
                <colgroup>
                  <col />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>질환명</th>
                    <th>위궤양</th>
                    <th>위축성 위염</th>
                    <th>장상피 화생</th>
                    <th>위용종</th>
                    <th>기타</th>
                    <th>
                      <b>없음</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>질환 유무</th>
                    <td colSpan={6} className="radio-td">
                      <Radio.Group
                        className="w16"
                        buttonStyle="solid"
                        value={qData.CANCER_QUESTION5}
                        onChange={e => this.onChangeDataOneKey('CANCER_QUESTION5', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.CANCER_QUESTION5 && qData.CANCER_QUESTION5 === '0' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.CANCER_QUESTION5 && qData.CANCER_QUESTION5 === '1' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.CANCER_QUESTION5 && qData.CANCER_QUESTION5 === '2' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="3">{qData.CANCER_QUESTION5 && qData.CANCER_QUESTION5 === '3' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="4">{qData.CANCER_QUESTION5 && qData.CANCER_QUESTION5 === '4' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="5">{qData.CANCER_QUESTION5 && qData.CANCER_QUESTION5 === '5' ? 'O' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">6.</span>
                현재 또는 과거에 진단받은 대장 항문질환이 있으십니까?
              </p>
              <table className="question-table">
                <colgroup>
                  <col />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>질환명</th>
                    <th>대장용종</th>
                    <th>궤양성 대장염</th>
                    <th>크론병</th>
                    <th>치질 (치핵, 치열)</th>
                    <th>기타</th>
                    <th>
                      <b>없음</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>질환 유무</th>
                    <td colSpan={6} className="radio-td">
                      <Radio.Group
                        className="w16"
                        buttonStyle="solid"
                        value={qData.CANCER_QUESTION6}
                        onChange={e => this.onChangeDataOneKey('CANCER_QUESTION6', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.CANCER_QUESTION6 && qData.CANCER_QUESTION6 === '0' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.CANCER_QUESTION6 && qData.CANCER_QUESTION6 === '1' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.CANCER_QUESTION6 && qData.CANCER_QUESTION6 === '2' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="3">{qData.CANCER_QUESTION6 && qData.CANCER_QUESTION6 === '3' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="4">{qData.CANCER_QUESTION6 && qData.CANCER_QUESTION6 === '4' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="5">{qData.CANCER_QUESTION6 && qData.CANCER_QUESTION6 === '5' ? 'O' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">7.</span>
                간(肝)질환이 있으십니까?
              </p>
              <table className="question-table">
                <colgroup>
                  <col />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                  <col style={{ width: '14.28%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>질환명</th>
                    <th>
                      B형간염
                      <br />
                      바이러스 보유자
                    </th>
                    <th>만성B형간염</th>
                    <th>만성C형간염</th>
                    <th>간경변</th>
                    <th>기타</th>
                    <th>
                      <b>없음</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>질환 유무</th>
                    <td colSpan={6} className="radio-td">
                      <Radio.Group
                        className="w16"
                        buttonStyle="solid"
                        value={qData.CANCER_QUESTION7}
                        onChange={e => this.onChangeDataOneKey('CANCER_QUESTION7', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.CANCER_QUESTION7 && qData.CANCER_QUESTION7 === '0' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.CANCER_QUESTION7 && qData.CANCER_QUESTION7 === '1' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.CANCER_QUESTION7 && qData.CANCER_QUESTION7 === '2' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="3">{qData.CANCER_QUESTION7 && qData.CANCER_QUESTION7 === '3' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="4">{qData.CANCER_QUESTION7 && qData.CANCER_QUESTION7 === '4' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="5">{qData.CANCER_QUESTION7 && qData.CANCER_QUESTION7 === '5' ? 'O' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">8.</span>
                폐(肺)질환이 있으십니까?
              </p>
              <table className="question-table">
                <colgroup>
                  <col />
                  <col style={{ width: '12.5%' }} />
                  <col style={{ width: '12.5%' }} />
                  <col style={{ width: '12.5%' }} />
                  <col style={{ width: '12.5%' }} />
                  <col style={{ width: '12.5%' }} />
                  <col style={{ width: '12.5%' }} />
                  <col style={{ width: '12.5%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>질환명</th>
                    <th>
                      만성폐쇄성폐질환
                      <br />
                      (만성기관지염)
                    </th>
                    <th>폐결핵</th>
                    <th>폐결절</th>
                    <th>간질성 폐질환</th>
                    <th>진폐증</th>
                    <th>기타</th>
                    <th>
                      <b>없음</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>질환 유무</th>
                    <td colSpan={7} className="radio-td">
                      <Radio.Group
                        className="w14"
                        buttonStyle="solid"
                        value={qData.CANCER_QUESTION8}
                        onChange={e => this.onChangeDataOneKey('CANCER_QUESTION8', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.CANCER_QUESTION8 && qData.CANCER_QUESTION8 === '0' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.CANCER_QUESTION8 && qData.CANCER_QUESTION8 === '1' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.CANCER_QUESTION8 && qData.CANCER_QUESTION8 === '2' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="3">{qData.CANCER_QUESTION8 && qData.CANCER_QUESTION8 === '3' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="4">{qData.CANCER_QUESTION8 && qData.CANCER_QUESTION8 === '4' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="5">{qData.CANCER_QUESTION8 && qData.CANCER_QUESTION8 === '5' ? 'O' : ''}</Radio.Button>
                        <Radio.Button value="6">{qData.CANCER_QUESTION8 && qData.CANCER_QUESTION8 === '6' ? 'O' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">※ 유방암 및 자궁경부암 (여성분들만 응답해 주세요)</p>
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">9.</span>
                월경을 언제 시작하셨습니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.CANCER_QUESTION9} onChange={e => this.onChangeDataOneKey('CANCER_QUESTION9', e.target.value)}>
                  <Radio value="0">
                    만
                    <AntInput
                      className="ant-input-xxs ant-input-inline ml5 mr5"
                      style={{ width: 50 }}
                      value={qData.CANCER_QUESTION9_AGE}
                      onChange={e => this.onChangeDataOneKey('CANCER_QUESTION9_AGE', e.target.value)}
                    />{' '}
                    세
                  </Radio>
                  <Radio value="1">초경이 없었음</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">10.</span>
                현재 월경의 상태는 어떠십니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.CANCER_QUESTION10} onChange={e => this.onChangeDataOneKey('CANCER_QUESTION10', e.target.value)}>
                  <Radio value="0">아직 월경이 있음</Radio>
                  <Radio value="1">자궁적축술을 하였음</Radio>
                  <Radio value="2">
                    폐경되었음 (폐경연령: 만
                    <AntInput
                      className="ant-input-xxs ant-input-inline ml5 mr5"
                      style={{ width: 50 }}
                      value={qData.CANCER_QUESTION10_AGE}
                      onChange={e => this.onChangeDataOneKey('CANCER_QUESTION10_AGE', e.target.value)}
                    />{' '}
                    세)
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">11.</span>
                폐경 후 증상을 완화하기 위해서 호르몬 제제를 복용하고 계시거나 과거에 복용하신 적이 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.CANCER_QUESTION11} onChange={e => this.onChangeDataOneKey('CANCER_QUESTION11', e.target.value)}>
                  <Radio value="0">호르몬 제제를 복용한 적이 없음</Radio>
                  <Radio value="1">2년 미만 복용</Radio>
                  <Radio value="2">2년 이상~5년 미만 복용</Radio>
                  <Radio value="3">5년 이상 복용</Radio>
                  <Radio value="4">모르겠음</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">12.</span>
                자녀를 몇 명 출산하셨습니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.CANCER_QUESTION12} onChange={e => this.onChangeDataOneKey('CANCER_QUESTION12', e.target.value)}>
                  <Radio value="0">1명</Radio>
                  <Radio value="1">2명 이상</Radio>
                  <Radio value="2">출산한 적 없음</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">13.</span>
                모유 수유 여부 및 총 수유 기간은?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.CANCER_QUESTION13} onChange={e => this.onChangeDataOneKey('CANCER_QUESTION13', e.target.value)}>
                  <Radio value="0">6개월 미만</Radio>
                  <Radio value="1">6개월~1년 미만</Radio>
                  <Radio value="2">1년 이상</Radio>
                  <Radio value="3">수유한 적 없음</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">14.</span>
                과거에 유방에 양성 종양으로 진단받은 적이 있습니까?
                <br />
                (양성 종양이란 악성 종양인 암이 아닌 기타 물혹, 덩어리 등을 말합니다.)
              </p>
              <div className="question-article">
                <Radio.Group value={qData.CANCER_QUESTION14} onChange={e => this.onChangeDataOneKey('CANCER_QUESTION14', e.target.value)}>
                  <Radio value="0">예</Radio>
                  <Radio value="1">아니오</Radio>
                  <Radio value="2">모르겠음</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">15.</span>
                피임약을 복용하고 계시거나 과거에 복용한 적이 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.CANCER_QUESTION15} onChange={e => this.onChangeDataOneKey('CANCER_QUESTION15', e.target.value)}>
                  <Radio value="0">피임약을 복용한 적 없음</Radio>
                  <Radio value="1">1년 미만 복용</Radio>
                  <Radio value="2">1년 이상 복용</Radio>
                  <Radio value="3">모르겠음</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">만 66세 이상 검진자만 작성하세요.</p>
            <div className="question-item">
              <p className="add-title">※ 인지기능장애 평가 도구 관련 문항</p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '60%' }} />
                  <col style={{ width: '13.33%' }} />
                  <col style={{ width: '13.33%' }} />
                  <col style={{ width: '13.33%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Korean Dementia Screening Questionnaire - C</th>
                    <th>
                      아니다
                      <br />
                      (0점)
                    </th>
                    <th>
                      가끔(조금) 그렇다
                      <br />
                      (1점)
                    </th>
                    <th>
                      자주(많이) 그렇다
                      <br />
                      (2점)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">1.</span>오늘이 몇 월이고, 무슨 요일인지 잘 모른다
                    </td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION1}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION1', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION1 && qData.OLD_QUESTION1 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION1 && qData.OLD_QUESTION1 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION1 && qData.OLD_QUESTION1 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">2.</span>자기가 놔둔 물건을 찾지 못한다
                    </td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION2}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION2', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION2 && qData.OLD_QUESTION2 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION2 && qData.OLD_QUESTION2 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION2 && qData.OLD_QUESTION2 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">3.</span>같은 질문을 반복해서 한다
                    </td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION3}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION3', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION3 && qData.OLD_QUESTION3 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION3 && qData.OLD_QUESTION3 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION3 && qData.OLD_QUESTION3 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">4.</span>약속을 하고서 잊어버린다
                    </td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION4}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION4', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION4 && qData.OLD_QUESTION4 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION4 && qData.OLD_QUESTION4 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION4 && qData.OLD_QUESTION4 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">5.</span>물건을 가지러 갔다가 잊어버리고 그냥 온다
                    </td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION5}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION5', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION5 && qData.OLD_QUESTION5 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION5 && qData.OLD_QUESTION5 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION5 && qData.OLD_QUESTION5 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">6.</span>물건이나 사람의 이름을 대기가 힘들어 머뭇거린다
                    </td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION6}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION6', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION6 && qData.OLD_QUESTION6 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION6 && qData.OLD_QUESTION6 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION6 && qData.OLD_QUESTION6 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">7.</span>대화 중 내용이 이해되지 않아 반복해서 물어본다
                    </td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION7}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION7', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION7 && qData.OLD_QUESTION7 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION7 && qData.OLD_QUESTION7 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION7 && qData.OLD_QUESTION7 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">8.</span>길을 잃거나 헤맨 적이 있다
                    </td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION8}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION8', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION8 && qData.OLD_QUESTION8 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION8 && qData.OLD_QUESTION8 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION8 && qData.OLD_QUESTION8 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num">
                      <span className="num">9.</span>예전에 비해서 계산 능력이 떨어졌다
                      <br />
                      (예: 물건값이나 거스름돈 계산을 못한다)
                    </td>
                    <td colSpan={3} className="radio-td td-2rows">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION9}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION9', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION9 && qData.OLD_QUESTION9 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION9 && qData.OLD_QUESTION9 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION9 && qData.OLD_QUESTION9 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num extend">
                      <span className="num">10.</span>예전에 비해 성격이 변했다
                    </td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION10}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION10', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION10 && qData.OLD_QUESTION10 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION10 && qData.OLD_QUESTION10 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION10 && qData.OLD_QUESTION10 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num td-num extend">
                      <span className="num">11.</span>이전에 잘 다루던 기구의 사용이 서툴러졌다. <br />
                      (세탁기, 전기밥솥, 경운기 등)
                    </td>
                    <td colSpan={3} className="radio-td td-2rows">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION11}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION11', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION11 && qData.OLD_QUESTION11 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION11 && qData.OLD_QUESTION11 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION11 && qData.OLD_QUESTION11 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num td-num extend">
                      <span className="num">12.</span>예전에 비해 방이나 집안의 정리정돈을 하지 못한다
                    </td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION12}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION12', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION12 && qData.OLD_QUESTION12 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION12 && qData.OLD_QUESTION12 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION12 && qData.OLD_QUESTION12 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num td-num extend">
                      <span className="num">13.</span>상황에 맞게 스스로 옷을 선택하여 입지 못한다
                    </td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION13}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION13', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION13 && qData.OLD_QUESTION13 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION13 && qData.OLD_QUESTION13 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION13 && qData.OLD_QUESTION13 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num td-num extend">
                      <span className="num">14.</span>혼자 대중교통 수단을 이용하여 목적지에 가기 힘들다
                      <br />
                      (신체적인 문제(관절염)로 인한 것은 제외됨)
                    </td>
                    <td colSpan={3} className="radio-td td-2rows">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION14}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION14', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION14 && qData.OLD_QUESTION14 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION14 && qData.OLD_QUESTION14 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION14 && qData.OLD_QUESTION14 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left td-num td-num extend">
                      <span className="num">15.</span>내복이나 옷이 더러워져도 갈아입지 않으려고 한다
                    </td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group
                        buttonStyle="solid"
                        className="w33"
                        value={qData.OLD_QUESTION15}
                        onChange={e => this.onChangeDataOneKey('OLD_QUESTION15', e.target.value)}
                      >
                        <Radio.Button value="0">{qData.OLD_QUESTION15 && qData.OLD_QUESTION15 === '0' ? '0' : ''}</Radio.Button>
                        <Radio.Button value="1">{qData.OLD_QUESTION15 && qData.OLD_QUESTION15 === '1' ? '1' : ''}</Radio.Button>
                        <Radio.Button value="2">{qData.OLD_QUESTION15 && qData.OLD_QUESTION15 === '2' ? '2' : ''}</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">※ 예방접종 관련 문항에 선택해 주십시오.</p>
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">1.</span>
                인플루엔자(독감) 예방접종을 매년 하십니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.VACCINATION_QUESTION1} onChange={e => this.onChangeDataOneKey('VACCINATION_QUESTION1', e.target.value)}>
                  <Radio value="Y">예</Radio>
                  <Radio value="N">아니오</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">2.</span>
                폐렴 예방접종을 받으셨습니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.VACCINATION_QUESTION2} onChange={e => this.onChangeDataOneKey('VACCINATION_QUESTION2', e.target.value)}>
                  <Radio value="Y">예</Radio>
                  <Radio value="N">아니오</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">※ 일상생활 수행능력 관련 문항</p>
            <div className="question-item">
              <p className="add-title">■ 아래 문항을 읽고 자신의 현재 상태에 해당하는 답을 선택해 주십시오.</p>
              <p className="question-txt">
                <span className="question-num">1.</span>
                음식을 차려 주면 남의 도움 없이 혼자서 식사하십니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.LIFE_QUESTION1} onChange={e => this.onChangeDataOneKey('LIFE_QUESTION1', e.target.value)}>
                  <Radio value="Y">예</Radio>
                  <Radio value="N">아니오</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">2.</span>
                옷을 챙겨 입을 때 남의 도움 없이 혼자서 하십니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.LIFE_QUESTION2} onChange={e => this.onChangeDataOneKey('LIFE_QUESTION2', e.target.value)}>
                  <Radio value="Y">예</Radio>
                  <Radio value="N">아니오</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">3.</span>
                대소변을 보기 위해 화장실 출입할 때 남의 도움없이 혼자서 하십니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.LIFE_QUESTION3} onChange={e => this.onChangeDataOneKey('LIFE_QUESTION3', e.target.value)}>
                  <Radio value="Y">예</Radio>
                  <Radio value="N">아니오</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">4.</span>
                목욕하실 때 남의 도움 없이 혼자서 하십니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.LIFE_QUESTION4} onChange={e => this.onChangeDataOneKey('LIFE_QUESTION4', e.target.value)}>
                  <Radio value="Y">예</Radio>
                  <Radio value="N">아니오</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">5.</span>
                식사 준비를 다른 사람의 도움 없이 혼자서 하십니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.LIFE_QUESTION5} onChange={e => this.onChangeDataOneKey('LIFE_QUESTION5', e.target.value)}>
                  <Radio value="Y">예</Radio>
                  <Radio value="N">아니오</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">6.</span>
                상점, 이웃, 병원, 관공서 등 걸어서 갔다 올 수 있는 곳의 외출을 다른 사람의 도움 없이 혼자서 하십니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.LIFE_QUESTION6} onChange={e => this.onChangeDataOneKey('LIFE_QUESTION6', e.target.value)}>
                  <Radio value="Y">예</Radio>
                  <Radio value="N">아니오</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">※ 낙상 및 배뇨장애 관련 문항</p>
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">1.</span>
                낙상에 관한 질문입니다. 지난 6개월간 넘어진 적이 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.FALL_QUESTION1} onChange={e => this.onChangeDataOneKey('FALL_QUESTION1', e.target.value)}>
                  <Radio value="Y">예</Radio>
                  <Radio value="N">아니오</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">2.</span>
                배뇨장애, 소변을 보는데 장애가 있거나 소변을 지릴 경우가 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group value={qData.FALL_QUESTION2} onChange={e => this.onChangeDataOneKey('FALL_QUESTION2', e.target.value)}>
                  <Radio value="Y">예</Radio>
                  <Radio value="N">아니오</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">특수 건강 검진 문진표</p>
            <div className="question-item">
              <p className="add-title">
                ※ 표적 장기별 증상 관련 문항 - 최근 6개월 동안 있었던 <b>증상에 대해 표시해 주십시오.</b>
              </p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '60%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '10%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th rowSpan={2}>신체 부위</th>
                    <th rowSpan={2}>증상 문항</th>
                    <th colSpan={3}>증상</th>
                  </tr>
                  <tr>
                    <th>심하다</th>
                    <th>약간있다</th>
                    <th>없다</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th rowSpan={3}>일반</th>
                    <td className="td-left">식욕이 없고 체중이 줄었다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">피로감을 많이 느낀다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">몸의 어느 부위에서 덩어리가 만져진다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={4}>피부</th>
                    <td className="td-left">피부가 가렵거나 염증이 생긴다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">피부에 반점이 생긴다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">체모나 손톱, 발톱에 변화가 있다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">피부가 거칠어지거나 갈라진다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={3}>눈</th>
                    <td className="td-left">눈이 시리거나 눈물이 잘 난다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">시력이 전보다 나빠졌다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">눈이 충혈되거나 아프다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={2}>귀</th>
                    <td className="td-left">말소리가 또렷하게 들리지 않는다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">귀에서 소리가 난다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={3}>코</th>
                    <td className="td-left">코피가 자주난다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">콧물이 나고 코가 답답하다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">냄새를 잘 못 맡는다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={2}>입</th>
                    <td className="td-left">잇몸에서 피가 나거나 잇몸이 헌다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">맛을 잘 못 느낀다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={3}>소화기</th>
                    <td className="td-left">배가 찌르듯이 아픈적이 있다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">금속을 빠는 것 같은 입 맛이 난다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">변비가 있다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={5}>심혈관/호흡기</th>
                    <td className="td-left">작업 중 가슴이 두근거린다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">일을 할 때 기침이 나고, 숨이 차다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">가슴이 답답하다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">아침에 일어났을 때 가래가 나오거나 기침을 한다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">쉬고 난 다음날 작업장에 나가면 기침을 한다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={5}>척추/사지</th>
                    <td className="td-left">팔, 다리, 어깨가 쑤시거나 아프다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">손, 발이 떨리거나 힘이 없다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">손이나 발의 감각이 둔해졌다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">추우면 손가락이 하얗게 된다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">허리가 아프다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={6}>정신/신경</th>
                    <td className="td-left">머리가 아프다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">어지럽다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">기억력이 나빠지거나 건망증이 심해졌다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">불안하고 초조하다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">정신이 멍해지거나 술취한 느낌이 든다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">정신을 집중하기가 어렵다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan={5}>비뇨/생식</th>
                    <td className="td-left">소변이 잘 안나온다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">몸이 붓는다</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">생리가 불규칙해졌다(여성)</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">자연유산을 한 적이 있다(여성)</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-left">현재 생리중이다(여성)</td>
                    <td colSpan={3} className="radio-td">
                      <Radio.Group buttonStyle="solid" className="w33">
                        <Radio.Button value="0">1</Radio.Button>
                        <Radio.Button value="1">2</Radio.Button>
                        <Radio.Button value="2">3</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="question-item">
                <p className="question-txt pad-none">* 작업 중에 건강상의 문제(몸의 이상)를 느낀 적이 있습니까?</p>
                <div className="question-article">
                  <Radio.Group>
                    <Radio value="Y">예</Radio>
                    <Radio value="N">아니오</Radio>
                  </Radio.Group>
                </div>
              </div>
              {/* question-item */}
              <div className="question-item">
                <p className="question-txt pad-none">* 작업 중에 취급하는 물질로 인해 건강 문제가 생겼다고 생각합니까?</p>
                <div className="question-article">
                  <Radio.Group>
                    <Radio value="Y">예</Radio>
                    <Radio value="N">아니오</Radio>
                  </Radio.Group>
                </div>
              </div>
              {/* question-item */}
              <div className="question-item">
                <p className="question-txt pad-none">* 그 외 다른 증상이 있는 경우, 아래의 칸에 기술해 주십시오.</p>
                <div className="question-article">
                  <AntTextarea></AntTextarea>
                </div>
              </div>
              {/* question-item */}
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
        </StyledContentsWrapper>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light mr5" onClick={this.props.onCancelPopup}>
            닫기
          </StyledButton>
          <StyledButton className="btn-primary" onClick={this.onSave}>
            {saveType === 'I' ? '등록' : '저장'}
          </StyledButton>
        </StyledButtonWrapper>
      </Styled>
    );
  }
}

QuestionnaireView.propTypes = {
  onCancelPopup: PropTypes.func,
};

QuestionnaireView.defaultProps = {
  onCancelPopup: () => {},
};

export default QuestionnaireView;
