import { takeLatest, call, put } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as actions from './actions';

function* getView({ apiUrl }) {
  yield put(actions.enableLoading());
  const response = yield call(Axios.get, apiUrl);
  const { metaList, data } = response;
  yield put(actions.successGetView(metaList, data));
  yield put(actions.disableLoading());
}

export default function* watcher() {
  yield takeLatest(actionTypes.GET_VIEW, getView);
}
