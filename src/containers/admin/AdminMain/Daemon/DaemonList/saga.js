import React from 'react';
import { put, takeLatest, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import { intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as actionTypes from './constants';
import messages from '../messages';

export function* getDaemonList(payload) {
  const param = payload.payload;

  const response = yield call(Axios.get, `/api/migration/v1/common/getMigrationDaemonList?${new URLSearchParams(param).toString()}`, param);

  const { daemonList } = response;
  yield put({ type: actionTypes.SET_DAEMON_LIST, payload: daemonList || [] });
}

export function* startDaemon(payload) {
  const param = payload.payload;

  const response = yield call(Axios.get, `/api/migration/v1/common/startMigrationDaemon?${new URLSearchParams(param).toString()}`, param);
  const { code } = response;
  if (code === 200) {
    // 정상 실행
    message.success(<MessageContent>{intlObj.get(messages.startDaemonSuccess)}</MessageContent>, 3);
  } else if (code === 500) {
    // 이미 실행중
    feed.error(`${intlObj.get(messages.startDaemonFail3)}`);
  } else if (code === 404) {
    // 데몬 정보를 찾을수 없음
    feed.error(`${intlObj.get(messages.startDaemonFail2)}`);
  } else {
    feed.error(`${intlObj.get(messages.startDaemonFail)}`);
  }
}

export default function* DaemonListSaga() {
  yield takeLatest(actionTypes.GET_DAEMON_LIST, getDaemonList);
  yield takeLatest(actionTypes.START_DAEMON, startDaemon);
}
