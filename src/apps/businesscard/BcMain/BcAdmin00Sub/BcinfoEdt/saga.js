import React from 'react';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { intlObj } from 'utils/commonUtils';
import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import { basicPath } from 'containers/common/constants';
import messages from '../messages';
import * as constants from './constants';

//export function* getList(payload) {

export function* getBcInfo(payload) {
  
  console.log('#####################[getBcInfo #########....saga ]#######################');

  const response = yield call(Axios.post, '/apps/api/v1/bc/siteadminlistdetail', payload);
  
  if (response.siteList !== null) {
    yield put({
      type: constants.SET_SITE_DETAIL,
      //payload: fromJS(response.siteList),
      payload: response.siteList,
    });
  } else {
    yield put({
      type: constants.SET_SITE_DETAIL,
      payload: fromJS([]),
    });
  }
}

export function* udtGlobalMsg(payload) {
  const { history } = payload;
  //const response = yield call(Axios.post, '/api/admin/v1/common/updateglobalmsg', payload);
  const response = yield call(Axios.post, '/apps/api/v1/bc/updateglobalmsgBc', payload);
  const { code } = response;
  if (code === 200) {
    history.push(`/${basicPath.APPS}/businesscard/BcMain/BcAdmin00Sub`);
    message.success(`${intlObj.get(messages.udtComplete)}`, 2);
  } else {
    message.error(`${intlObj.get(messages.udtFail)}`, 2);
  }
}


export default function* orgSage() {
 yield takeLatest(constants.GET_SITE_DETAIL, getBcInfo);
 yield takeLatest(constants.UDT_SITE_UPDATE, udtGlobalMsg);
}
