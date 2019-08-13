import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Modal } from 'antd';

import * as actions from './actions';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';

class ReservationDetailModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      startTimeTop: '',
      startTimeBottom: '',
      endTimeTop: '',
      endTimeBottom: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isShow && !prevProps.isShow) {
      this.props.loadingReservationDetail(this.props.mrReqNo);
    }
    if (this.props.reservationData !== prevProps.reservationData) {
      this.setTimeString();
    }
  }

  // 통화 클릭 이벤트
  onClickCall = () => location.href = `tel://${this.props.reservationData.telNo}`;

  // 예약 취소 버튼 클릭 이벤트
  handleSaveCancelBookRoom = () => {
    const {
      handleSaveCancelBookRoom,
      mrReqNo,
      searchData,
    } = this.props;

    handleSaveCancelBookRoom(searchData, mrReqNo);
    this.props.setIsShow();
  }

  // 회의실 예약 버튼 클릭 이벤트
  saveBookroom = () => {
    const {
      reservationData,
      searchData,
      handleSaveBookroom,
    } = this.props;

    const saveBookRoomParam = {
      fromDate: reservationData.rsvrFrDd,
      fromHour: reservationData.rsvrFrHh,
      fromMinute: reservationData.rsvrFrMi,
      toDate: reservationData.rsvrToDd,
      toHour: this.state.rsvrToHh,
      toMinute: this.state.rsvrToMi,
      roomCd: reservationData.mrRegNo,
      meetTitle: this.state.meetTitle,
      meetContent: this.state.meetContent,
    };

    const param = {
      saveBookRoomParam,
      loadingBookedRoomParam: searchData,
    };

    handleSaveBookroom(param);
    this.props.setIsShow();
  }

  // 회의실 시작 시간 및 종료 시간 문구 생성 함수
  setTimeString = () => {
    const {
      reservationData,
    } = this.props;

    /*
      회의 시작 시간과 회의 종료 시간 문자열 만들기
      (모달 내에서 시간, 장소 변경하지 않는다고 가정..)
    */
    const startTimeTop = `${reservationData.rsvrFrDd}(${reservationData.day})`;
    
    let rsvrFrHhTemp = reservationData.rsvrFrHh > 12 ? reservationData.rsvrFrHh - 12 : reservationData.rsvrFrHh;
    if (rsvrFrHhTemp.toString().length === 1) rsvrFrHhTemp = `0${rsvrFrHhTemp}`;
    const startTimeBottom = `${reservationData.rsvrFrHh > 12 ? '오후' : '오전'} ${rsvrFrHhTemp}:${reservationData.rsvrFrMi}`;

    const endTimeTop = `${reservationData.rsvrToDd}(${reservationData.day})`;

    let rsvrToHhTemp = reservationData.rsvrToHh > 12 ? reservationData.rsvrToHh - 12 : reservationData.rsvrToHh;
    if (rsvrToHhTemp.toString().length === 1) rsvrToHhTemp = `0${rsvrToHhTemp}`;
    const endTimeBottom = `${reservationData.rsvrToHh > 12 ? '오후' : '오전'} ${rsvrToHhTemp}:${reservationData.rsvrToMi}`;

    this.setState({
      startTimeTop,
      startTimeBottom,
      endTimeTop,
      endTimeBottom,
    });
  }

  render() {
    const {
      reservationData
    } = this.props;
    return (
      <Modal
        wrapClassName="br-now"
        title="예약정보"
        centered
        visible={this.props.isShow}
        onOk={this.props.setIsShow}
        onCancel={this.props.setIsShow}
        footer={
          reservationData.myRsvrYn === 'N' ?
          [<Button className="btn-cancel" key="back" onClick={this.props.setIsShow}>닫기</Button>]
          :
          [
            <Button className="btn-cancel" key="back" onClick={this.props.setIsShow}>닫기</Button>,
            <Button className="btn-confirm" key="submit" type="primary" onClick={this.handleSaveCancelBookRoom}>
              예약취소
            </Button>,
          ]
        }
      >
        <section className="rsv-form">
          <ul className="rsv-info">
            <li className="person">{reservationData.rsvrUserName}
              <Button className="btn-call" onClick={this.onClickCall}>전화걸기</Button>
              <h3>{reservationData.meetTitle}</h3>
              <p className="meet-content">{reservationData.meetContent}</p>
            </li>
            <li className="date">{this.state.startTimeTop}</li>
            <li className="time">{`${this.state.startTimeBottom} ~ ${this.state.endTimeBottom}`}</li>
            <li className="location">
              <dl>
                { reservationData.location }
              </dl>
            </li>
          </ul>
          {
            reservationData.rrNotiYn === 'Y'
              ?
                <div className="use-guide">
                  <h4>회의실 이용안내</h4>
                  <p>{reservationData.rrNotiDesc}</p>
                </div>
              :
                ''
          }
        </section>
      </Modal>
    );
  }
}

ReservationDetailModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired,
  reservationData: PropTypes.shape({
    mrRegNo: PropTypes.string,
    rsvrFrDd: PropTypes.string,
    rsvrFrHh: PropTypes.string,
    rsvrFrMi: PropTypes.string,
    rsvrToDd: PropTypes.string,
    rsvrToHh: PropTypes.string,
    rsvrToMi: PropTypes.string,
    location: PropTypes.string,
    day: PropTypes.string,
    meetTitle: PropTypes.string,
    meetContent: PropTypes.string,
    myRsvrYn: PropTypes.string,
    rsvrUserName: PropTypes.string,
    rrNotiYn: PropTypes.string,
    rrNotiDesc: PropTypes.string,
    telNo: PropTypes.string,
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
  loadingReservationDetail: PropTypes.func.isRequired,
  mrReqNo: PropTypes.string.isRequired,
  handleSaveCancelBookRoom: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
};

ReservationDetailModal.defaultProps = {
  reservationData: {
    mrRegNo: "ICTSC1-1",
    rsvrFrDd: "2019-02-19",
    rsvrFrHh: "19",
    rsvrFrMi: "00",
    rsvrToDd: "2019-02-19",
    rsvrToHh: "20",
    rsvrToMi: "00",
    location: "이천 / 연구개발센터 / 2층 / 회의실 208",
    day: "화",
  },
  mrReqNo: "CRR-190221-0009",
};

const mapStateToProps = createStructuredSelector({
  reservationData: selectors.makeSelectReservationData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadingReservationDetail: mrReqNo =>
      dispatch(actions.loadingReservationDetail(mrReqNo)),
    handleSaveCancelBookRoom: (loadingBookedRoomParam, mrReqNo) =>
      dispatch(actions.saveCancelBook(loadingBookedRoomParam, mrReqNo)),
  };
}

const withReducer = injectReducer({ key: 'reservationDetailModal', reducer });
const withSaga = injectSaga({ key: 'reservationDetailModal', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReservationDetailModal);
