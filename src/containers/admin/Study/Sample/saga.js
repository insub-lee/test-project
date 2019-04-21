import { put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import fakeData from './fakeData.js';

import * as constants from './constants';

export function* getStart(payload) {
  console.log('sample..', payload.payload);
  const response = fakeData.sampleText;
  yield put({ type: constants.SET_START, payload: response });

  const responseArr = fakeData.fakeDataList1;
  yield put({ type: constants.SET_FAKELIST1, payload: fromJS(responseArr) });
}

export default function* sampleSage() {
  yield takeLatest(constants.GET_SATRT, getStart);
}
