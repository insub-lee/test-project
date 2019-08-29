import { Axios } from 'utils/AxiosFunc';
import { takeEvery, call, put, takeLatest } from 'redux-saga/effects';
import * as action from './constants';

function* getDetail(payload) {
  const BIZ_ID = payload.detail;
  const { WIDGET_ID } = payload;
  const response = yield call(Axios.post, `/api/bizstore/v1/bizgroup/ADetailHandler`, { BIZ_ID });
  const { detail } = response;

  yield put({ type: action.SAVE_DETAIL, detail, WIDGET_ID });
}

export default function* watcher() {
  yield takeEvery(action.GET_DETAIL, getDetail);
}
