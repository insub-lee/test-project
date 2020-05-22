import { put, takeLatest, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as actionTypes from './constants';

export function* getDaemonLogList(payload) {
  const param = payload.payload;
  const response = yield call(Axios.get, `/api/migration/v1/common/getMigrationDaemonLogList?${new URLSearchParams(param).toString()}`, {});

  const { daemonLogList } = response;
  yield put({ type: actionTypes.SET_DAEMONLOG_LIST, payload: daemonLogList || [] });
}

export default function* DaemonListSaga() {
  yield takeLatest(actionTypes.GET_DAEMONLOG_LIST, getDaemonLogList);
}
