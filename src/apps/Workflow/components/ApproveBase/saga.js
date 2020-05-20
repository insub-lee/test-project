import React from 'react';
import { fromJS } from 'immutable';
import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as feed from 'components/Feedback/functions';
import * as actionTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

function* getApproveList() {
  const response = yield call(Axios.post, `/api/workflow/v1/common/approve/approveList`, { PARAM: { relTypes: [1, 99, 999] } });
  if (response) {
    const { list } = response;
    yield put(actions.setApproveList(list));
    yield put(actions.setPartialInit());
  }
}

function* getCustomDataBind({ httpMethod, rtnUrl, param }) {
  let httpMethodInfo = Axios.put;
  switch (httpMethod.toUpperCase()) {
    case 'POST':
      httpMethodInfo = Axios.post;
      break;
    case 'PUT':
      httpMethodInfo = Axios.put;
      break;
    case 'DELETE':
      httpMethodInfo = Axios.delete;
      break;
    default:
      httpMethodInfo = Axios.get;
      break;
  }
  const response = yield call(httpMethodInfo, `${rtnUrl}`, param);
  if (response) {
    const { list } = response;
    yield put(actions.setCustomDataBind(list));
  }
}

function* getUnApproveList() {
  const response = yield call(Axios.post, `/api/workflow/v1/common/approve/unApproveList`, { PARAM: { relTypes: [1, 99, 999] } });
  if (response) {
    const { list } = response;
    yield put(actions.setUnApproveList(list));
    yield put(actions.setPartialInit());
  }
}

function* getDraftList() {
  const response = yield call(Axios.post, `/api/workflow/v1/common/approve/draftList`, { PARAM: { relTypes: [1, 99, 999] } });
  if (response) {
    const { list } = response;
    yield put(actions.setDraftList(list));
    yield put(actions.setPartialInit());
  }
}

function* reqApprove({ appvStatus }) {
  const reqRow = yield select(selectors.makeSelectSelectedRow());
  const opinion = yield select(selectors.makeSelectOpinion());
  const formData = yield select(selectors.makeSelectFormData());
  const payload = {
    ISFORMDATA: false,
    QUE_ID: reqRow.QUE_ID,
    APPV_STATUS: reqRow.APPV_STATUS,
    OPINION: opinion,
    QUE_DATA: reqRow,
    FORM_DATA: formData,
  };

  const response = yield call(Axios.post, `/api/workflow/v1/common/workprocess/draftApprove`, { PARAM: { ...payload } });
}

function* getUserInfo({ userInfo, callBack }) {
  const response = yield call(Axios.post, `/api/common/v1/account/userSearch`, { PARAM: { ...userInfo } });
  // eslint-disable-next-line no-unused-expressions
  const { list } = response;
  typeof callBack === 'function' && callBack(JSON.parse(list));
}

function* successApprove({ message: msg }) {
  message.success(msg, 3);
  yield put(actions.getApproveList());
  yield put(actions.getUnApproveList());
  yield put(actions.getDraftList());
}

function* failApprove({ errMsg }) {
  feed.error(errMsg);
  // yield put(actions.getApproveList({ searchType: 'unApproval' }));
  yield put(actions.getUnApproveList());
}

function* submitHandlerBySaga({ id, httpMethod, apiUrl, submitData, callbackFunc }) {
  let httpMethodInfo = Axios.put;
  switch (httpMethod.toUpperCase()) {
    case 'POST':
      httpMethodInfo = Axios.post;
      break;
    case 'PUT':
      httpMethodInfo = Axios.put;
      break;
    case 'DELETE':
      httpMethodInfo = Axios.delete;
      break;
    default:
      httpMethodInfo = Axios.get;
      break;
  }
  console.debug('submitHandler');
  const response = yield call(httpMethodInfo, apiUrl, submitData);
  if (typeof callbackFunc === 'function') {
    callbackFunc(id, response);
  }
}

export default function* watcher() {
  yield takeEvery(actionTypes.PUBLIC_ACTIONMETHOD_SAGA, submitHandlerBySaga);
  yield takeEvery(actionTypes.GET_APPROVE_LIST, getApproveList);
  yield takeEvery(actionTypes.GET_UNAPPROVE_LIST, getUnApproveList);
  yield takeEvery(actionTypes.GET_DRAFT_LIST, getDraftList);
  yield takeLatest(actionTypes.REQ_APPROVE, reqApprove);
  yield takeEvery(actionTypes.SUCCESS_APPROVE, successApprove);
  yield takeEvery(actionTypes.FAIL_APPROVE, failApprove);
  yield takeLatest(actionTypes.GET_USERINFO, getUserInfo);
  yield takeEvery(actionTypes.GET_CUSTOMER_DATABIND, getCustomDataBind);
}
