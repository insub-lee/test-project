import React from 'react';
import { takeLatest, call, put } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as actionTypes from './constants';
import * as actions from './actions';

function* getWorkList() {
  const response = yield call(Axios.get, `/api/builder/v1/work/main`);
  const { list } = response;
  yield put(actions.setWorkList(list));
}

function* getBuilderWidgetConfig({ payload }) {
  const response = yield call(Axios.get, `/api/manual/v1/ManualWidgetConfigHandler?WIDGET_ID=${payload.widgetId}&type=${payload.type}`);
  const { result } = response;
  yield put(actions.setBuilderWidgetConfig(result.ITEM_VALUE));
}

function* saveBuilderWidgetConfig({ payload }) {
  const response = yield call(Axios.post, '/api/manual/v1/ManualWidgetConfigHandler', { PARAM: payload });
  message.success(<MessageContent>적용하였습니다.</MessageContent>, 3);
}

export default function* watcher() {
  yield takeLatest(actionTypes.GET_WORK_LIST, getWorkList);
  yield takeLatest(actionTypes.SAVE_BUILDER_WIDGET_CONFIG, saveBuilderWidgetConfig);
  yield takeLatest(actionTypes.GET_BUILDER_WIDGET_CONFIG, getBuilderWidgetConfig);
}
