import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as feed from 'components/Feedback/functions';
import { intlObj, lang } from 'utils/commonUtils';
import messages from '../messages';

import * as constants from './constants';
import { Axios } from 'utils/AxiosFunc';

export function* reqAppScreenshotList(payload) {
  const response = yield call(Axios.post, '/api/bizstore/v1/store/appscreenshot/', payload.payload);

  yield put({
    type: constants.RES_APP_SCREENSHOT_LIST,
    payload: fromJS(response.appScreenshotList),
  });

  yield put({
    type: constants.RES_APP_EXPLAIN,
    payload: response.appInfo,
  });

  yield put({
    type: constants.RES_REQUIRED_APP_LIST,
    payload: fromJS(response.reqAppList),
  });

  yield put({
    type: constants.RES_RECOM_APP_LIST,
    payload: fromJS(response.recomAppList),
  });
}

export function* registApp(payload) {
  const { REF_APP_ID, APP_ID } = payload;
  const param = { appId: String(APP_ID) };

  const response = yield call(Axios.post, '/api/bizstore/v1/mypage/registApp', {
    APP_ID: REF_APP_ID,
    PRNT_ID: -1,
    langGubun: lang.getLocale(),
  });
  const { code } = response;

  if (code === 200) {
    feed.success(`${intlObj.get(messages.appInputSuccess)}`);

    yield put({
      type: constants.REQ_APP_SCREENSHOT_LIST,
      payload: param,
    });
  } else if (code === 500) {
    feed.error(`${intlObj.get(messages.appInputError)}`);
  }
}

export function* registCategory(payload) {
  const { REF_APP_ID, APP_ID } = payload;
  const param = { appId: String(APP_ID) };

  const response = yield call(Axios.post, '/api/bizstore/v1/mypage/registCategory', { APP_ID: REF_APP_ID, PRNT_ID: -1, langGubun: lang.getLocale() });
  const { code } = response;

  if (code === 200) {
    feed.success(`${intlObj.get(messages.appInputSuccess)}`);

    yield put({
      type: constants.REQ_APP_SCREENSHOT_LIST,
      payload: param,
    });
  } else if (code === 500) {
    feed.error(`${intlObj.get(messages.appInputError)}`);
  }
}

export default function* orgSage() {
  yield takeLatest(constants.REQ_APP_SCREENSHOT_LIST, reqAppScreenshotList);
  yield takeLatest(constants.REGIST_APP, registApp);
  yield takeLatest(constants.REGIST_CATEGORY, registCategory);
}
