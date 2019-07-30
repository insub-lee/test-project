import React from 'react';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { Axios } from 'utils/AxiosFunc';
import { success, warning, error, showConfirm } from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import * as constantTypes from './constants';
import * as actions from './actions';
import selectors from './selectors';

function* getCategory() {
  const response = yield call(Axios.get, '/api/manual/v1/categoryhandler');
  // const list = JSON.parse(`[${response.list.join('')}]`);
  const { list } = response;
  let resultList = [...list];
  let oldTreeData = yield select(selectors.makeSelectTreeData());
  oldTreeData = oldTreeData.toJS();
  if (oldTreeData.length > 0) {
    resultList = list.map(item => {
      const oldIdx = oldTreeData.findIndex(findItem => findItem.CATEGORY_IDX === item.CATEGORY_IDX);
      const oldItem = oldTreeData[oldIdx];
      return { ...item, expanded: oldItem ? oldItem.expanded : false };
    });
  }
  yield put(actions.changeCategoryTreeData(resultList));
}

function* saveCategory() {
  const mode = yield select(selectors.makeSelectMode());
  const categoryInfo = yield select(selectors.makeSelectCategoryInfo());
  const response = yield call(Axios[mode === 'I' ? 'post' : 'put'], '/api/manual/v1/categoryhandler', categoryInfo.toJS());
  if (response.result === 'success') {
    yield put(actions.getCategoryTreeData());
    if (mode === 'I') {
      const { addInfo } = response;
      // addInfo.key = addInfo.CATEGORY_IDX;
      yield put(actions.changeViewMode(addInfo, 'U'));
    }
    message.success(<MessageContent>OK</MessageContent>, 3);
  } else {
    error(response.result);
  }
}

function* removeCategory(action) {
  const { node } = action;
  const response = yield call(Axios.delete, `/api/manual/v1/categoryhandler?CATEGORY_IDX=${node.CATEGORY_IDX}`);
  if (response.result === 'success') {
    yield put(actions.getCategoryTreeData());
    yield put(actions.changeSelectedIndex(node.CATEGORY_PARENT_IDX));
    // yield put(actions.changeViewMode(null, 'D'));
    message.success(<MessageContent>OK</MessageContent>, 3);
  } else {
    error(response.result);
  }
}

function* moveCategory(action) {
  const { treeData } = action;
  const response = yield call(Axios.post, '/api/manual/v1/movecategoryhandler', { treeData });
  if (response.result === 'success') {
    message.success(<MessageContent>OK</MessageContent>, 3);
  } else {
    yield put(actions.getCategoryTreeData());
    error(response.result);
  }
}

function* getManualList() {
  yield put(actions.setListLodingByRedcr(true));
  const response = yield call(Axios.get, '/api/manual/v1/WaitManualListHandler');
  const manualList = fromJS(response).get('manualList');

  yield put(actions.setManualListByReducr(manualList));
}

export default function* watcher() {
  yield takeLatest(constantTypes.SAVE_CATEGORY_INFO, saveCategory);
  yield takeLatest(constantTypes.GET_CATEGORY_TREE_DATA, getCategory);
  yield takeLatest(constantTypes.REMOVE_CATEGORY_INFO, removeCategory);
  yield takeLatest(constantTypes.MOVE_CATEGORY, moveCategory);
  yield takeLatest(constantTypes.GET_MANUALLIST_SAGA, getManualList);
}
