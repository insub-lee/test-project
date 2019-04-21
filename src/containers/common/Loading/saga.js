import { takeLatest, put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as constants from './constants';

export function* loadingOn() {
  yield put({
    type: constants.SET_LOADING,
    isLoading: true,
  });

  // 무한 로딩 방지
  yield call(delay, 10 * 1000);
  const loading = yield select(state => state.get('loading'));
  const isLoading = loading.get('isLoading');
  if (isLoading) {
    yield put({
      type: constants.LOADING_OFF,
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.LOADING_ON, loadingOn);
}
