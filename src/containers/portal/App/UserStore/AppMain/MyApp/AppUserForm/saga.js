import React from 'react';
import { takeLatest, call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import { intlObj } from 'utils/commonUtils';
import { Axios } from 'utils/AxiosFunc';
import messages from '../messages';
import * as constants from './constants';
/* eslint-disable */
export function* appUserSave(payload) {
  const { history } = payload.payload;
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/appUserSave/', payload.payload);
  const { code, appId, ver, appinfo } = response;

  if (code === 200) {
    // history.push('/store/appMain/MyApp');
    message.success(<MessageContent>{intlObj.get(messages.appUpdateOk)}</MessageContent>, 3);
    if (appinfo.APV_STATUS_CODE === 'S' || appinfo.APV_STATUS_CODE === 'C') {
      history.push(`/portal/store/appMain/MyApp/MyAppDetail/${appId}/${ver}`);
    } else {
      history.push(`/portal/store/appMain/MyApp/MyAppUpdate/U/${appId}/${ver}/3/N`);
    }
  } else if (code === 510) {
    feed.error(`${intlObj.get(messages.reqValFail)}`);
  } else if (code === 520) {
    feed.error(`${intlObj.get(messages.appIdFail)}`);
  } else if (code === 530) {
    feed.error(`${intlObj.get(messages.appStatus)}`);
  } else if (code === 540) {
    feed.error(`${intlObj.get(messages.serviceFormErorr)}`);
  } else if (code === 550) {
    feed.error(`${intlObj.get(messages.verUpdateFail)}`);
  } else if (code === 560) {
    feed.error(`${intlObj.get(messages.highVerPlease)}`);
  } else if (code === 570) {
    feed.error(`${intlObj.get(messages.lowVerNo)}`);
  } else if (code === 580) {
    feed.error(`${intlObj.get(messages.noSec)}`);
  } else {
    feed.error(`${intlObj.get(messages.appUpdateFail)}`);
  }
}

export function* getAppUser(payload) {
  const { history } = payload.payload;
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/appUser/', payload.payload);

  if (response.managerChk === 0) {
    feed.error(`${intlObj.get(messages.authChk)}`);
    history.push('/portal/store/appMain/MyApp');
  } else {
    yield put({ type: constants.APP_MANAGER_LIST, payload: fromJS(response.appmanager) });

    const userList = [];
    const dutyList = [];
    const pstnList = [];
    const grpList = [];
    const deptList = [];

    response.appSecList.map(item =>
      item.ACNT_TYPE === 'U'
        ? userList.push({
            USER_ID: item.ACNT_ID,
            EMP_NO: item.EMP_NO,
            NAME_KOR: item.NAME_KOR,
            NAME_ENG: item.NAME_ENG,
            NAME_CHN: item.NAME_CHN,
            NAME_JPN: item.NAME_JPN,
            NAME_ETC: item.NAME_ETC,
            DEPT_NAME_KOR: item.DEPT_NAME_KOR,
            DEPT_NAME_ENG: item.DEPT_NAME_ENG,
            DEPT_NAME_CHN: item.DEPT_NAME_CHN,
            DEPT_NAME_JPN: item.DEPT_NAME_JPN,
            DEPT_NAME_ETC: item.DEPT_NAME_ETC,
            PSTN_NAME_KOR: item.PSTN_NAME_KOR,
            PSTN_NAME_ENG: item.PSTN_NAME_ENG,
            PSTN_NAME_CHN: item.PSTN_NAME_CHN,
            PSTN_NAME_JPN: item.PSTN_NAME_JPN,
            PSTN_NAME_ETC: item.PSTN_NAME_ETC,
          })
        : '',
    );
    response.appSecList.map(item =>
      item.ACNT_TYPE === 'T'
        ? dutyList.push({
            id: item.ACNT_ID.toString(),
            NAME_KOR: item.NAME_KOR,
            NAME_ENG: item.NAME_ENG,
            NAME_CHN: item.NAME_CHN,
            NAME_JPN: item.NAME_JPN,
            NAME_ETC: item.NAME_ETC,
          })
        : '',
    );
    response.appSecList.map(item =>
      item.ACNT_TYPE === 'P'
        ? pstnList.push({
            id: item.ACNT_ID.toString(),
            NAME_ENG: item.NAME_ENG,
            NAME_CHN: item.NAME_CHN,
            NAME_JPN: item.NAME_JPN,
            NAME_ETC: item.NAME_ETC,
          })
        : '',
    );
    response.appSecList.map(item =>
      item.ACNT_TYPE === 'V'
        ? grpList.push({
            id: item.ACNT_ID.toString(),
            NAME_KOR: item.NAME_KOR,
            NAME_ENG: item.NAME_ENG,
            NAME_CHN: item.NAME_CHN,
            NAME_JPN: item.NAME_JPN,
            NAME_ETC: item.NAME_ETC,
          })
        : '',
    );
    response.appSecList.map(item =>
      item.ACNT_TYPE === 'D'
        ? deptList.push({
            id: item.ACNT_ID.toString(),
            NAME_KOR: item.NAME_KOR,
            NAME_ENG: item.NAME_ENG,
            NAME_CHN: item.NAME_CHN,
            NAME_JPN: item.NAME_JPN,
            NAME_ETC: item.NAME_ETC,
          })
        : '',
    );
    yield put({ type: constants.USER_LIST, payload: fromJS(userList) });
    yield put({ type: constants.DUTY_LIST, payload: fromJS(dutyList) });
    yield put({ type: constants.PSTN_LIST, payload: fromJS(pstnList) });
    yield put({ type: constants.GRP_LIST, payload: fromJS(grpList) });
    yield put({ type: constants.DEPT_LIST, payload: fromJS(deptList) });
  }
}

export default function* orgSage() {
  yield takeLatest(constants.APP_USER_SAVE, appUserSave);
  yield takeLatest(constants.GET_APP_USER, getAppUser);
}
