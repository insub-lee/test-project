import React from 'react';
import { fromJS } from 'immutable';
import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import * as feed from 'components/Feedback/functions';
import MessageContent from 'components/Feedback/message.style2';
import * as actionTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

function* getApproveList() {
  const response = yield call(Axios.post, `/api/workflow/v1/common/approve/approveList`, {});
  if (response) {
    const { list } = response;
    yield put(actions.setApproveList(list));
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

function* successApprove() {
  message.success(<MessageContent>결재에 성공하였습니다.</MessageContent>, 3);
  yield put(actions.getApproveList({ searchType: 'unApproval' }));
}

function* failApprove({ errMsg }) {
  feed.error(errMsg);
  yield put(actions.getApproveList({ searchType: 'unApproval' }));
}

function* getDraftList() {
  const response = yield call(Axios.post, `/api/workflow/v1/common/draftList`, {});
  if (response) {
    const { list } = response;
    yield put(actions.setDraftList(list));
  }
}

export default function* watcher() {
  yield takeEvery(actionTypes.GET_APPROVE_LIST, getApproveList);
  yield takeLatest(actionTypes.REQ_APPROVE, reqApprove);
  yield takeEvery(actionTypes.SUCCESS_APPROVE, successApprove);
  yield takeEvery(actionTypes.FAIL_APPROVE, failApprove);
  yield takeLatest(actionTypes.GET_USERINFO, getUserInfo);
  yield takeEvery(actionTypes.GET_DRAFT_LIST, getDraftList);
}
