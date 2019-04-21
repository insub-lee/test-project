import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import { fromJS } from 'immutable';
import * as loadingConstants from 'containers/common/Loading/constants';

import * as constants from './constants';

export function* saveBookroom(payload) {
  const {
    dataSet,
    loadingBookedRoomParam,
  } = payload.param;

  yield put({
    type: loadingConstants.LOADING_ON,
  });

  let data = yield call(Axios.post, '/apps/api/v1/bookroom/saveBookRoom', {
    "payload": {
      dataSet,
    }
  });
  const result = JSON.parse(data.result);
  const resultDataSet = result.dataSet;
  const { message, fields } = resultDataSet;

  if (message.result === 'OK' && !fields.E_RETVAL) {
    yield put({
      type: constants.LOADING_BOOKED_ROOMS_SAGA,
      payload : loadingBookedRoomParam,
    });

    yield put({
      type: constants.SET_RESMODALTYPE,
      resModalType: 'success',
    });
  } else if (message.result === 'OK' && fields.E_RETVAL === 'E') {
    // 이미 신청
    yield [put({
      type: constants.SET_RESMODALTYPE,
      resModalType: 'fail',
      resModalMsg: fields.E_RETMSG,
    }),
    yield put({
      type: loadingConstants.LOADING_OFF,
    })];
  } else if (message.result === 'FAIL') {
    // 특수
    // message.messageName을 찍어줌
    yield [put({
      type: constants.SET_RESMODALTYPE,
      resModalType: 'fail',
      resModalMsg: message.messageName,
    }),
    yield put({
      type: loadingConstants.LOADING_OFF,
    })];
    return;
  }
}

export function* getLocationAndNoti(payload) {
  const {
    MR_REG_NO,
  } = payload;

  const response = yield call(Axios.post, '/apps/api/v1/bookroom/getLocationAndNoti', { MR_REG_NO });

  yield put({
    type: constants.GET_LOCATION_AND_NOTI,
    locationAndNoti: fromJS({
      location: response.locationAndNoti.LOCATION,
      rrNotiYn: response.locationAndNoti.RR_NOTI_YN,
      rrNotiDesc: response.locationAndNoti.RR_NOTI_DESC,
      mrGbn: response.locationAndNoti.MR_GBN,
      mrNm: response.locationAndNoti.MR_NM,
      bldngNm: response.locationAndNoti.BLDNG_NM,
    }),
  });
}

export default function* reservationModalSaga() {
  yield takeLatest(constants.SAVE_BOOKROOM_SAGA, saveBookroom);
  yield takeLatest(constants.GET_LOCATION_AND_NOTI_SAGA, getLocationAndNoti);
}
