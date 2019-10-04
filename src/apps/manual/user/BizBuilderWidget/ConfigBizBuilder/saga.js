import React from 'react';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';

function* setBizBuilderWidgetSettingBySaga(payload) {
  const { item } = payload;
  const param = { PARAM: item };
  const response = yield call(Axios.post, '/api/manual/v1/ManualWidgetConfigHandler', param);
}

function* getBizBuilderWidgetSettingBySaga(payload) {
  const { item } = payload;
  const response = yield call(Axios.get, `/api/manual/v1/ManualWidgetConfigHandler?WIDGET_ID=${item.id}`);
  // sourcecols, strsql
  const { result } = response;

  yield put(actions.setBizBuilderWidgetSttingByReducr(item.id, fromJS(result.ITEM_VALUE)));
  yield put(actions.getWorkMetaBySaga(item.id, result.ITEM_VALUE.data.WORK_SEQ));
}

function* getWorkListBySaga(payload) {
  const { widgetId } = payload;
  const response = yield call(Axios.get, '/api/manual/v1/BizBuilderWorkHandler');
  const { workList } = response;
  yield put(actions.setWorkListByReducr(widgetId, workList));
}

function* getWorkMetaInfoBySaga(payload) {
  const { widgetId, workSeq } = payload;
  const response = yield call(Axios.get, `/api/builder/v1/work/meta?workSeq=${workSeq}`);
  yield put(actions.setWorkMetaByReducr(widgetId, response));
}

export default function* watcher() {
  yield takeLatest(constantTypes.SET_BIZBUILDERLIST_SETTING_BYSAGA, setBizBuilderWidgetSettingBySaga);
  yield takeLatest(constantTypes.GET_BIZBUILDERLIST_SETTING_BYSAGA, getBizBuilderWidgetSettingBySaga);
  yield takeLatest(constantTypes.GET_WORKLIST_BYSAGA, getWorkListBySaga);
  yield takeLatest(constantTypes.GET_WORKMETA_BYSAGA, getWorkMetaInfoBySaga);
}
