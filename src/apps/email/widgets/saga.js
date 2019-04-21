import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as actionType from './constants';
import { Axios } from '../../../utils/AxiosFunc';

export function* getMailList(payload) {
  const resultValue = yield call(Axios.post, '/apps/api/v1/email/emailList', payload);
}

export function* getMail(payload) {

   if (payload) {
    //  alert(`resultValue >>> ${fromJS(payload.resultArray)}`);

     yield put({
       type: actionType.SET_MAILLIST,
       // payload: fromJS(resultValue),
       payload: fromJS(payload.resultArray),
     });
   }
 }

export function* deleteMail(payload) {
  const { item } = payload;
  const id = 123
  const data = {
    PARAM: {
      ITEM: item,
      WIDGETID: id,
    },
  };

  const response = yield call(Axios.post, '/api/portal/v1/page/deleteMail/', data);

  if (response.result === 'success') {
    yield put({ type: actionType.GET_MAILLIST_SAGA, id });
  }
}

export default function* mailSaga() {
  yield takeLatest(actionType.GET_MAILLIST_SAGA, getMailList);
  yield takeLatest(actionType.DELETE_MAIL_SAGA, deleteMail);
  yield takeLatest('notify/EML0035', getMail);
  
}
