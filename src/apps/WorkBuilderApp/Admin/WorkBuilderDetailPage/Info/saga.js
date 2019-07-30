import { takeLatest, put, call, select } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as actions from './actions';

function* fetchData({ id }) {
  const response = yield call(Axios.get, `/api/builder/v1/work/info/${id}`);
  const { object } = response;
  const info = JSON.parse(object) || {};
  yield put(actions.successFetchData(info));
}

export default function* watcher() {
  yield takeLatest(actionTypes.FETCH_DATA, fetchData);
}
