import React from 'react';
import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import * as feed from 'components/Feedback/functions';
import MessageContent from 'components/Feedback/message.style2';
import * as actionTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

function* getApproveList({ payload }) {
  const response = yield call(Axios.post, `/api/workflow/v1/common/workprocess/draftList`, { PARAM: { ...payload } });
  const { list } = response;
  yield put(actions.setApproveList(list));
}

function* reqApprove({ appvStatus }) {
  const reqRow = yield select(selectors.makeSelectSelectedRow());
  const opinion = yield select(selectors.makeSelectOpinion());
  const payload = {
    QUE_ID: reqRow.QUE_ID,
    APPV_STATUS: appvStatus,
    OPINION: opinion,
  };

  const response = yield call(Axios.post, `/api/workflow/v1/common/workprocess/draftApprove`, { PARAM: { ...payload } });
}

function* successApprove() {
  message.success(<MessageContent>결재에 성공하였습니다.</MessageContent>, 3);
  yield put(actions.getApproveList({ searchType: 'unApproval' }));
}

function* failApprove({ errMsg }) {
  feed.error(errMsg);
  yield put(actions.getApproveList({ searchType: 'unApproval' }));
}

export default function* watcher() {
  yield takeEvery(actionTypes.GET_APPROVE_LIST, getApproveList);
  yield takeLatest(actionTypes.REQ_APPROVE, reqApprove);
  yield takeEvery(actionTypes.SUCCESS_APPROVE, successApprove);
  yield takeEvery(actionTypes.FAIL_APPROVE, failApprove);
}
