import React from 'react';
import { put, takeLatest, call } from 'redux-saga/effects';
// eslint-disable-next-line no-unused-vars
import { fromJS } from 'immutable';
import { intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { Axios } from 'utils/AxiosFunc';
import messages from '../messages';

import * as actionType from './constants';

export function* getDaemonInfo(payload) {
  const { daemonId } = payload;
  const response = yield call(Axios.get, `/api/migration/v1/common/getMigrationDaemonInfo?daemonId=${daemonId}`, {});
  const data = response.daemonInfo;
  if (data) {
    yield put({
      type: actionType.SET_DAEMON_INFO,
      payload: data,
    });
  }
}

export function* insertDaemonInfo(payload) {
  const { history, listParam, daemonInfo, onSaveSuccess } = payload;
  const response = yield call(Axios.post, '/api/migration/v1/common/insertMigrationDaemon', daemonInfo);
  const result = response;
  if (result.code === 200 && result.daemonId > 0) {
    message.success(<MessageContent>{intlObj.get(messages.regComplete)}</MessageContent>, 3);
    onSaveSuccess();

    yield put({
      type: actionType.GET_DAEMON_INFO,
      daemonId: result.daemonId,
    });

    /*
    // 저장후 리스트로
    history.push({
      pathname: `/admin/adminmain/daemon/detail/${result.daemonId}`, state: listParam,
    });
    */
  } else if (result.msg) {
    feed.error(`${intlObj.get(messages.regFail)}`, `${result.msg}`);
  } else {
    feed.error(`${intlObj.get(messages.regFail)}`);
  }
}

export function* updatetDaemonInfo(payload) {
  const { history, listParam, daemonInfo, onSaveSuccess } = payload;
  const response = yield call(Axios.post, '/api/migration/v1/common/updateMigrationDaemon', daemonInfo);
  const result = response;
  if (result.code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.udtComplete)}</MessageContent>, 3);
    onSaveSuccess();
    yield put({
      type: actionType.GET_DAEMON_INFO,
      daemonId: daemonInfo.daemonId,
    });
    /*
    // 저장후 리스트로
    history.push({
      pathname: `/admin/adminmain/account/user/${userInfo.userId}`, state: listParam,
    });
    */
  } else if (result.msg) {
    feed.error(`${intlObj.get(messages.udtFail)}`, `${result.msg}`);
  } else {
    feed.error(`${intlObj.get(messages.udtFail)}`);
  }
}

export function* deleteDaemon(payload) {
  const { listParam, history, daemonId } = payload;
  const response = yield call(Axios.get, `/api/migration/v1/common/deleteMigrationDaemon?daemonId=${daemonId}`, {});
  const result = response;
  if (result.code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.delComplete)}</MessageContent>, 3);
    history.push({
      pathname: `/admin/adminmain/daemon`,
      state: listParam,
    });
  } else if (result.msg) {
    feed.error(`${intlObj.get(messages.delFail)}`, `${result.msg}`);
  } else {
    feed.error(`${intlObj.get(messages.delFail)}`);
  }
}

export default function* daemonDetailSage() {
  yield takeLatest(actionType.GET_DAEMON_INFO, getDaemonInfo);
  yield takeLatest(actionType.INSERT_DAEMON_INFO, insertDaemonInfo);
  yield takeLatest(actionType.UPDATE_DAEMON_INFO, updatetDaemonInfo);
  yield takeLatest(actionType.DELETE_DAEMON, deleteDaemon);
}
