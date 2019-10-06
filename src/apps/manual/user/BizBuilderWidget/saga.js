import React from 'react';
// import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put } from 'redux-saga/effects';
import { error } from 'components/Feedback/functions';
// import { fromJS } from 'immutable';

import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';

function* getBizBuilderListBySaga(payload) {
  const { widgetId, data } = payload;
  const response = yield call(Axios.get, `/api/builder/v1/work/taskList/${data.WORK_SEQ}`);
  yield put(actions.setBizBuilderListByReducr(widgetId, response));
}

function* getBizBuilderListSettingBySaga(payload) {
  const { widgetId, typeObj } = payload;
  const response = yield call(Axios.get, `/api/manual/v1/ManualWidgetConfigHandler?WIDGET_ID=${widgetId}&type=${typeObj}`);
  if (response.status === 200) {
    const { result } = response;
    const { ITEM_VALUE } = result;
    yield put(actions.setBizBuilderListSettingByReducr(widgetId, ITEM_VALUE.data));
    yield put(actions.getBizBuilderListBySaga(widgetId, ITEM_VALUE.data));
  } else {
    error('데이터 조회에 실패했습니다.');
  }
}

function* getBizBuilderContentViewBySaga(payload) {
  const { widgetId, workSeq, taskSeq } = payload;
  const response = yield call(Axios.post, `/api/builder/v1/work/taskEdit/${workSeq}/${taskSeq}`);
  if (response.status === 200) {
    yield put(actions.setBizBuilderContentViewByReducr(widgetId, response));
  } else {
    error('데이터 조회에 실패했습니다.');
  }
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_BIZBULDERLISTWIDGET_SETTINGINFO_BYSAGA, getBizBuilderListSettingBySaga);
  yield takeLatest(constantTypes.GET_BIZBUILDERLIST_BYSAGA, getBizBuilderListBySaga);
  yield takeLatest(constantTypes.GET_BIZBUILDERVIEW_BYSAGA, getBizBuilderContentViewBySaga);
}
