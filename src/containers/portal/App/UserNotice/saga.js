import { call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../../../utils/AxiosFunc';
import { LOAD_ALARM, SET_ALARM, READ_ALARM_SAGA, ALL_READ_SAGA, READ_ALARM_SUCCESS, READ_ALL_ALARM_SUCCESS, DELETE_ALARM_SAGA, DELETE_ALARM_SUCCESS, DELETE_ALL_ALARM_SUCCESS, DELETE_ALL_ALARM_SAGA, RESET_ALARM, RECEIVE_ALARM, ALARM_OFF, SET_NOTIFY } from './constants';

export function* loadAlarm(payload) {
  const data = {
    PARAM: {
      PAGENUM: payload.pageNum !== undefined ? payload.pageNum : 10,
    },
  };

  const response = yield call(Axios.post, '/api/common/v1/account/loadAlarm/', data);
  const resultValue = response;

  if (resultValue.list) {
    yield put({ type: SET_ALARM, resultValue });
  }
}

export function* deleteSuccess() {
  yield put({ type: RESET_ALARM });
}

export function* readAlarm(payload) {
  const data = {
    PARAM: {
      MSGID: payload.id,
    },
  };
  const response = yield call(Axios.post, '/api/common/v1/account/readAlarm/', data);

  if (response.result === 'success') {
    yield put({ type: READ_ALARM_SUCCESS });
  }
}

export function* allReadAlarm() {
  const response = yield call(Axios.post, '/api/common/v1/account/allReadAlarm/');

  if (response.result === 'success') {
    yield put({ type: READ_ALL_ALARM_SUCCESS });
  }
}

export function* deleteAlarm(payload) {
  const data = {
    PARAM: {
      MSGID: payload.id,
    },
  };
  const response = yield call(Axios.post, '/api/common/v1/account/deleteAlarm/', data);

  if (response.result === 'success') {
    yield put({ type: DELETE_ALARM_SUCCESS });
  }
}

export function* deleteAllAlarm(payload) {
  const data = {
    PARAM: {
      MSGID: payload.id,
    },
  };
  const response = yield call(Axios.post, '/api/common/v1/account/allDeleteAlarm/', data);

  if (response.result === 'success') {
    yield put({ type: DELETE_ALL_ALARM_SUCCESS });
  }
}

export function* receiveAlarm(payload) {
  yield put({ type: RECEIVE_ALARM, payload });
}

export function* alarmOff() {
  const response = yield call(Axios.post, '/api/common/v1/notifyisoff');
  const noti = response.result;

  yield put({ type: SET_NOTIFY, noti });
}

export default function* contactsSaga() {
  yield takeLatest(LOAD_ALARM, loadAlarm);
  yield takeLatest('notify/COMMON_NOTIFY_RESET', loadAlarm);
  yield takeLatest(READ_ALARM_SAGA, readAlarm);
  yield takeLatest(READ_ALARM_SUCCESS, loadAlarm);
  yield takeLatest(ALL_READ_SAGA, allReadAlarm);
  yield takeLatest(READ_ALL_ALARM_SUCCESS, loadAlarm);
  yield takeLatest(DELETE_ALARM_SAGA, deleteAlarm);
  yield takeLatest(DELETE_ALARM_SUCCESS, loadAlarm);
  yield takeLatest(DELETE_ALL_ALARM_SAGA, deleteAllAlarm);
  yield takeLatest(DELETE_ALL_ALARM_SUCCESS, deleteSuccess);
  yield takeLatest('notify/COMMON_NOTIFY', receiveAlarm);
  yield takeLatest(ALARM_OFF, alarmOff);
}
