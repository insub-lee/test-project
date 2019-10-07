import React from 'react';
import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';
import * as actionTypes from './constants';
import * as actions from './actions';

function* getCategoryMapList(payload) {
  const { key, mapId } = payload;
  const response = yield call(Axios.get, `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`);
  yield put(actions.setCatgoryMapListByReducr(key, response));
}
function* getFilteredData(payload) {
  const { selectedKey } = payload;
  const response = yield call(Axios.get, `/api/manual/v1/DocNotice?key=${selectedKey}&type=notice`);
  const { data } = response;
  yield put(actions.setFilteredDataByReducer(data));
}

export default function* watcher() {
  yield takeEvery(actionTypes.GET_CATEGORYMAP, getCategoryMapList);
  yield takeEvery(actionTypes.GET_FILTERED_DATA, getFilteredData);
}
