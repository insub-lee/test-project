import React from 'react';
import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';

function* getNotificationList(payload) {
  const { key, workSeq } = payload;
  const response = yield call(Axios.get, `/api/mdcs/v1/common/Sample?WORK_SEQ=${workSeq}`);
  if (response) {
    const { notificationList } = response;
    yield put(actions.setNotificationListByReducr(key, notificationList));
  }
}

export default function* watcher() {
  yield takeEvery(constantTypes.GET_NOTIFICATIONLIST, getNotificationList);
}
