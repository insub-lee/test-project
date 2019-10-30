import React from 'react';
import { takeEvery, takeLatest, put, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as feed from 'components/Feedback/functions';
import * as actions from './actions';
import * as constantTypes from './constants';

function* getNodeDetail({ nodeId }) {
  const response = yield call(Axios.get, `/api/workflow/v1/common/node/${nodeId}`);
  const { node } = response;
  yield put(actions.setNodeDetail(node));
}

function* deleteNode({ nodeInfo }) {
  const response = yield call(Axios.delete, `/api/workflow/v1/common/node/${nodeInfo.NODE_ID}`, { PARAM: { ...nodeInfo } });
  const { code } = response;
  if (code !== undefined && code === 200) {
    message.success(<MessageContent>노드 삭제에 성공하였습니다.</MessageContent>, 3);
    yield put(push(`/admin/adminmain/node`));
  } else {
    feed.error(`노드 삭제에 실패하였습니다.`);
  }
}

export default function* watcher() {
  yield takeEvery(constantTypes.GET_NODE_DETAIL, getNodeDetail);
  yield takeLatest(constantTypes.DELETE_NODE, deleteNode);
}
