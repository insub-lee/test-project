import React from 'react';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { intlObj } from 'utils/commonUtils';
import { put, takeLatest, call } from 'redux-saga/effects';
// import { fromJS } from 'immutable';
import messages from '../messages';
import * as constants from './constants';
import { Axios } from 'utils/AxiosFunc';

export function* getList(payload) {
  console.log(payload);
  //const response = yield call(Axios.post, '/api/admin/v1/common/siteadminlist', payload);
  const response = yield call(Axios.post, '/apps/api/v1/bc/siteadminlist', payload);
  
  if (response.siteList !== null) {
    yield put({
      type: constants.SET_INFO_LIST,
      // payload: fromJS(response.siteList),
      payload: response.siteList,
    });
  } else {
    yield put({
      type: constants.SET_INFO_LIST,
      // payload: fromJS([]),
      payload: [],
    });
  }
}

export function* delRow(payload) {
 // const response = yield call(Axios.post, '/api/admin/v1/common/deletesite', payload);
 const response = yield call(Axios.post, '/apps/api/v1/bc/deletesite', payload);
  if (response.code === 200) {
    // 성공
    message.success(
      <MessageContent>
        {intlObj.get(messages.delComplete)}
      </MessageContent>,
      3,
    );
    yield put({
      type: constants.GET_INFO_LIST,
    });
  }
}

export default function* orgSage() {
  yield takeLatest(constants.GET_INFO_LIST, getList);
  yield takeLatest(constants.GET_DEL_ROW, delRow);
}
