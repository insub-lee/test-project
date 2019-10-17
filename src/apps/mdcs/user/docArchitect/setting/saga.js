import React from 'react';
import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';

function* getCategoryMapList(payload) {
  const { key, mapId } = payload;
  const response = yield call(Axios.get, `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`);
  yield put(actions.setCatgoryMapListByReducr(key, response));
}

function* getDeleteDocList(payload) {
  const item = payload.payload;
  const { type, WIDGET_ID, size, user, data } = item;
  const itemValue = JSON.stringify({ size, user, data });
  yield call(Axios.post, `/api/mdcs/v1/common/DeleteArchitect`, { WIDGET_ID, itemValue, type });
}

export default function* watcher() {
  yield takeEvery(constantTypes.GET_CATEGORYMAP, getCategoryMapList);
  yield takeEvery(constantTypes.DELETE_DOC_LIST, getDeleteDocList);
}
