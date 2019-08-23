import React from 'react';
import { takeLatest, call, put } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as feed from 'components/Feedback/functions';
import * as actions from './actions';
import * as constantTypes from './constants';

function* getRootMapList({ payload }) {
  const response = yield call(Axios.get, `/api/admin/v1/common/categoryRootMap`);
  const { rootMapList } = response;
  yield put(actions.setRootMapList(rootMapList));
}

function* getCategoryMapList({ payload }) {
  const response = yield call(Axios.get, `/api/admin/v1/common/categoryMap?MAP_ID=${payload.MAP_ID}`);
  const { categoryMapList } = response;
  yield put(actions.setCategoryMapList(categoryMapList.map(item => ({ ...item, expanded: item.LVL <= 1, key: item.NODE_ID }))));
}

function* addCategoryMap({ categoryMap }) {
  const response = yield call(Axios.post, `/api/admin/v1/common/categoryMap`, categoryMap);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>카테고리 추가에 성공했습니다.</MessageContent>, 3);
    yield put(actions.getCategoryMapList({ MAP_ID: categoryMap.MAP_ID }));
    yield put(actions.initAddNodeInfo());
  } else {
    feed.error(`카테고리 추가에 실패하였습니다.`);
  }
}

function* updateCategoryMap({ categoryMap }) {
  const response = yield call(Axios.put, `/api/admin/v1/common/categoryMap`, categoryMap);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>카테고리 수정에 성공했습니다.</MessageContent>, 3);
    yield put(actions.getCategoryMapList({ MAP_ID: categoryMap.MAP_ID }));
  } else {
    feed.error(`카테고리 수정에 실패하였습니다.`);
  }
}

function* deleteCategoryMap({ categoryMap }) {
  const response = yield call(Axios.delete, `/api/admin/v1/common/categoryMap`, categoryMap);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>카테고리 삭제에 성공했습니다.</MessageContent>, 3);
    yield put(actions.getCategoryMapList({ MAP_ID: categoryMap.MAP_ID }));
  } else {
    feed.error(`카테고리 삭제에 실패하였습니다.`);
  }
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_ROOTMAP_LIST, getRootMapList);
  yield takeLatest(constantTypes.GET_CATEGORYMAP_LIST, getCategoryMapList);
  yield takeLatest(constantTypes.ADD_CATEGORY_MAP, addCategoryMap);
  yield takeLatest(constantTypes.UPDATE_CATEGORY_MAP, updateCategoryMap);
  yield takeLatest(constantTypes.DELETE_CATEGORY_MAP, deleteCategoryMap);
}
