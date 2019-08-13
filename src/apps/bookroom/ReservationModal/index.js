import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Modal } from 'antd';
import * as actionsLoading from 'containers/common/Loading/actions';

import * as actions from './actions';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';

import Content from './Content';

class ReservationModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      startTimeTop: null,
      startTimeBottom: null,
      endTimeTop: null,
      endTimeBottom: null,

      // 회의명
      meetTitle: null,
      // 회의 내용
      meetContent: '',

      /*
        회의 종료 시간
        연장이 가능하기 때문에 UI의 변경이 필요하여 state로 선언
      */
      rsvrToHh: null,
      rsvrToMi: null,

      // 최대 예약가능시각 ex) 오전 10시
      limitTimeBottom: null,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      rsvrFrHh,
      rsvrFrMi,
      rsvrToHh,
      rsvrToMi,
    } = this.props.reservationData;

    // 모달 on
    if (this.props.isShow && !prevProps.isShow) {
        this.setTimeString();
        if (Object.keys(this.props.locationAndNoti).length === 0
          || this.props.reservationData.mrRegNo !== prevProps.reservationData.mrRegNo) {
          this.props.handleGetLocationAndNoti(this.props.reservationData.mrRegNo);
        }
    }

    if (rsvrFrHh !== prevProps.reservationData.rsvrFrHh
      || rsvrFrMi !== prevProps.reservationData.rsvrFrMi
      || rsvrToHh !== prevProps.reservationData.rsvrToHh
      || rsvrToMi !== prevProps.reservationData.rsvrToMi) {
        this.setTimeString();
      }
  }

  getTimeString = (rsvrHh, rsvrMi) => {
    let result = '';
    if (rsvrHh > 12) {
      result = `오후 ${(rsvrHh - 12).toString().length === 1 ? 0 : ''}${rsvrHh - 12}:${rsvrMi}`;
    } else {
      result = `오전 ${(rsvrHh).toString().length === 1 ? 0 : ''}${rsvrHh}:${rsvrMi}`;
    }
    return result;
  }

  getDateTimeString = (rsvrDd, day) => `${rsvrDd}(${day})`;

  getMiToTime = (minute) => {
    const h = Math.floor(minute / 60) === 0 ? '' : `${Math.floor(minute / 60)}시간 `;
    const m = minute % 60 === 0 ? '' : `${minute % 60}분`;
    return `${h}${m}`;
  }

  // 회의 소요 시간 문자열 생성 함수
  getTime = (rsvrToHh = this.state.rsvrToHh, rsvrToMi = this.state.rsvrToMi) => {
    // 소요시간을 분으로 환산
    const em = (((rsvrToHh * 1) + (rsvrToMi / 60)) - ((this.props.reservationData.rsvrFrHh * 1) + (this.props.reservationData.rsvrFrMi / 60))) * 60;

    if (this.state.constLimitCount === 0 && this.state.startTimeBottom !== '오후 08:00') {
      return this.getMiToTime(em);
    }
    return this.getMiToTime(em);
  }

  convertRsvrMi = (rsvrHh, rsvrMi) => (rsvrHh * 60) + Number(rsvrMi);

  // 회의실 예약 버튼 클릭 이벤트
  saveBookroom = () => {
    const {
      searchData,
      handleSaveBookroom,
      locationAndNoti,
      profile,
    } = this.props;

    const {
      rsvrFrDd,
      rsvrFrHh,
      rsvrFrMi,
      rsvrToDd,
    } = this.props.reservationData;

    const dataSet = {
      "fields": {
        "RSVR_FR_DD": rsvrFrDd.replace(/-/g, ''),
        "RSVR_TO_DD": rsvrToDd.replace(/-/g, ''),
        "BLDNG_NM": locationAndNoti.bldngNm,
        "CHK_DAY": [],
				"RSVR_FR_HH": rsvrFrHh,
				"RSVR_FR_MI": rsvrFrMi,
				"RSVR_TO_HH": this.state.rsvrToHh,
				"RSVR_TO_MI": this.state.rsvrToMi,
				"SYNC_SCHEDULE": "Y",
				"COMP_ID": searchData.searchFloor[0].COMP_ID,
				"BLDNG_ID": searchData.searchFloor[0].BLDNG_ID,
				"FLOR_LOC": searchData.searchFloor[0].FLOR_LOC,
				"MR_GBN": locationAndNoti.mrGbn,
				"MY_EMAIL": profile.EMAIL,
				"MR_NM": locationAndNoti.mrNm,
				"MEET_TITLE": this.state.meetTitle,
				"MEET_FILE_NM":"",
				"MEET_FILE_ID":"",
				"AGENDA": this.state.meetContent,
				"RSVR_ID": profile.EMP_NO,
				"EMP_INFO": profile.NAME_KOR,
				"COMPANY_CD": profile.COMP_CD,
      },
      "recordSets": {
        "gridList": {
          "nc_list": [],
        }
      },
    };

    const param = {
      dataSet,
      loadingBookedRoomParam: searchData,
    };

    this.props.setIsShow();
    handleSaveBookroom(param);
    /*
      여기서 isShow = false로 모달을 닫으면,
      TimeTable에서 ReservationModal 자체가 rendering이 되지 않아서
      saveBookroom 후에 곧바로 불리는 loadingBookedRooms가 호출되기 전에
      ReservationModal componentWillUnmount가 불려 호출이 멈춤..
    */
    // this.props.setIsShow();
  }

  /*
    회의실 종료 시간 연장 시 UI를 변경해주기 위해
    this.state.endTimeBottom(오전 00:00)을 변경해주는 함수
  */
  setEndTimeBottom = (rsvrToHh, rsvrToMi) => {
    let rsvrToHhTemp = rsvrToHh > 12 ? rsvrToHh - 12 : rsvrToHh;
    if (rsvrToHhTemp.toString().length === 1) rsvrToHhTemp = `0${rsvrToHhTemp}`;
    return `${rsvrToHh > 12 ? '오후' : '오전'} ${rsvrToHhTemp}:${rsvrToMi}`;
  }

  // 회의실 연장 +, - 버튼 클릭 이벤트
  setLimitCount = (target) => {
    const {
      rsvrToHh,
      rsvrToMi,
    } = this.state;

    let rsvrToMiTemp = null;
    let rsvrToHhTemp = this.state.rsvrToHh;
    let h = null;
    const getZeroString = m => m === 0 ? '00' : (Math.abs(m)).toString();

    switch (target.children[0].getAttribute('value')) {
      case 'S':
        rsvrToMiTemp = getZeroString((Number(rsvrToMi) - 30) % 60);

        h = (Number(rsvrToMi) - 30) / 60;
          rsvrToMiTemp = getZeroString((Number(rsvrToMi) - 30) % 60);
    
        if (h < 0) {
          rsvrToHhTemp = Number(rsvrToHh - 1).toString();
        }

        this.setTimeString(rsvrToHhTemp, rsvrToMiTemp);
        break;
      default:
        rsvrToMiTemp = getZeroString((Number(rsvrToMi) + 30) % 60);
        h = (Number(rsvrToMi) + 30) / 60;

        if (h >= 1) {
          rsvrToHhTemp = (Number(Number(rsvrToHh) + 1).toString());
        }

        this.setTimeString(rsvrToHhTemp, rsvrToMiTemp);
    }
  }

  // 회의실 내용 입력 이벤트
  setMeetContent = (value) => {
    this.setState({
      meetContent: value,
    });
  }

  // 회의실 제목 입력 이벤트
  setMeetTitle = (value) => {
    this.setState({
      meetTitle: value,
    });
  }

  /* 
    예약 후 띄워줄 모달을 종료할 때,
    resModalType을 nothing으로 바꿔준 후 모달을 종료
  */
  setResModalType = () => {
    this.props.handleSetResModalType('nothing');
  }

  // 회의실 시작 시간 및 종료 시간 문구 생성 함수
  setTimeString = (rh = this.props.reservationData.rsvrToHh, rm = this.props.reservationData.rsvrToMi) => {
    const {
      reservationData,
    } = this.props;

    const startTimeTop = this.getDateTimeString(reservationData.rsvrFrDd, reservationData.day);
    const frTimeString = this.getTimeString(reservationData.rsvrFrHh, reservationData.rsvrFrMi);
    const toTimeString = this.getTimeString(rh, rm);
    const limitTimeBottom = this.getTimeString(reservationData.limitTime.substring(11, 13), reservationData.limitTime.substring(14));

    const em = (((rh * 1) + (rm / 60)) - ((reservationData.rsvrFrHh * 1) + (reservationData.rsvrFrMi / 60))) * 60;

    const isMinusBtnShow = this.convertRsvrMi(rh, rm) - this.convertRsvrMi(reservationData.rsvrFrHh, reservationData.rsvrFrMi) !== 30;
    const isPlusBtnShow = toTimeString !== limitTimeBottom;

    this.setState({
      startTimeTop,
      frTimeString,
      toTimeString,
      limitTimeBottom,
      meetTitle: `${this.props.userName.NAME_KOR} 님의 예약`,
      meetContent: '',
      em,
      rsvrToHh: rh,
      rsvrToMi: rm,
      isMinusBtnShow,
      isPlusBtnShow,
    });
  }

  render() {
    const {
      reservationData,
    } = this.props;
    return (
      <div>
        <Modal
          wrapClassName="br-now"
          title="회의실 예약"
          centered
          visible={this.props.isShow}
          onOk={this.props.setIsShow}
          onCancel={this.props.setIsShow}
          footer={[
            <Button className="btn-cancel" key="back" onClick={this.props.setIsShow}>닫기</Button>,
            <Button className="btn-confirm" key="submit" type="primary" onClick={this.saveBookroom}>
              예약
            </Button>,
          ]}
        >
        {
            <Content
              startTimeTop={this.state.startTimeTop}
              frTimeString={this.state.frTimeString}
              toTimeString={this.state.toTimeString}
              limitTimeBottom={this.state.limitTimeBottom}
              location={this.props.locationAndNoti.location}
              meetTitle={this.state.meetTitle}
              meetContent={this.state.meetContent}
              setMeetTitle={this.setMeetTitle}
              setMeetContent={this.setMeetContent}
              setLimitCount={this.setLimitCount}
              constLimitCount={this.state.constLimitCount}
              limitCount={this.state.limitCount}
              rrNotiYn={this.props.locationAndNoti.rrNotiYn}
              rrNotiDesc={this.props.locationAndNoti.rrNotiDesc}
              em={this.getMiToTime(this.state.em)}
              isMinusBtnShow={this.state.isMinusBtnShow}
              isPlusBtnShow={this.state.isPlusBtnShow}
            />
        }
        </Modal>
        <Modal
          wrapClassName="br-now rsv-result"
          // title="예약 완료"
          centered
          visible={this.props.resModalType === 'success'}
          onOk={this.setResModalType}
          onCancel={this.setResModalType}
        >
          <section className="rsv-form">
            <div className="massage success">
              <h4>회의실 예약이 완료되었습니다.</h4>
            </div>
            <ul className="rsv-info">
              <li className="date">{this.state.startTimeTop}</li>
              <li className="time">{`${this.state.frTimeString} ~ ${this.state.toTimeString}`}</li>
              <li className="location">
                <dl>
                  { this.props.locationAndNoti.location }
                </dl>
              </li>
            </ul>
          </section>
        </Modal>
        <Modal
            wrapClassName="br-now rsv-result"
            // title="예약 실패"
            centered
            visible={this.props.resModalType === 'fail'}
            onOk={this.setResModalType}
            onCancel={this.setResModalType}
          >
            <section className="rsv-form">
              <div className="massage fail">
                <h4>{this.props.resModalMsg}</h4>
                <p>예약 가능한 회의실과 시간을 다시 확인해주세요.</p>
              </div>
              <ul className="rsv-info">
                <li className="date">{this.state.startTimeTop}</li>
                <li className="time">{`${this.state.frTimeString} ~ ${this.state.toTimeString}`}</li>
                <li className="location">
                  <dl>
                    { this.props.locationAndNoti.location }
                  </dl>
                </li>
              </ul>
            </section>
          </Modal>
      </div>
    );
  }
}

ReservationModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired,
  handleSaveBookroom: PropTypes.func.isRequired,
  reservationData: PropTypes.shape({
    mrRegNo: PropTypes.string,
    rsvrFrDd: PropTypes.string.isRequired,
    rsvrFrHh: PropTypes.string.isRequired,
    rsvrFrMi: PropTypes.string.isRequired,
    rsvrToDd: PropTypes.string.isRequired,
    rsvrToHh: PropTypes.string.isRequired,
    rsvrToMi: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    limitTime: PropTypes.string.isRequired,
  }).isRequired,
  searchData: PropTypes.shape({
    searchDate: PropTypes.string,
    searchFrTime: PropTypes.string,
    searchToTime: PropTypes.string,
    searchTerm: PropTypes.number,
    searchLoc: PropTypes.array,
    searchCompCd: PropTypes.string,
    searchBldgCd: PropTypes.string,
    searchFloor: PropTypes.array,
    searchTab: PropTypes.string,
    searchAllFloor: PropTypes.string,
  }),
  userName: PropTypes.object.isRequired,
  resModalType: PropTypes.string.isRequired,
  resModalMsg: PropTypes.string,
  handleSetResModalType: PropTypes.func.isRequired,
  handleGetLocationAndNoti: PropTypes.func.isRequired,
  locationAndNoti: PropTypes.object,
  view: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  loadingOn: PropTypes.func.isRequired,
};

ReservationModal.defaultProps = {
  reservationData: {
    mrRegNo: "ICTSC1-1",
    rsvrFrDd: "2019-03-04",
    rsvrFrHh: "11",
    rsvrFrMi: "00",
    rsvrToDd: "2019-03-04",
    rsvrToHh: "12",
    rsvrToMi: "00",
    day: "월",
    limitTime: "2019-02-28 21:00",
  },
};

const mapStateToProps = createStructuredSelector({
  resModalType: selectors.makeSelectResModalType(),
  resModalMsg: selectors.makeSelectResModalMsg(),
  locationAndNoti: selectors.makeSelectLocationAndNoti(),
  userName: selectors.makeSelectUserName(),
  profile: selectors.makeSelectProfile(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSaveBookroom: param => dispatch(actions.saveBookroom(param)),
    handleSetResModalType: resModalType => dispatch(actions.setResModalType(resModalType)),
    handleGetLocationAndNoti: MR_REG_NO => dispatch(actions.getLocationAndNoti(MR_REG_NO)),
    loadingOn: () => dispatch(actionsLoading.loadingOn()),
  };
}

const withReducer = injectReducer({ key: 'reservationModal', reducer });
const withSaga = injectSaga({ key: 'reservationModal', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReservationModal);
