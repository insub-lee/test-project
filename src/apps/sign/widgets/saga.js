import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as actionType from './constants';
import { Axios } from '../../../utils/AxiosFunc';

export function* getSignList(payload) {
  const resultValue = yield call(Axios.post, '/apps/api/v1/sign/signList', payload);
}

export function* getSign(payload) {
  if (payload) {
    yield put({
      type: actionType.SET_SIGNLIST,
      // payload: fromJS(resultValue),
      payload: fromJS(payload.resultArray),
    });
  } else {
    yield put({
      type: actionType.SET_SIGNLIST,
      // payload: fromJS(resultValue),
      payload: fromJS([]),
    });
  }
}

export function* deleteSign(payload) {
  const { item } = payload;
  const id = 123
  const data = {
    PARAM: {
      ITEM: item,
      WIDGETID: id,
    },
  };

  const response = yield call(Axios.post, '/api/portal/v1/page/deleteSign/', data);

  if (response.result === 'success') {
    yield put({ type: actionType.GET_SIGNLIST_SAGA, id });
  }
}

export default function* signSaga() {
  yield takeLatest(actionType.GET_SIGNLIST_SAGA, getSignList);
  yield takeLatest(actionType.DELETE_SIGN_SAGA, deleteSign);
  yield takeLatest('notify/NC0012', getSign);
}
