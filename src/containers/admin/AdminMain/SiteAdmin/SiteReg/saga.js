import React from 'react';
import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { intlObj } from 'utils/commonUtils';
// import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import messages from '../messages';

import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';

export function* chkName(payload) {
  console.log(payload);
  const response = yield call(Axios.post, '/api/admin/v1/common/siteadminlist', payload);

  if (response.siteList.length !== 0) {
    if (payload.keywordType === 'NAME_KOR_CHK') {
      yield put({
        type: constants.SET_SITE_NAME_KOR,
        payload: true, // fromJS(response.siteList),
      });
    } else if (payload.keywordType === 'NAME_CHN_CHK') {
      yield put({
        type: constants.SET_SITE_NAME_CHN,
        payload: true, // fromJS(response.siteList),
      });
    } else if (payload.keywordType === 'NAME_ENG_CHK') {
      yield put({
        type: constants.SET_SITE_NAME_ENG,
        payload: true, // fromJS(response.siteList),
      });
    }
    // // 중복
  } else if (response.siteList.length === 0) {
    // 성공
    if (payload.keywordType === 'NAME_KOR_CHK') {
      yield put({
        type: constants.SET_SITE_NAME_KOR,
        payload: false, // fromJS(response.siteList),
      });
    } else if (payload.keywordType === 'NAME_CHN_CHK') {
      yield put({
        type: constants.SET_SITE_NAME_CHN,
        payload: false, // fromJS(response.siteList),
      });
    } else if (payload.keywordType === 'NAME_ENG_CHK') {
      yield put({
        type: constants.SET_SITE_NAME_ENG,
        payload: false, // fromJS(response.siteList),
      });
    }
  }
}

export function* chkUrl(payload) {
  console.log(payload);
  const response = yield call(Axios.post, '/api/admin/v1/common/siteadminlist', payload);

  if (response.siteList.length !== 0) {
    // // 중복
    yield put({
      type: constants.SET_SITE_URL,
      payload: true, // fromJS(response.siteList),
    });
  } else {
    // 성공
    yield put({
      type: constants.SET_SITE_URL,
      payload: false, // fromJS(response.siteList),
    });
  }
}

export function* registSite(payload) {
  const { history } = payload;

  const response = yield call(Axios.post, '/api/admin/v1/common/registsite', payload);

  if (response.code === 200) {
    // const siteId = parseInt(response.SITE_ID, 10);

    history.push({ pathname: '/admin/adminmain/siteadmin/SiteDetail', search: 'D', state: { SITE_ID: parseInt(response.SITE_ID, 10) } });
    // history.push(`/admin/adminmain/siteadmin/SiteDetail/${response.SITE_ID}`);

    // 성공
    message.success(<MessageContent>{intlObj.get(messages.regComplete)}</MessageContent>, 3);

    // yield put({
    //   type: constants.SET_SITE_DETAIL,
    // });
  }
}

export function* getHomeList() {
  const response = yield call(Axios.post, '/api/admin/v1/common/getbizgrplist', { SITE_ID: 1 });
  const resultValue = response;

  if (resultValue.bizGrpList.length > 0) {
    yield put({ type: constants.SET_HOME, payload: fromJS(resultValue.bizGrpList) });
  }
}

export function* getSkinList() {
  const response = yield call(Axios.post, '/api/common/v1/account/appSettingTheme/');
  const resultValue = response;

  if (resultValue.theme.length > 0) {
    yield put({ type: constants.SET_SKIN, payload: fromJS(resultValue.theme) });
  }
}

export function* getDefaultList() {
  const response = yield call(Axios.post, '/api/admin/v1/common/getdefault');
  // alert(`fromJS(response.code) >>> ${fromJS(response.code)}`);
  // alert(`fromJS(response.defaultList) >>> ${fromJS(response.defaultList)}`);
  // alert(`response.defaultList.length >>> ${response.defaultList.size}`);

  // if (response.defaultList.length > 0) {
  if (response.code === 200) {
    yield put({ type: constants.SET_DEFAULT, payload: fromJS(response.defaultList) });

    yield put({
      type: constants.SET_MENU_TYPE_LIST,
      menuLayoutList: response.menuLayoutList || fromJS([]),
      menuCompList: response.menuCompList || fromJS([]),
    });
  } else {
    yield put({ type: constants.SET_DEFAULT, payload: fromJS([]) });
  }
}

export function* getLangList() {
  const response = yield call(Axios.post, '/api/common/v1/account/appSettingLang/');
  const resultValue = response;

  if (resultValue.lang.length > 0) {
    yield put({ type: constants.SET_LANG, resultValue });
  }
}

export default function* orgSage() {
  yield takeLatest(constants.GET_SITE_NAME, chkName);
  yield takeLatest(constants.GET_SITE_URL, chkUrl);
  yield takeLatest(constants.GET_SITE_DETAIL, registSite);
  yield takeLatest(constants.GET_HOME, getHomeList);
  yield takeLatest(constants.GET_SKIN, getSkinList);
  yield takeLatest(constants.GET_DEFAULT, getDefaultList);
  yield takeLatest(constants.GET_LANG, getLangList);
}
