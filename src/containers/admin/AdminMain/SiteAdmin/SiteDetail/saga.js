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

export function* getSiteInfo(payload) {
  // const result1 = fakeDataList1.slice();
  const response = yield call(Axios.post, '/api/admin/v1/common/siteadminlistdetail', payload);
  if (response.siteList !== null && response.secListI !== null && response.secListV !== null) {
    yield put({
      type: constants.SET_SITE_DETAIL,
      // payload: fromJS(response.siteList),
      payload: response.siteList,
    });

    // response.put('title', response.get('TITLE'));
    yield put({
      type: constants.SET_SITE_SEC_I,
      payload: fromJS(response.secListI),
    });

    yield put({
      type: constants.SET_SITE_SEC_V,
      payload: fromJS(response.secListV),
      // payload: fromJS(response.secListV),
    });
  } else {
    yield put({
      type: constants.SET_SITE_DETAIL,
      payload: fromJS([]),
    });
    yield put({
      type: constants.SET_SITE_SEC_I,
      payload: fromJS([]),
    });
    yield put({
      type: constants.SET_SITE_SEC_V,
      payload: fromJS([]),
    });
  }
  yield put({
    type: constants.SET_MENU_TYPE_LIST,
    menuLayoutList: response.menuLayoutList || fromJS([]),
    menuCompList: response.menuCompList || fromJS([]),
  });
}

export function* chkName(payload) {
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

export function* updateSite(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/updatesite', payload);

  if (response.code === 200) {
    // 성공
    message.success(<MessageContent>{intlObj.get(messages.udtComplete)}</MessageContent>, 3);

    // yield put({
    //   type: constants.SET_SITE_UPDATE,
    // });
  }
}

export function* delSite(payload) {
  const { history } = payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/deletesite', payload);

  if (response.code === 200) {
    history.push('/admin/adminmain/siteadmin');
    // 성공
    message.success(<MessageContent>{intlObj.get(messages.delComplete)}</MessageContent>, 3);
  }
}

export function* getHomeList(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/getbizgrplist', payload);
  const resultValue = response;

  if (resultValue.bizGrpList.length > 0) {
    yield put({ type: constants.SET_HOME, payload: fromJS(resultValue.bizGrpList) });
  } else {
    yield put({ type: constants.SET_HOME, payload: fromJS([]) });
  }
}

export function* getSkinList() {
  const response = yield call(Axios.post, '/api/common/v1/account/appSettingTheme/');
  const resultValue = response;

  if (resultValue.theme.length > 0) {
    yield put({ type: constants.SET_SKIN, payload: fromJS(resultValue.theme) });
  } else {
    yield put({ type: constants.SET_SKIN, payload: fromJS([]) });
  }
}

export default function* orgSage() {
  yield takeLatest(constants.GET_SITE_DETAIL, getSiteInfo);
  yield takeLatest(constants.GET_SITE_NAME, chkName);
  yield takeLatest(constants.GET_SITE_URL, chkUrl);
  yield takeLatest(constants.GET_HOME, getHomeList);
  yield takeLatest(constants.GET_SKIN, getSkinList);
  yield takeLatest(constants.GET_DEL_ROW, delSite);
  yield takeLatest(constants.GET_SITE_UPDATE, updateSite);
}
