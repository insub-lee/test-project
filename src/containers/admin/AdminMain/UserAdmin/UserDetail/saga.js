import React from 'react';
import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
// eslint-disable-next-line no-unused-vars
import { fromJS } from 'immutable';
import { intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import messages from '../messages';

import * as actionType from './constants';
import { Axios } from 'utils/AxiosFunc';

export function* getUserInfo(payload) {
  const { userId } = payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/getUserInfo/', { userId });
  const data = response.userInfo;
  if (data) {
    yield put({
      type: actionType.SET_USER_DATA,
      payload: data,
    });
  }
}

export function* insertUserInfo(payload) {
  const { history, userInfo } = payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/registUser/', userInfo);
  const data = response;
  if (data.code === 200 && data.userId !== 0) {
    message.success(<MessageContent>{intlObj.get(messages.regComplete)}</MessageContent>, 3);
    const listParam = payload.data;
    history.push({
      pathname: '/admin/adminmain/account', state: listParam,
    });

  } else {
    feed.error(`${intlObj.get(messages.regFail)}`);
  }
}

export function* updatetUserInfo(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/updateUser/', payload.userInfo);
  const data = response;
  if (data.code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.udtComplete)}</MessageContent>, 3);
    // const { userId } = data;
    // yield put(push(`/admin/adminmain/account/user/${userId}`));
  } else {
    feed.error(`${intlObj.get(messages.udtFail)}`);
  }
}

// eslint-disable-next-line no-unused-vars
export function* getEmpNo(payload) {
  const empNo = payload.empNo.toUpperCase();
  const userId = Number(payload.userId);
  const response = yield call(Axios.post, '/api/admin/v1/common/userDupCheck', { empNo, userId });
  const data = response;
  if (data.result) {
    yield put({
      type: actionType.SET_EMPNO,
      empNoCheck: data.empNo,
      empNoFlag: data.result === 'ok' ? 1 : 0,
    });
  }
}

export function* getDeptComboData() {
  yield put({
    type: actionType.IS_LOADING,
    isLoading: true,
  });
  const response = yield call(Axios.get, '/api/common/v1/account/organizationList', {});
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  const DEPT_ID = fromJS(response.list[0].DEPT_ID);
  yield put({
    type: actionType.SET_DEPT_COMBO_LIST,
    deptComboData: fromJS(response.list),
  });
  yield put({
    type: actionType.GET_CHANGE_DEPT_DATA,
    DEPT_ID,
  });
}

export function* getChangeDeptTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/deptChangeTree/${payload.DEPT_ID}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_CHANGE_DEPT_DATA,
    deptTreeData: fromJS(list),
    selectedDept: payload.DEPT_ID,
  });
  yield put({
    type: actionType.IS_LOADING,
    isLoading: false,
  });
}

export function* getDutyComboData() {
  yield put({
    type: actionType.IS_LOADING,
    isLoading: true,
  });
  const response = yield call(Axios.get, '/api/common/v1/account/organizationDutyList', {});
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  const DUTY_ID = fromJS(response.list[0].DUTY_ID);
  yield put({
    type: actionType.SET_DUTY_COMBO_LIST,
    dutyComboData: fromJS(response.list),
  });
  yield put({
    type: actionType.GET_CHANGE_DUTY_DATA,
    DUTY_ID,
  });
}

export function* getChangeDutyTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/dutyChangeTree/${payload.DUTY_ID}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_CHANGE_DUTY_DATA,
    dutyTreeData: fromJS(list),
    selectedDept: payload.DUTY_ID,
  });
  yield put({
    type: actionType.IS_LOADING,
    isLoading: false,
  });
}

export function* getPstnComboData() {
  yield put({
    type: actionType.IS_LOADING,
    isLoading: true,
  });
  const response = yield call(Axios.get, '/api/common/v1/account/organizationPstnList', {});
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  const PSTN_ID = fromJS(response.list[0].PSTN_ID);
  yield put({
    type: actionType.SET_PSTN_COMBO_LIST,
    pstnComboData: fromJS(response.list),
  });
  yield put({
    type: actionType.GET_CHANGE_PSTN_DATA,
    PSTN_ID,
  });
}

export function* getChangePstnTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/pstnChangeTree/${payload.PSTN_ID}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_CHANGE_PSTN_DATA,
    pstnTreeData: fromJS(list),
    selectedDept: payload.PSTN_ID,
  });
  yield put({
    type: actionType.IS_LOADING,
    isLoading: false,
  });
}

export function* getRankComboData() {
  yield put({
    type: actionType.IS_LOADING,
    isLoading: true,
  });
  const response = yield call(Axios.get, '/api/common/v1/account/organizationRankList', {});
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  const RANK_ID = fromJS(response.list[0].RANK_ID);
  yield put({
    type: actionType.SET_RANK_COMBO_LIST,
    rankComboData: fromJS(response.list),
  });
  yield put({
    type: actionType.GET_CHANGE_RANK_DATA,
    RANK_ID,
  });
}

export function* getChangeRankTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/rankChangeTree/${payload.RANK_ID}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_CHANGE_RANK_DATA,
    rankTreeData: fromJS(list),
    selectedDept: payload.RANK_ID,
  });
  yield put({
    type: actionType.IS_LOADING,
    isLoading: false,
  });
}

export default function* userRegSage() {
  yield takeLatest(actionType.GET_USER_DATA, getUserInfo);
  yield takeLatest(actionType.INSERT_USER_DATA, insertUserInfo);
  yield takeLatest(actionType.UPDATE_USER_DATA, updatetUserInfo);
  yield takeLatest(actionType.GET_EMPNO, getEmpNo);
  yield takeLatest(actionType.GET_DEPT_COMBO_LIST, getDeptComboData);
  yield takeLatest(actionType.GET_CHANGE_DEPT_DATA, getChangeDeptTreeData);
  yield takeLatest(actionType.GET_DUTY_COMBO_LIST, getDutyComboData);
  yield takeLatest(actionType.GET_CHANGE_DUTY_DATA, getChangeDutyTreeData);
  yield takeLatest(actionType.GET_PSTN_COMBO_LIST, getPstnComboData);
  yield takeLatest(actionType.GET_CHANGE_PSTN_DATA, getChangePstnTreeData);
  yield takeLatest(actionType.GET_RANK_COMBO_LIST, getRankComboData);
  yield takeLatest(actionType.GET_CHANGE_RANK_DATA, getChangeRankTreeData);
}
