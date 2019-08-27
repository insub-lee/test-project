import React from 'react';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';

function* getBizBuilderListBySaga(payload) {
  const { data } = payload;
  const param = { param: data };
  const response = yield call(Axios.post, '/api/manual/v1/BizBuilderWidgetHandler', param);
  const { bizBuilderList } = response;
  yield put(actions.setBizBuilderListByReducr(bizBuilderList));
}

function* getBizBuilderListSettingBySaga(payload) {
  const { widgetId, typeObj } = payload;
  const response = yield call(Axios.get, `/api/manual/v1/ManualWidgetConfigHandler?WIDGET_ID=${widgetId}&type=${typeObj}`);
  const { result } = response;
  const { ITEM_VALUE } = result;
  yield put(actions.setBizBuilderListSettingByReducr(ITEM_VALUE.data));
  yield put(actions.getBizBuilderListBySaga(ITEM_VALUE.data));
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_BIZBULDERLISTWIDGET_SETTINGINFO_BYSAGA, getBizBuilderListSettingBySaga);
  yield takeLatest(constantTypes.GET_BIZBUILDERLIST_BYSAGA, getBizBuilderListBySaga);
}
