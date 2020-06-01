import React, { Component } from 'react';
import { Modal, Select, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModalPad from 'components/BizBuilder/styled/Modal/StyledAntdModalPad';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

import moment from 'moment';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import Questionnaire from './Questionnaire';
import HospitalItem from './HospitalItem';

const AntdModal = StyledAntdModalPad(Modal);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class Reservation extends Component {
  state = {
    isQuestionnaireShow: false,
    isChkItemShow: false,
    reservationInfo: {},
    familyInfo: {},
    hospitalList: [],
    userInfo: {},
    reservationInfo: {},
    checkedVals: [],
    famCheckedVals: [],
    monthList: [],
    dayList: [],
    quotaList: [],
    gubun: 1,
    isDelFamilyInfo: false,
  };

  componentWillMount() {
    const { sagaKey, getCallDataHandler, profile, spinningOn } = this.props;
    const apiAry = [
      {
        key: 'hospitalList',
        url: `/api/eshs/v1/common/health/healthChkHospital`,
        type: 'GET',
        params: {},
      },
      {
        key: 'userDetail',
        url: `/api/common/v1/account/userDetail/${profile.USER_ID}`,
        type: 'GET',
        params: {},
      },
      {
        key: 'reservation',
        url: `/api/eshs/v1/common/health/healthChkReservation`,
        type: 'GET',
        params: {},
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, this.initState);
  }

  initState = () => {
    const { result, spinningOff } = this.props;
    this.setState({
      hospitalList: result.hospitalList && result.hospitalList.list ? result.hospitalList.list : [],
      userInfo: result.userDetail && result.userDetail.data ? result.userDetail.data : {},
      reservationInfo: result.reservation && result.reservation.detail && result.reservation.detail.reservationInfo ? result.reservation.detail.reservationInfo : {},
      familyInfo: result.reservation && result.reservation.detail && result.reservation.detail.familyInfo ? result.reservation.detail.familyInfo : {},
    });
    spinningOff();
  };

  onClickQuestionnaire = () => {
    this.setState({ isQuestionnaireShow: true });
  };

  onCancelQuestionnaire = () => {
    this.setState({ isQuestionnaireShow: false });
  };

  onClickChkItem = gubun => {
    const { reservationInfo, familyInfo } = this.state;
    let target = reservationInfo;
    if (gubun === 2) {
      target = familyInfo;
    }
    if (!target.HOSPITAL_CODE || target.HOSPITAL_CODE === '') {
      message.info(<MessageContent>검진기관을 선택해주세요.</MessageContent>);
      return false;
    }
    if (!target.APP_DT || target.APP_DT === '') {
      message.info(<MessageContent>예약일을 선택해주세요.</MessageContent>);
      return false;
    }
    this.setState({ isChkItemShow: true, gubun });
  };

  onCancelChkItem = () => {
    this.setState({ isChkItemShow: false });
  };

  onOkChkItem = (chkType, selectedItems, vals) => {
    this.setState(prevState => {
      const { reservationInfo, familyInfo, gubun, checkedVals, famCheckedVals } = prevState;
      if (gubun === 1) {
        reservationInfo.CHK_ITEMS = selectedItems.map(item => item.ITEM_NAME).join(', ');
        reservationInfo.CHK_TYPE = chkType.CHK_TYPE;
        reservationInfo.CHK_TYPE_NAME = chkType.CHK_TYPE_NAME;
        vals.forEach(t => {
          if (!checkedVals.includes(t)) {
            checkedVals.push(t);
          }
        });
      } else {
        familyInfo.CHK_ITEMS = selectedItems.map(item => item.ITEM_NAME).join(', ');
        familyInfo.CHK_TYPE = chkType.CHK_TYPE;
        familyInfo.CHK_TYPE_NAME = chkType.CHK_TYPE_NAME;
        vals.forEach(t => {
          if (!famCheckedVals.includes(t)) {
            famCheckedVals.push(t);
          }
        });
      }
      return {
        reservationInfo,
        familyInfo,
        checkedVals,
        famCheckedVals,
        isChkItemShow: false,
      }
    });
  }

  // 검진기관 변경시 선택항목 초기화
  onChangeHospital = (val, gubun) => {
    this.setState(prevState => {
      const { reservationInfo, familyInfo, checkedVals, famCheckedVals, hospitalList } = prevState;
      if (gubun === 1) {
        reservationInfo.HOSPITAL_CODE = val;
        reservationInfo['HOSPITAL_NAME'] = hospitalList.filter(item => item.HOSPITAL_CODE === val)[0].HOSPITAL_NAME;
        reservationInfo['CHK_ITEMS'] = '';
        checkedVals.splice(0, checkedVals.length);
      } else {
        familyInfo.HOSPITAL_CODE = val;
        familyInfo['HOSPITAL_NAME'] = hospitalList.filter(item => item.HOSPITAL_CODE === val)[0].HOSPITAL_NAME;
        familyInfo['CHK_ITEMS'] = '';
        famCheckedVals.splice(0, famCheckedVals.length);
      }
      return {
        reservationInfo,
        familyInfo,
        checkedVals,
        famCheckedVals,
      }
    });
    
    const { sagaKey, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'quotaList',
      url: `/api/eshs/v1/common/health/healthChkHospitalQuota?HOSPITAL_CODE=${val}`,
      type: 'GET',
      params: {},
    }
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      if (res && res.list) {
        this.setState({
          quotaList: res.list,
        });
      }
    });
  };

  onChangeReservationInfo = (key, val, gubun) => {
    this.setState(prevState => {
      const { reservationInfo, familyInfo } = prevState;
      if (key === 'RCV_ADDR') {
        reservationInfo[key] = val;
        familyInfo[key] = val;
      } else {
        if (gubun === 1) {
          reservationInfo[key] = val;
        } else {
          familyInfo[key] = val;
        }
      }
      return {
        reservationInfo,
        familyInfo,
      }
    });
  };

  addFamilyReservation = () => {
    const { sagaKey, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'famInfo',
      url: `/api/eshs/v1/common/health/healthChkRecentFam`,
      type: 'POST',
      params: {},
    }
    getCallDataHandlerReturnRes(sagaKey, apiInfo, (id, res) => {
      if (res) {
        if (res.info && res.info.YEAR_TERM < 2) {
          message.info(<MessageContent>최근 1년 검진내역이 있어 당해년도 검진대상이 아닙니다.</MessageContent>);
        } else {
          this.setState(prevState => {
            const { reservationInfo, familyInfo } = prevState;
            return {
              familyInfo: {
                ...reservationInfo,
                CHK_CD: '',
                IS_MATE: '1',
                HOSPITAL_CODE: '',
                HOSPITAL_NAME: '',
                CHK_TYPE: '',
                CHK_TYPE_NAME: '',
                APP_DT: '',
                CHK_ITEMS: ''
              },
              isDelFamilyInfo: false,
            }
          });
        }
      }
    });
  };

  removeFamilyReservation = () => {
    this.setState({ familyInfo: {}, isDelFamilyInfo: true });
  }

  onSave = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const { reservationInfo, familyInfo, isDelFamilyInfo } = this.state;

    Modal.confirm({
      title: '저장하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const submitData = {
          PARAM: {
            reservationInfo: { ...reservationInfo },
            familyInfo: { ...familyInfo },
            isDelFamilyInfo,
          },
        };
        spinningOn();
        submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/health/healthChkReservation', submitData, (id, res) => {
          if (res && res.result === 1) {
            message.info(<MessageContent>저장하였습니다.</MessageContent>);
          } else {
            message.error(<MessageContent>저장에 실패하였습니다.</MessageContent>);
          }
          spinningOff();
        });
      }
    });
  }

  render() {
    const { hospitalList, userInfo, reservationInfo, familyInfo, checkedVals, famCheckedVals, quotaList, gubun } = this.state;

    return (
      <>
        <AntdModal
          width={1050}
          visible={this.state.isQuestionnaireShow}
          title="건강검진 공통 문진표"
          onCancel={this.onCancelQuestionnaire}
          destroyOnClose
          footer={null}
        >
          <Questionnaire onCancelPopup={this.onCancelQuestionnaire} userInfo={userInfo} chkTypeCd={reservationInfo.CHK_TYPE_CD} />
        </AntdModal>
        <AntdModal
          width={700}
          visible={this.state.isChkItemShow}
          title="기본 선택검진 항목 선택"
          onCancel={this.onCancelChkItem}
          destroyOnClose
          footer={null}
        >
          <HospitalItem
            onCancelPopup={this.onCancelChkItem}
            onOkChkItem={this.onOkChkItem}
            checkedVals={gubun === 1 ? checkedVals : famCheckedVals}
            reservationInfo={gubun === 1 ? reservationInfo : familyInfo}
            userInfo={userInfo}
          />
        </AntdModal>
        <StyledContentsWrapper>
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="15%" />
                <col width="10%" />
                <col width="15%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>사번</th>
                  <td>{userInfo.EMP_NO}</td>
                  <th>이름</th>
                  <td>{userInfo.NAME_KOR}</td>
                  <td colSpan={6}>
                    <StyledButton className="btn-sm btn-gray" onClick={this.onClickQuestionnaire}>
                      문진표 작성
                    </StyledButton>
                  </td>
                </tr>
                <tr>
                  <th>주민등록번호</th>
                  <td>{userInfo.REGNO && (`${userInfo.REGNO.substring(0, 6)} - ${userInfo.REGNO.substring(6, 13)}`)}</td>
                  <th>전화번호</th>
                  <td>
                    <AntdInput
                      value={reservationInfo.RCV_PHONE || userInfo.MOBILE_TEL_NO} className="int-input-sm"
                      onChange={e => this.onChangeReservationInfo('RCV_PHONE', e.target.value, 1)}
                    />
                  </td>
                  <th>검진종류</th>
                  <td>종합</td>
                  <th>검진차수</th>
                  <td>1차</td>
                </tr>
                <tr>
                  <th>검진기관</th>
                  <td>
                    <AntdSelect
                      value={reservationInfo.HOSPITAL_CODE} placeholder="검진기관 선택" className="select-sm" style={{ width: '100%' }}
                      onChange={val => this.onChangeHospital(val, 1)}
                    >
                      {hospitalList.map(item => (
                        <AntdSelect.Option value={item.HOSPITAL_CODE}>{item.HOSPITAL_NAME}</AntdSelect.Option>
                      ))}
                    </AntdSelect>
                  </td>
                  <th>검진유형</th>
                  <td>{reservationInfo.CHK_TYPE && (`${reservationInfo.CHK_TYPE}형(${reservationInfo.CHK_TYPE_NAME})`)}</td>
                  <th>검진예약일</th>
                  <td colSpan={3}>
                    {/* <AntdSelect placeholder="월 선택" className="select-sm mr5" style={{ width: '28%' }} /> */}
                    <AntdSelect
                      value={reservationInfo.APP_DT}
                      placeholder="검진일 선택" className="select-sm" style={{ width: '50%' }}
                      onChange={val => this.onChangeReservationInfo('APP_DT', val, 1)}
                    >
                    {quotaList && quotaList.length > 0 && (
                      quotaList.map(item => {
                        if (item.APP_DT_CNT < item.QUOTA_NUM) {
                          return (
                            <AntdSelect.Option value={item.APP_DT}>{`${item.APP_DT}(${moment(item.APP_DT).format('ddd')}) (${item.APP_DT_CNT}/${item.QUOTA_NUM})`}</AntdSelect.Option>
                          )
                        }
                      })
                    )}
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th>선택항목</th>
                  <td colSpan={7}>
                    <AntdInput
                      value={reservationInfo.CHK_ITEMS} className="ant-input-sm" style={{ width: '100%', cursor: 'pointer' }} readOnly
                      onClick={() => this.onClickChkItem(1)}
                    />
                  </td>
                </tr>
                {Object.keys(familyInfo).length > 0 && (
                  <>
                    <tr>
                      <th>배우자</th>
                      <td colSpan={7}>{userInfo.FAM_NAME}</td>
                    </tr>
                    <tr>
                      <th>검진기관</th>
                      <td>
                        <AntdSelect
                          value={familyInfo.HOSPITAL_CODE} placeholder="검진기관 선택" className="select-sm" style={{ width: '100%' }}
                          onChange={val => this.onChangeHospital(val, 2)}
                        >
                          {hospitalList.map(item => (
                            <AntdSelect.Option value={item.HOSPITAL_CODE}>{item.HOSPITAL_NAME}</AntdSelect.Option>
                          ))}
                        </AntdSelect>
                      </td>
                      <th>검진유형</th>
                      <td>{familyInfo.CHK_TYPE && (`${familyInfo.CHK_TYPE}형(${familyInfo.CHK_TYPE_NAME})`)}</td>
                      <th>검진예약일</th>
                      <td colSpan={3}>
                        <AntdSelect
                          value={familyInfo.APP_DT}
                          placeholder="검진일 선택" className="select-sm" style={{ width: '50%' }}
                          onChange={val => this.onChangeReservationInfo('APP_DT', val, 2)}
                        >
                        {quotaList && quotaList.length > 0 && (
                          quotaList.map(item => {
                            if (item.APP_DT_CNT < item.QUOTA_NUM) {
                              return (
                                <AntdSelect.Option value={item.APP_DT}>{`${item.APP_DT}(${moment(item.APP_DT).format('ddd')}) (${item.APP_DT_CNT}/${item.QUOTA_NUM})`}</AntdSelect.Option>
                              )
                            }
                          })
                        )}
                        </AntdSelect>
                      </td>
                    </tr>
                    <tr>
                      <th>선택항목</th>
                      <td colSpan={7}>
                        <AntdInput
                          value={familyInfo.CHK_ITEMS} className="ant-input-sm" style={{ width: '100%', cursor: 'pointer' }} readOnly
                          onClick={() => this.onClickChkItem(2)}
                        />
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <th>수령지</th>
                  <td colSpan={7}>
                    <AntdInput
                      value={reservationInfo.RCV_ADDR} className="ant-input-sm" style={{ width: '100%' }}
                      onChange={e => this.onChangeReservationInfo('RCV_ADDR', e.target.value, 1)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
            {/* {userInfo && userInfo.FAM_NAME && ( */}
              {familyInfo && Object.keys(familyInfo).length > 0 ? (
                <StyledButton className="btn-light btn-sm mr5" onClick={this.removeFamilyReservation}>배우자 검진 삭제</StyledButton>
              ) : (
                <StyledButton className="btn-light btn-sm mr5" onClick={this.addFamilyReservation}>배우자 검진 추가</StyledButton>
              )}
            {/* )} */}
            <StyledButton className="btn-primary btn-sm" onClick={this.onSave}>저장</StyledButton>
          </StyledButtonWrapper>
        </StyledContentsWrapper>
      </>
    );
  }
}

export default Reservation;
