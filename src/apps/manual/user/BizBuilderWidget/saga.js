import React from 'react';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';

function* getBizBuilderListBySaga(payload) {
  const { widgetId, data } = payload;
  console.debug('###', data);
  const response = yield call(Axios.get, `/api/builder/v1/work/taskList/${data.WORK_SEQ}`);
  yield put(actions.setBizBuilderListByReducr(widgetId, response));
}

function* getBizBuilderListSettingBySaga(payload) {
  const { widgetId, typeObj } = payload;
  const response = yield call(Axios.get, `/api/manual/v1/ManualWidgetConfigHandler?WIDGET_ID=${widgetId}&type=${typeObj}`);
  const { result } = response;
  const { ITEM_VALUE } = result;
  yield put(actions.setBizBuilderListSettingByReducr(widgetId, ITEM_VALUE.data));
  yield put(actions.getBizBuilderListBySaga(widgetId, ITEM_VALUE.data));
}

function* getBizBuilderContentViewBySaga(payload) {
  const { widgetId, workSeq, taskSeq } = payload;
  const response = yield call(Axios.post, `/api/builder/v1/work/taskEdit/${workSeq}/${taskSeq}`);
  yield put(actions.setBizBuilderContentViewByReducr(widgetId, response));
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_BIZBULDERLISTWIDGET_SETTINGINFO_BYSAGA, getBizBuilderListSettingBySaga);
  yield takeLatest(constantTypes.GET_BIZBUILDERLIST_BYSAGA, getBizBuilderListBySaga);
  yield takeLatest(constantTypes.GET_BIZBUILDERVIEW_BYSAGA, getBizBuilderContentViewBySaga);
}
