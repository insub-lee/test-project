import React from 'react';
import { takeLatest, put, call, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as feed from 'components/Feedback/functions';
import * as actions from './actions';
import * as constantTypes from './constants';
import * as selectors from './selectors';

function* getRootMapList({ payload }) {
  const response = yield call(Axios.get, `/api/admin/v1/common/categoryRootMap?GUBUN=${payload.GUBUN}`);
  const { rootMapList } = response;
  yield put(actions.setRootMapList(rootMapList));
}

function* addRootMap({ rootMapInfo }) {
  const response = yield call(Axios.post, `/api/admin/v1/common/categoryRootMap`, rootMapInfo);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>카테고리 추가에 성공했습니다.</MessageContent>, 3);
    const GUBUN = yield select(selectors.makeRootMapGuun());
    yield put(actions.getRootMapList({ GUBUN }));
  } else {
    feed.error(`카테고리 추가에 실패하였습니다.`);
  }
  yield put(actions.setVisibleModal(false));
}

function* updateRootMap({ rootMapInfo }) {
  const response = yield call(Axios.put, `/api/admin/v1/common/categoryRootMap`, rootMapInfo);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>카테고리 수정에 성공했습니다.</MessageContent>, 3);
    const GUBUN = yield select(selectors.makeRootMapGuun());
    yield put(actions.getRootMapList({ GUBUN }));
  } else {
    feed.error(`카테고리 수정에 실패하였습니다.`);
  }
  yield put(actions.setVisibleModal(false));
}

function* deleteRootMap({ payload }) {
  const response = yield call(Axios.delete, `/api/admin/v1/common/categoryRootMap`, payload);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>카테고리 삭제에 성공했습니다.</MessageContent>, 3);
    const GUBUN = yield select(selectors.makeRootMapGuun());
    yield put(actions.getRootMapList({ GUBUN }));
    yield put(actions.setSelectedRowKeys([]));
  } else {
    feed.error(`카테고리 삭제에 실패하였습니다.`);
  }
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_ROOTMAP_LIST, getRootMapList);
  yield takeLatest(constantTypes.ADD_ROOTMAP, addRootMap);
  yield takeLatest(constantTypes.UPDATE_ROOTMAP, updateRootMap);
  yield takeLatest(constantTypes.DELETE_ROOTMAP, deleteRootMap);
}
