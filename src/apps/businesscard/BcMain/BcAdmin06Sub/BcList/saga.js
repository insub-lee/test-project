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
  const response = yield call(Axios.post, '/apps/api/v1/bc/BcAdminList06', payload);  
  if (response.siteList06 !== null) {
    yield put({
      type: constants.SET_INFO_LIST,
      payload: fromJS(response.siteList06),
    });
  } else {
    yield put({
      type: constants.SET_INFO_LIST,
      payload: fromJS([]),
    });
  }
}

export function* delRow125(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/apps/api/v1/bc/CardStdCd_125', payload);
  const { code } = response;
  if (code === 200) {
     message.success(`정상 처리 했습니다.`, 2);
  } else if (code === 500) {
    message.error(`저장중 오류입니다.`, 2);
  }
}

export function* delRow130(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/apps/api/v1/bc/CardStdCd_130', payload);
  const { code } = response;
  if (code === 200) {
     message.success(`정상 처리 했습니다.`, 2);
  } else if (code === 500) {
    message.error(`저장중 오류입니다.`, 2);
  }
}

export function* delRow140(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/apps/api/v1/bc/CardStdCd_140', payload);
  const { code } = response;
  if (code === 200) {
     message.success(`정상 처리 했습니다.`, 2);
  } else if (code === 500) {
    message.error(`저장중 오류입니다.`, 2);
  }
}

export function* delRow120(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/apps/api/v1/bc/CardStdCd_120', payload);
  const { code } = response;
  if (code === 200) {
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
     message.success(`정상 처리 했습니다.`, 2);
  } else if (code === 500) {
    message.error(`저장중 오류입니다.`, 2);
  }
}

export default function* orgSage() {
 // yield takeLatest(constants.GET_DEL_ROW, delRow);
 // yield takeLatest(constants.GET_STD_ROW100, delRow100);
 // yield takeLatest(constants.GET_STD_ROW126, delRow126);    // 취소처리
  yield takeLatest(constants.GET_STD_ROW125, delRow125);      // 발급보류처리
 // yield takeLatest(constants.GET_STD_ROW130, delRow130);  
 // yield takeLatest(constants.GET_STD_ROW140, delRow140);  
 // yield takeLatest(constants.GET_STD_ROW120, delRow120);    //발급재개
  yield takeLatest(constants.GET_INFO_LIST, getList);
}
