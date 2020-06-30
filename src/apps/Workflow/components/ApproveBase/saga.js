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

function* getApproveList({ customUrl }) {
  const response = yield call(Axios.post, customUrl || `/api/workflow/v1/common/approve/approveList`, { PARAM: { relTypes: [1, 99, 999] } });
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

function* getUnApproveList({ customUrl, PAGE, PAGE_CNT }) {
  console.debug('customUrl', customUrl);
  const response = yield call(Axios.post, customUrl || `/api/workflow/v1/common/approve/unApproveList`, {
    PARAM: { relTypes: [1, 4, 99, 999], PAGE: PAGE || 1, PAGE_CNT: PAGE_CNT || 10 },
  });
  if (response) {
    const { list, listCnt } = response;
    yield put(actions.setUnApproveList(list, listCnt));
    yield put(actions.setPartialInit());
  }
}

function* getDraftList({ customUrl }) {
  const response = yield call(Axios.post, customUrl || `/api/workflow/v1/common/approve/draftList`, { PARAM: { relTypes: [1, 99, 999] } });
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
    QUE_DATA: { ...reqRow, OPINION: opinion },
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

function* successApprove({ message: msg, customUrl }) {
  message.success(msg, 3);
  yield put(actions.getApproveList(customUrl));
  yield put(actions.getUnApproveList(customUrl));
  yield put(actions.getDraftList(customUrl));
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
  const response = yield call(httpMethodInfo, apiUrl, submitData);
  if (typeof callbackFunc === 'function') {
    callbackFunc(id, response);
  }
}

function* getFileDownload({ url, fileName }) {
  const blobResponse = yield call(Axios.getDown, url);

  if (window.navigator && window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blobResponse, fileName);
  } else {
    const fileUrl = window.URL.createObjectURL(blobResponse);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function* getFileDownloadProgress({ url, fileName, onProgress, callback }) {
  const blobResponse = yield call(Axios.getDownProgress, url, {}, {}, onProgress);
  const { size } = blobResponse;
  if (size > 0) {
    if (window.navigator && window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blobResponse, fileName);
    } else {
      const fileUrl = window.URL.createObjectURL(blobResponse);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  if (typeof callback === 'function') {
    callback(blobResponse, url, fileName);
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
  yield takeEvery(actionTypes.GET_FILE_DOWNLOAD, getFileDownload);
  yield takeEvery(actionTypes.GET_FILE_DOWNLOAD, getFileDownload);
  yield takeLatest(actionTypes.GET_FILE_DOWNLOAD_PROGRESS, getFileDownloadProgress);
}
