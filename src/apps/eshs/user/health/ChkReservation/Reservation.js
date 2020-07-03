import React, { Component } from 'react';
import { Modal, Select, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import UserSearchModal from 'apps/eshs/common/userSearchModal';

import Questionnaire from './Questionnaire';
import HospitalItem from './HospitalItem';

const AntdModal = StyledAntdModal(Modal);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

class Reservation extends Component {
  state = {
    isQuestionnaireShow: false,
    isChkItemShow: false,
    reservationInfo: {},    // 본인 검진예약 정보
    familyInfo: {},         // 배우자 검진예약 정보
    hospitalList: [],       // 검진기관 목록
    userInfo: {},           // 본인 상세정보
    quotaList: [],          // 검진기관 검진예약가능일
    gubun: 1,               // 데이터 변경시 구분값(1:본인 2:배우자)
    isFamily: false,        // 배우자 존재여부
    isDelFamilyInfo: false, // 배우자 검진정보 삭제여부(등록 후 삭제했을경우 DB삭제하기위한 값)
    isRcv: true,            // 검진대상자 여부
    CHK_YEAR: '',
    SCH_USER_ID: 0,         // 검진내역 검색할 사용자 ID(매니저만 검색 가능)
    EMP_NO: '',
  };

  componentWillMount() {
    const today = new Date();
    const currYear = today.getFullYear();

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
        url: `/api/eshs/v1/common/health/healthChkReservation?CHK_YEAR=${currYear}`,
        type: 'GET',
        params: {},
      },
    ];
    this.setState({
      CHK_YEAR: currYear.toString(),
      SCH_USER_ID: profile.USER_ID,
      EMP_NO: profile.EMP_NO,
    });
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, this.initState);
  }

  initState = () => {
    const { result, spinningOff, sagaKey, getCallDataHandlerReturnRes } = this.props;
    let reservationInfo = {};
    let familyInfo;
    if (result.reservation && result.reservation.detail && result.reservation.detail.reservationInfo) {
      reservationInfo = result.reservation.detail.reservationInfo;
    }
    if (result.reservation && result.reservation.detail && result.reservation.detail.familyInfo) {
      familyInfo = result.reservation.detail.familyInfo;
    }

    this.setState({
      hospitalList: result.hospitalList && result.hospitalList.list ? result.hospitalList.list : [],
      userInfo: result.userDetail && result.userDetail.data ? result.userDetail.data : {},
      reservationInfo: reservationInfo ? { ...reservationInfo, CHK_ITEMS_CODE: reservationInfo.CHK_ITEMS_CODE ? JSON.parse(reservationInfo.CHK_ITEMS_CODE) : [] } : {},
      familyInfo: familyInfo ? { ...familyInfo, CHK_ITEMS_CODE: familyInfo.CHK_ITEMS_CODE ? JSON.parse(familyInfo.CHK_ITEMS_CODE) : [] } : {},
      isFamily: result.userDetail && result.userDetail.data && result.userDetail.data.FAM_NAME && result.userDetail.data.FAM_REGNO ? true : false,
      isRcv: result.reservation && result.reservation.detail && result.reservation.detail.reservationInfo ? true : false,
    });

    if (result.reservation && result.reservation.detail && result.reservation.detail.reservationInfo) {
      const apiInfo = {
        key: 'quotaList',
        url: `/api/eshs/v1/common/health/healthChkHospitalQuota?HOSPITAL_CODE=${result.reservation.detail.reservationInfo.HOSPITAL_CODE}`,
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
    }
    spinningOff();
  };

  onClickQuestionnaire = () => {
    this.setState({ isQuestionnaireShow: true });
  };

  onCancelQuestionnaire = () => {
    this.setState({ isQuestionnaireShow: false });
  };

  // 추가검진항목 클릭 - 검진항목선택 팝업
  onClickChkItem = gubun => {
    const { reservationInfo, familyInfo, hospitalList } = this.state;
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

    this.setState({
      isChkItemShow: true,
      gubun,
    });
  };

  onCancelChkItem = () => {
    this.setState({ isChkItemShow: false });
  };

  // 추가검진항목 팝업에서 선택버튼 클릭시
  onOkChkItem = (chkType, selectedItems, vals) => {
    this.setState(prevState => {
      const { reservationInfo, familyInfo, gubun } = prevState;
      if (gubun === 1) {
        reservationInfo.CHK_ITEMS = selectedItems.map(item => item.ITEM_NAME).join(', ');
        reservationInfo.CHK_TYPE = chkType.CHK_TYPE;
        reservationInfo.CHK_TYPE_NAME = chkType.CHK_TYPE_NAME;
        reservationInfo.CHK_ITEMS_CODE = vals;
      } else {
        familyInfo.CHK_ITEMS = selectedItems.map(item => item.ITEM_NAME).join(', ');
        familyInfo.CHK_TYPE = chkType.CHK_TYPE;
        familyInfo.CHK_TYPE_NAME = chkType.CHK_TYPE_NAME;
        familyInfo.CHK_ITEMS_CODE = vals;
      }
      return {
        reservationInfo,
        familyInfo,
        isChkItemShow: false,
      }
    });
  }

  // 검진기관 변경시 추가검진항목 초기화
  onChangeHospital = (val, gubun) => {
    this.setState(prevState => {
      const { reservationInfo, familyInfo, hospitalList } = prevState;
      if (gubun === 1) {
        reservationInfo.HOSPITAL_CODE = val;
        reservationInfo['HOSPITAL_NAME'] = hospitalList.filter(item => item.HOSPITAL_CODE === val)[0].HOSPITAL_NAME;
        reservationInfo['CHK_ITEMS'] = '';
        reservationInfo['CHK_ITEMS_CODE'] = [];
        reservationInfo['CHK_TYPE'] = '';
        reservationInfo['CHK_TYPE_NAME'] = '';
        reservationInfo['APP_DT'] = '';
      } else {
        familyInfo.HOSPITAL_CODE = val;
        familyInfo['HOSPITAL_NAME'] = hospitalList.filter(item => item.HOSPITAL_CODE === val)[0].HOSPITAL_NAME;
        familyInfo['CHK_ITEMS'] = '';
        familyInfo['CHK_ITEMS_CODE'] = [];
        familyInfo['CHK_TYPE'] = '';
        familyInfo['CHK_TYPE_NAME'] = '';
        familyInfo['APP_DT'] = '';
      }
      return {
        reservationInfo,
        familyInfo,
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

  // 예약정보 state변경
  onChangeReservationInfo = (key, val, gubun) => {
    this.setState(prevState => {
      const { reservationInfo, familyInfo, isFamily } = prevState;
      if (key === 'RCV_ADDR') {
        reservationInfo[key] = val;
        if (isFamily) {
          familyInfo[key] = val;
        }
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

  // 배우자검진 추가
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
            const { reservationInfo } = prevState;
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
                CHK_ITEMS: '',
                CHK_ITEMS_CODE: [],
              },
              isDelFamilyInfo: false,
            }
          });
        }
      }
    });
  };

  // 배우자 검진 삭제(화면에서만 삭제) - 저장시 DB에서 삭제
  removeFamilyReservation = () => {
    this.setState({ familyInfo: {}, isDelFamilyInfo: true });
  }

  // 저장
  onSave = () => {
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
    const { reservationInfo, familyInfo, isDelFamilyInfo } = this.state;

    // validation check 필요
    // 검진기관, 검진예약일, 검진항목, 수령지, 전화번호

    Modal.confirm({
      title: '저장하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      okText: '저장',
      cancelText: '취소',
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
          if (res) {
            if (res.result === 1) {
              message.success(<MessageContent>저장하였습니다.</MessageContent>);
            } else if (res.result === -9) {
              message.info(<MessageContent>현재 예약기간이 아닙니다.</MessageContent>);
            }
          } else {
            message.error(<MessageContent>저장에 실패하였습니다.</MessageContent>);
          }
          spinningOff();
        });
      }
    });
  };

  onUserSearchAfter = row => {
    if (row) {
      this.setState({
        SCH_USER_ID: row.USER_ID,
        EMP_NO: row.EMP_NO,
      });
    }
  };

  onSearchUserHealthChkReservation = () => {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'reservation',
        url: `/api/eshs/v1/common/health/healthChkReservation?CHK_YEAR=${this.state.CHK_YEAR}&SCH_USER_ID=${this.state.SCH_USER_ID}`,
        type: 'GET',
      },
      {
        key: 'userDetail',
        url: `/api/common/v1/account/userDetail/${this.state.SCH_USER_ID}`,
        type: 'GET',
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, this.initState);
  };

  render() {
    const { hospitalList, userInfo, reservationInfo, familyInfo, quotaList, gubun } = this.state;

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
            reservationInfo={gubun === 1 ? reservationInfo : familyInfo}
            userInfo={userInfo}
          />
        </AntdModal>
        <StyledContentsWrapper>
          {this.props.isManager && (
            <StyledCustomSearchWrapper>
              <div className="search-input-area">
                <UserSearchModal colData={this.state.EMP_NO} onClickRow={this.onUserSearchAfter} />
                <StyledButton className="btn-gray btn-sm" onClick={this.onSearchUserHealthChkReservation}>검색</StyledButton>
              </div>
            </StyledCustomSearchWrapper>
          )}
          <StyledHtmlTable>
          {this.state.isRcv ? (
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
                      value={reservationInfo.RCV_PHONE || userInfo.MOBILE_TEL_NO} className="ant-input-sm"
                      onChange={e => this.onChangeReservationInfo('RCV_PHONE', e.target.value, 1)}
                    />
                  </td>
                  <th>검진종류</th>
                  <td>{reservationInfo.CHK_TYPE_CD_NAME}</td>
                  <th>검진차수</th>
                  <td>{reservationInfo && reservationInfo.CHK_SEQ ? `${reservationInfo.CHK_SEQ}차` : ''}</td>
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
                  <th>추가검진항목</th>
                  <td colSpan={7}>
                    <AntdInput
                      value={reservationInfo.CHK_ITEMS} className="ant-input-sm" style={{ width: '100%', cursor: 'pointer' }} readOnly
                      onClick={() => this.onClickChkItem(1)}
                    />
                  </td>
                </tr>
                {this.state.isFamily && Object.keys(familyInfo).length > 0 && (
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
                      <th>추가검진항목</th>
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
                      value={reservationInfo.RCV_ADDR || userInfo.ADDRESS} className="ant-input-sm" style={{ width: '100%' }}
                      onChange={e => this.onChangeReservationInfo('RCV_ADDR', e.target.value, 1)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table>
              <colgroup>
                <col width="20%" />
                <col width="80%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>사번</th>
                  <td>{userInfo.EMP_NO}</td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>{userInfo.NAME_KOR}</td>
                </tr>
                <tr className="tr-center">
                  <td colSpan={2}>- 해당 검진사항이 없습니다. -</td>
                </tr>
              </tbody>
            </table>
          )}
          </StyledHtmlTable>
          {this.state.isRcv && (
            <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
              {userInfo && userInfo.FAM_NAME && (
                familyInfo && Object.keys(familyInfo).length > 0 ? (
                  <StyledButton className="btn-light btn-sm mr5" onClick={this.removeFamilyReservation}>배우자 검진 삭제</StyledButton>
                ) : (
                  <StyledButton className="btn-light btn-sm mr5" onClick={this.addFamilyReservation}>배우자 검진 추가</StyledButton>
                )
              )}
              <StyledButton className="btn-primary btn-sm" onClick={this.onSave}>저장</StyledButton>
            </StyledButtonWrapper>
          )}
        </StyledContentsWrapper>
      </>
    );
  }
}

export default Reservation;
