import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  /*
    회의실 예약 후 응답 모달의 타입
    nothing: 예약 요청 전, success: 예약 성공, fail: 예약 실패
  */
  resModalType: 'nothing',
  resModalMsg: null,
  locationAndNoti: {},
});

const reservationModalReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.SET_RESMODALTYPE: {
      return state.set('resModalType', action.resModalType).set('resModalMsg', action.resModalMsg);
    }
    case constants.GET_LOCATION_AND_NOTI: {
      return state.set('locationAndNoti', action.locationAndNoti);
    }
    default:
      return state;
  }
};

export default reservationModalReducer;
