import React from 'react';

import { takeLatest, put, call } from 'redux-saga/effects';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as feed from 'components/Feedback/functions';
import { fromJS } from 'immutable';

import { intlObj } from 'utils/commonUtils';
import messages from '../messages';

import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';

export function* getMyAppDetail(payload) {
  const params = { ...payload.payload, SITE_ID: -1 };
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/myappdetail/', params);

  if (response.managerChk !== 0) {
    if (response.appinfo != null) {
      yield put({ type: constants.APP_INFO, payload: response.appinfo });
    }
    yield put({ type: constants.SERVICE_STOP_CODE_LIST, payload: fromJS(response.serviceStopCodeList) });
  }
}

export function* serviceStop(payload) {
  const { history } = payload.payload;
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/serviceStop/', payload.payload);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.serviceStopOk)}</MessageContent>, 3);
    history.push('/store/appMain/MyApp');
    // yield put({ type: constants.SERVICE_STOP_OK, payload: true });
  } else if (code === 201) {
    feed.error(`${intlObj.get(messages.serviceStopOverlap)}`);
  } else if (code === 202) {
    feed.error(`${intlObj.get(messages.serviceing)}`);
  } else {
    feed.error(`${intlObj.get(messages.serviceStopFail)}`);
  }
}

export function* serviceRestart(payload) {
  const { history } = payload.payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/serviceRestart/', payload.payload);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.serviceRestartOk)}</MessageContent>, 3);
    history.push('/store/appMain/MyApp');
  } else if (code === 201) {
    feed.error(`${intlObj.get(messages.serviceRestartOverlap)}`);
  } else {
    feed.error(`${intlObj.get(messages.serviceRestartFail)}`);
  }
}

export default function* orgSage() {
  yield takeLatest(constants.GET_MY_APP_DETAIL, getMyAppDetail);
  yield takeLatest(constants.SERVICE_STOP, serviceStop);
  yield takeLatest(constants.SERVICE_RESTART, serviceRestart);
}
