import React from 'react';
import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import { intlObj } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as feed from 'components/Feedback/functions';
import * as constantsLoading from 'containers/common/Loading/constants';
import * as constants from './constants';

export function* getBizMenuAuthInfo(payload) {
  const { BIZGRP_ID, MENU_ID } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/bizMenuAuthInfo', { BIZGRP_ID, MENU_ID });
  const { bizMenuAuthInfo } = response;

  if (bizMenuAuthInfo) {
    yield put({
      type: constants.SET_BIZMENU_AUTH_INFO,
      bizMenuAuthInfo: fromJS(bizMenuAuthInfo),
    });
  }

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
}

export function* updateBizMenuAuth(payload) {
  const { dataList, BIZGRP_ID, MENU_ID, INHERIT } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/updateBizMenuAuth', { dataList, BIZGRP_ID, MENU_ID, INHERIT });
  const { code, bizMenuAuthInfo } = response;

  if (code === 200) {
    // message.success(<MessageContent>{intlObj.get(messages.dutyInsert)}</MessageContent>, 3);
    message.success(<MessageContent>수정 되었습니다.</MessageContent>, 3);
    if (bizMenuAuthInfo) {
      yield put({
        type: constants.SET_BIZMENU_AUTH_INFO,
        bizMenuAuthInfo: fromJS(bizMenuAuthInfo),
      });
    }

    /* TODO 변경후 확정 버튼 활성화 필요
    yield put({
      type: constantsBizManage.UPDATE_TREENODE,
      key: Number(BIZGRP_ID),
      newNode: { CHG_YN: 'Y' },
    });
    */
  } else {
    // feed.error(`${intlObj.get(messages.dutyInsertFail)}`);
    feed.error('수정에 실패 하였습니다.');
    /*
    yield put({
      type: constants.GET_BIZ_AUTH_INFO,
      BIZGRP_ID,
      MENU_ID,
    });
    */
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_BIZMENU_AUTH_INFO, getBizMenuAuthInfo);
  yield takeLatest(constants.UPDATE_BIZMENU_AUTH, updateBizMenuAuth);
}
