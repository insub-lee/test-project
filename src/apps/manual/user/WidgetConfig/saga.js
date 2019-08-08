import React from 'react';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';
import selectors from './selectors';

function* getCategory() {
  const response = yield call(Axios.get, '/api/manual/v1/categoryhandler');
  // const list = JSON.parse(`[${response.list.join('')}]`);
  const { list } = response;
  yield put(actions.setCategoryListByReducr(list));
}

function* setManualWidgetSettingBySaga(action) {
  const { item } = action;
  const param = { PARAM: item };
  const response = yield call(Axios.post, '/api/manual/v1/ManualWidgetConfigHandler', param);
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_CATEGORYLIST, getCategory);
  yield takeLatest(constantTypes.SET_CATEGORYSETTING_INFO_SAGA, setManualWidgetSettingBySaga);
}
