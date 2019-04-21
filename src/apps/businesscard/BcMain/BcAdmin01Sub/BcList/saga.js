import React from 'react';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { intlObj } from 'utils/commonUtils';
import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import messages from '../messages';
import * as constants from './constants';
import { Axios } from 'utils/AxiosFunc';

export function* getList(payload) {

  //const response = yield call(Axios.post, '/api/admin/v1/common/siteadminlist', payload);
  const response = yield call(Axios.post, '/apps/api/v1/bc/BcAdminList01', payload);
  
  if (response.siteList01 !== null) {
    yield put({
      type: constants.SET_INFO_LIST,
      payload: fromJS(response.siteList01),
    });
  } else {
    yield put({
      type: constants.SET_INFO_LIST,
      payload: fromJS([]),
    });
  }
}

export function* delRow(payload) {
 // const response = yield call(Axios.post, '/api/admin/v1/common/deletesite', payload);
 //const response = yield call(Axios.post, '/apps/api/v1/bc/deletesite', payload);
 const response = yield call(Axios.post, '/apps/api/v1/bc/CardStdCd_100', payload);

  if (response.code === 200) {
   // history.push('/apps/businesscard/BcMain/BcAdmin01Sub');
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

 
 export function* delRow100(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/apps/api/v1/bc/CardStdCd_100', payload);
  const { code } = response;
  if (code === 200) {
   // history.push('/apps/businesscard/BcMain/BcAdmin01Sub');
    message.success(`정상 처리 했습니다.`, 2);
  } else if (code === 500) {
    message.error(`저장중 오류입니다.`, 2);
  }
}

export function* delRow126(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/apps/api/v1/bc/CardStdCd_126', payload);
  const { code } = response;
  if (code === 200) {
  //  history.push('/apps/businesscard/BcMain/BcAdmin01Sub');
    message.success(`정상 처리 했습니다.`, 2);
  } else if (code === 500) {
    message.error(`저장중 오류입니다.`, 2);
  }
}

export function* delRow125(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/apps/api/v1/bc/CardStdCd_125', payload);
  const { code } = response;
  if (code === 200) {
  //  history.push('/apps/businesscard/BcMain/BcAdmin01Sub');
    message.success(`정상 처리 했습니다.`, 2);
  } else if (code === 500) {
    message.error(`저장중 오류입니다.`, 2);
  }
}



export default function* orgSage() {
  yield takeLatest(constants.GET_DEL_ROW, delRow);
  yield takeLatest(constants.GET_STD_ROW100, delRow100);
  yield takeLatest(constants.GET_STD_ROW126, delRow126);  
  yield takeLatest(constants.GET_STD_ROW125, delRow125);  
  yield takeLatest(constants.GET_INFO_LIST, getList);
}
