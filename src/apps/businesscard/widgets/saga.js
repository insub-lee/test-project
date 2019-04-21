import React from 'react';
import { intlObj } from 'utils/commonUtils';
import { put, takeLatest, call } from 'redux-saga/effects';
// import { fromJS } from 'immutable';
import * as constants from './constants';
import { Axios } from 'utils/AxiosFunc';
import { handleSaveBusinessCardRequest } from './actions';
import * as feed from '../../../components/Feedback/functions';

export function* getList(payload) {
  //const response = yield call(Axios.post, '/api/admin/v1/common/siteadminlist', payload);
  const response = yield call(Axios.post, '/apps/api/v1/bc/siteadminlist', payload);
  
  if (response.siteList !== null) {
    yield put({
      type: constants.SET_INFO_LIST,
      // payload: fromJS(response.siteList),
      // payload: response.siteList.list,
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

export function* getUserInfoList() {
  const response = yield call(Axios.post, '/apps/api/v1/bc/getUserInfoList');
  
  if (response.userInfoList !== null) {
    yield put({
      type: constants.SET_USER_INFO_LIST,
      userInfoList: response.userInfoList,
    });
  } else {
    yield put({
      type: constants.SET_USER_INFO_LIST,
      userInfoList: [],
    });
  }
}

export function* saveBusinessCardRequest(payload) {
  //let data = yield call(Axios.post, '/apps/api/v1/bookroom/saveFavRoom', payload.payload);
  //let data = yield call(Axios.post, '/apps/api/v1/bookroom/saveApprovalBook', getUserInfoRow);  
  let data = yield call(Axios.post, '/apps/api/v1/bc/saveBusinessCardRequest', payload);  
  console.log('################', data);
  console.log('################', data.code);
  const result = data.code;
  if (result === 200) {
    feed.success("신청이 완료되었습니다."); 
  }
  else {
    feed.error("신청이 실패했습니다.");
  }

  yield put({
    type: constants.GET_INFO_LIST,
    pageType: 'widget',    
  });
}

export default function* orgSage() {
  yield takeLatest(constants.GET_INFO_LIST, getList);
  yield takeLatest(constants.GET_USER_INFO_LIST, getUserInfoList);
  yield takeLatest(constants.SAVE_BC_REQST, saveBusinessCardRequest);
}
