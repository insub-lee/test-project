import { takeLatest, put, call, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as actions from './actions';

function* fetchData({ id }) {
  yield put(actions.enableLoading());
  const payload = {
    WORK_SEQ: id,
  };
  // Todo - Call Current Table Columns with meta data
  console.debug('@@ FETCH DATA', payload);
  yield put(actions.disableLoading());
}

export default function* watcher() {
  yield takeLatest(actionTypes.FETCH_DATA, fetchData);
}
