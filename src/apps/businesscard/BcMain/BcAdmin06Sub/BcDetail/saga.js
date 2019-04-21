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

export function* getBcInfo(payload) {
  const response = yield call(Axios.post, '/apps/api/v1/bc/siteadminlistdetail', payload);
  if (response.siteList !== null) {
    yield put({
      type: constants.SET_SITE_DETAIL,
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
  const response = yield call(Axios.post, '/apps/api/v1/bc/updateglobalmsgBc', payload);
  const { code } = response;
  if (code === 200) {
    message.success(`${intlObj.get(messages.udtComplete)}`, 2);
  } else {
    message.error(`${intlObj.get(messages.udtFail)}`, 2);
  }
}

export function* delGlobalMsg(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/apps/api/v1/bc/delglobalmsgBc', payload);
  const { code } = response;

  if (code === 200) {
    history.push(`/${basicPath.APPS}/businesscard/BcMain/BcaskinfoSub`);
    message.success(`${intlObj.get(messages.delComplete)}`, 2);
  } else if (code === 500) {
    message.error(`${intlObj.get(messages.delError)}`, 2);
  }
}

//승인(접수)
export function* CardStdCd_100(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/apps/api/v1/bc/CardStdCd_100', payload);
  const { code } = response;
  if (code === 200) {
    history.push(`/${basicPath.APPS}/businesscard/BcMain/BcAdmin06Sub`);
    message.success(`정상 처리 했습니다.`, 2);
  } else if (code === 500) {
    message.error(`저장중 오류입니다.`, 2);
  }
}

//발급취소
export function* CardStdCd_126(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/apps/api/v1/bc/CardStdCd_126', payload);
  const { code } = response;
  if (code === 200) {
    history.push(`/${basicPath.APPS}/businesscard/BcMain/BcAdmin06Sub`);
    message.success(`정상 처리 했습니다.`, 2);
  } else if (code === 500) {
    message.error(`저장중 오류입니다.`, 2);
  }
}

//발급보류
export function* CardStdCd_125(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/apps/api/v1/bc/CardStdCd_125', payload);
  const { code } = response;
  if (code === 200) {
    history.push(`/${basicPath.APPS}/businesscard/BcMain/BcAdmin06Sub`);
    message.success(`정상 처리 했습니다.`, 2);
  } else if (code === 500) {
    message.error(`저장중 오류입니다.`, 2);
  }
}

//수령완료
export function* CardStdCd_140(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/apps/api/v1/bc/CardStdCd_140', payload);
  const { code } = response;
  if (code === 200) {
    history.push(`/${basicPath.APPS}/businesscard/BcMain/BcAdmin06Sub`);
    message.success(`정상 처리 했습니다.`, 2);
  } else if (code === 500) {
    message.error(`저장중 오류입니다.`, 2);
  }
}

export default function* orgSage() {
 yield takeLatest(constants.GET_SITE_DETAIL, getBcInfo);
 yield takeLatest(constants.UDT_SITE_UPDATE, udtGlobalMsg);
 yield takeLatest(constants.DEL_GLOBAL_MSG, delGlobalMsg);
  //승인(접수)
 //yield takeLatest(constants.CARD_STD_CD_UPDATE100, CardStdCd_100);
 //발급취소
 yield takeLatest(constants.CARD_STD_CD_UPDATE126, CardStdCd_126);
 //발급보류
 yield takeLatest(constants.CARD_STD_CD_UPDATE125, CardStdCd_125);
 //수령완료
 yield takeLatest(constants.CARD_STD_CD_UPDATE140, CardStdCd_140);


}
