// import { put, takeLatest } from 'redux-saga/effects';
import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as feed from 'components/Feedback/functions';
import { intlObj, lang } from 'utils/commonUtils';
import messages from '../messages';

import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';

export function* reqAppBasicInfo(payload) {
  const response = yield call(Axios.post, '/api/bizstore/v1/store/appbasicinfo/', payload.payload);

  if (response.appInfo !== null) {
    yield put({ type: constants.RES_APP_BASIC_INFO, payload: response.appInfo });
  } else {
    yield put({ type: constants.RES_APP_BASIC_INFO, payload: fromJS({}) });
  }

  if (response.appProcess !== null) {
    yield put({ type: constants.APP_PROCESS, payload: response.appProcess });
  } else {
    yield put({ type: constants.APP_PROCESS, payload: fromJS([]) });
  }

  if (response.appManual !== null) {
    yield put({ type: constants.APP_MANUAL, payload: response.appManual });
  } else {
    yield put({ type: constants.APP_MANUAL, payload: fromJS([]) });
  }

  yield put({ type: constants.APP_MANAGER_LIST, payload: fromJS(response.appManagerList) });
}

export function* registApp(payload) {
  const { APP_ID } = payload;
  const param = { appId: String(APP_ID) };
  const langGubun = lang.getLocale();

  const response = yield call(Axios.post, '/api/bizstore/v1/mypage/registApp', { APP_ID, PRNT_ID: -1, langGubun });
  const { code } = response;

  if (code === 200) {
    feed.success(`${intlObj.get(messages.appInputSuccess)}`);

    yield put({
      type: constants.REQ_APP_BASIC_INFO,
      payload: param,
    });
  } else if (code === 500) {
    feed.error(`${intlObj.get(messages.appInputError)}`);
  }
}

export function* registCategory(payload) {
  const { APP_ID } = payload;
  const param = { appId: String(APP_ID) };
  const langGubun = lang.getLocale();

  const response = yield call(Axios.post, '/api/bizstore/v1/mypage/registCategory', { APP_ID, PRNT_ID: -1, langGubun });
  const { code } = response;

  if (code === 200) {
    feed.success(`${intlObj.get(messages.appInputSuccess)}`);

    yield put({
      type: constants.REQ_APP_BASIC_INFO,
      payload: param,
    });
  } else if (code === 500) {
    feed.error(`${intlObj.get(messages.appInputError)}`);
  }
}

export default function* appBasicInfoSage() {
  yield takeLatest(constants.REQ_APP_BASIC_INFO, reqAppBasicInfo);
  yield takeLatest(constants.REGIST_APP, registApp);
  yield takeLatest(constants.REGIST_CATEGORY, registCategory);
}
