import React from 'react';
import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import * as actionTypes from './constants';
import * as actions from './actions';

function* fetchData({ id }) {
  yield put(actions.enableLoading());
  const response = yield call(Axios.get, `/api/builder/v1/work/info/${id}`);
  const { object } = response;
  const prcList = yield call(Axios.get, '/api/workflow/v1/common/process');
  const { processList } = prcList;
  const optList = yield call(Axios.get, '/api/builder/v1/work/optionmeta');
  const { list } = optList;
  const apiList = yield call(Axios.get, '/api/builder/v1/work/apimaster');
  const { list: apiMasterList } = apiList;
  const result = {
    workInfo: object,
    processList,
    optList: list,
    apiList: apiMasterList,
  };
  yield put(actions.successFetchData(result));
  yield put(actions.disableoading());
}

function* setWorkInfo({ workInfo }) {
  const response = yield call(Axios.put, `/api/builder/v1/work/info/${workInfo.WORK_SEQ}`, workInfo);
  if (response && response.resultType) message.success(<MessageContent>Save</MessageContent>);
  else message.error(<MessageContent>Error</MessageContent>);
}

export default function* watcher() {
  yield takeLatest(actionTypes.FETCH_DATA, fetchData);
  yield takeLatest(actionTypes.SET_WORKINFO, setWorkInfo);
}
