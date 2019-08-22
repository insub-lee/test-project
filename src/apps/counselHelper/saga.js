import { Axios } from 'utils/AxiosFunc';
import { takeEvery, call, put, takeLatest } from 'redux-saga/effects';
import * as action from './constants';

function* getDetail(PRNT_ID) {
  const BIZ_ID = PRNT_ID.detail;
  const response = yield call(Axios.post, `/api/bizgroup/v1/widget/ADetailHandler`, { BIZ_ID });
  const { detail } = response;
  yield put({ type: action.SAVE_DETAIL, detail });
}

export default function* watcher() {
  yield takeLatest(action.GET_DETAIL, getDetail);
}
