import React from 'react';
import { takeEvery, takeLatest, put, call, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as feed from 'components/Feedback/functions';
import * as actions from './actions';
import * as constantTypes from './constants';

function* getNodeList({ payload }) {
  const response = yield call(Axios.post, `/api/workflow/v1/common/nodeList`, { PARAM: { ...payload } });
  const { nodeList } = response;
  yield put(actions.setNodeList(nodeList));
}

export default function* watcher() {
  yield takeEvery(constantTypes.GET_NODE_LIST, getNodeList);
}
