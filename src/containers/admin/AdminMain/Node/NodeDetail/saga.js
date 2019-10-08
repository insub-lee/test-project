import React from 'react';
import { takeEvery, takeLatest, put, call, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as actions from './actions';
import * as constantTypes from './constants';

function* getNodeDetail({ nodeId }) {
  const response = yield call(Axios.get, `/api/workflow/v1/common/node/${nodeId}`);
  const { node } = response;
  yield put(actions.setNodeDetail(node));
}

export default function* watcher() {
  yield takeEvery(constantTypes.GET_NODE_DETAIL, getNodeDetail);
}
