import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as loadingConstants from 'containers/common/Loading/constants';

import * as constants from './constants';

export function* loadingReservationDetail(payload) { 
  const data = yield call(Axios.post, '/apps/api/v1/bookroom/loadingReservationDetail', { mrReqNo: payload.mrReqNo });

  /*
    서버에서 받아온 data.locationData를 이용해
    모달에 보여줄 location 문자열 생성
    층과 요일의 경우 차후 다국어 처리가 필요하여 saga에서 location을 만든다
  */
  const {
    locationData,
    reservationData,
  } = data;
  const location = `${locationData.compNm} / ${locationData.bldngNm} / ${locationData.florLoc}층 / ${locationData.mrNm}`;

  reservationData.location = location;

  const rsvrFrDd = `${reservationData.rsvrFrDd.substring(0, 4)}-${reservationData.rsvrFrDd.substring(4, 6)}-${reservationData.rsvrFrDd.substring(6, 8)}`;
  const rsvrToDd = `${reservationData.rsvrToDd.substring(0, 4)}-${reservationData.rsvrToDd.substring(4, 6)}-${reservationData.rsvrToDd.substring(6, 8)}`;
  
  reservationData.rsvrFrDd = rsvrFrDd;
  reservationData.rsvrToDd = rsvrToDd;

  const dayArray = ["일", "월", "화", "수", "목", "금", "토"];
  reservationData.day = dayArray[new Date(rsvrFrDd).getDay()];

  yield put({
    type: constants.LOADING_RESERVATION_DETAIL,
    reservationData,
  });
}

export function* saveCancelBook(payload) {
  const {
    loadingBookedRoomParam,
    mrReqNo,
  } = payload;

  yield put({
    type: loadingConstants.LOADING_ON,
  });

  let data = yield call(Axios.post, '/apps/api/v1/bookroom/saveCancelBook', { mrReqNo });
  
  let result = JSON.parse(data.result);
  result = result.dataSet.message.result;
  
  if (result === "OK") {
    yield [put({
      type: constants.LOADING_BOOKED_ROOMS_SAGA,
      payload : loadingBookedRoomParam,
    }),
    put({
      type: loadingConstants.LOADING_OFF,
    })]
  }
}

export default function* reservationDetailSaga() {
  yield takeLatest(constants.LOADING_RESERVATION_DETAIL_SAGA, loadingReservationDetail);
  yield takeLatest(constants.SAVE_CANCEL_BOOK_SAGA, saveCancelBook);
}
