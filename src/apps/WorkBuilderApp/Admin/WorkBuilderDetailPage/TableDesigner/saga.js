import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { Axios } from 'utils/AxiosFunc';

function* boot({ payload }) {

}

function* fetchData({ id }) {
  const payload = {
    WORK_SEQ: id,
  };
  console.debug('@@ FETCH DATA', payload);
}

export default function* watcher() {
  yield takeLatest(actionTypes.FETCH_DATA, fetchData);
}