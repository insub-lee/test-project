import React from 'react';
import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';

function* getCategoryMapList(payload) {
  const { mapId, draftMapId, degreeMapId, approverMapId } = payload;
  const response = yield call(Axios.get, `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`);
  if (response) {
    const { categoryMapList } = response;
    yield put(actions.setCatgoryMapListByReducr('categoryMapList', fromJS(categoryMapList)));
  }

  const responseDraft = yield call(Axios.get, `/api/admin/v1/common/categoryMapList?MAP_ID=${draftMapId}`);
  if (responseDraft) {
    const { categoryMapList } = responseDraft;
    yield put(actions.setCatgoryMapListByReducr('draftMapList', fromJS(categoryMapList)));
  }

  const responseDegree = yield call(Axios.get, `/api/admin/v1/common/categoryMapList?MAP_ID=${degreeMapId}`);
  if (responseDegree) {
    const { categoryMapList } = responseDegree;
    yield put(actions.setCatgoryMapListByReducr('degreeMapList', fromJS(categoryMapList)));
  }

  const responseApprover = yield call(Axios.get, `/api/admin/v1/common/categoryMapList?MAP_ID=${approverMapId}`);
  if (responseApprover) {
    const { categoryMapList } = responseApprover;
    yield put(actions.setCatgoryMapListByReducr('approverMapList', fromJS(categoryMapList)));
  }
}

function* getDocApproverList(payload) {
  const { key, workSeq } = payload;
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_CATEGORYMAP_BY_SAGA, getCategoryMapList);
  yield takeLatest(constantTypes.GET_DOC_APPROVER_LIST_BY_SAGA, getDocApproverList);
}
