import React from 'react';
import { put, takeLatest, call } from 'redux-saga/effects';
// eslint-disable-next-line no-unused-vars
import { fromJS } from 'immutable';
import { intlObj } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import messages from './messages';

import * as constants from './constants';
import { Axios } from '../../../../utils/AxiosFunc';

export function* getUserInfo(payload) {
  const { userId } = payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/getUserInfo/', {
    userId,
  });
  const data = response.userInfo;

  if (!data) {
    yield put({ type: constants.SET_USER_DATA, data });
  }
}

export function* insertUserInfo(payload) {
  const response = yield call(
    Axios.post,
    '/api/admin/v1/common/registUser/',
    payload,
  );
  const data = response;
  if (!data.code) {
    message.success(
      <MessageContent>{intlObj.get(messages.regComplete)}</MessageContent>,
      3,
    );
    yield put({ type: constants.SET_USER_DATA, data });
  }
}

export function* updatetUserInfo(payload) {
  const response = yield call(
    Axios.post,
    '/api/admin/v1/common/updateUser/',
    payload,
  );
  const data = response;
  if (!data.code) {
    yield put({ type: constants.SET_USER_DATA, data });
  }
}

// eslint-disable-next-line no-unused-vars
export function* getEmpNo(payload) {
  yield put({
    type: constants.SET_EMPNO,
    payload: true,
  });
}

export default function* userRegSage() {
  yield takeLatest(constants.GET_EMPNO, getEmpNo);
}
