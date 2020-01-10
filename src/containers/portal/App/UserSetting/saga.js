import { call, put, takeLatest } from 'redux-saga/effects';
import { lang } from 'utils/commonUtils';
import * as routeConstants from 'containers/common/Routes/constants';
import {
  LOAD_LIST_SAGA,
  CHANGE_LIST_REDUCER,
  SAVE_MESSAGE_LIST_SAGA,
  LOAD_SKIN_SAGA,
  LOAD_SKIN_REDUCER,
  SAVE_ALL_SAGA,
  INSERT_NOTI_LIST,
  SAVE_SKIN_SAGA,
  LOAD_LANG_SAGA,
  LOAD_LANG_REDUCER,
  SAVE_LANG_SAGA,
  CHANGE_LOCALE,
  CHANGE_LANG_SAGA,
  CHANGE_LANG,
} from './constants';
import { Axios } from '../../../../utils/AxiosFunc';

export function* getAppNotiList() {
  const response = yield call(Axios.post, '/api/common/v1/account/appNotiList/');
  const resultValue = response.list;

  if (resultValue.length > 0) {
    yield put({ type: CHANGE_LIST_REDUCER, resultValue });
  }
}

export function* getSaveMessage(payload) {
  const data = {
    PARAM: {
      CHECKED: payload.data.item[0],
      STAT: payload.data.stat,
    },
  };

  const response = yield call(Axios.post, '/api/common/v1/account/appNotiSaveList/', data);

  if (response.result === 'success') {
    yield put({ type: LOAD_LIST_SAGA });
  }
}

export function* getLangList() {
  const response = yield call(Axios.post, '/api/common/v1/account/appSettingLang/');
  const resultValue = response;

  if (resultValue.lang.length > 0) {
    yield put({ type: LOAD_LANG_REDUCER, resultValue });
  }
}

export function* saveLang(payload) {
  const data = {
    PARAM: {
      LANG: payload.value,
    },
  };
  const result = yield call(Axios.post, '/api/common/v1/account/appNotiSaveLang/', data);

  if (result.result === 'success') {
    const response = yield call(Axios.post, '/api/common/v1/account/appSettingLang/');
    const resultValue = response;

    if (resultValue.lang.length > 0) {
      yield put({ type: LOAD_LANG_REDUCER, resultValue });
    }
  }
  if (result.LANG) {
    lang.setLang(result.LANG);
    yield put({
      type: CHANGE_LOCALE, // LanguageProvider로 가는 액션
      locale: lang.getLocale(),
    });
  }
}
export function* saveSkin(payload) {
  const data = {
    PARAM: {
      THEME: payload.value,
    },
  };
  const response = yield call(Axios.post, '/api/common/v1/account/appNotiSaveSkin/', data);

  if (response.result === 'success') {
    yield put({ type: routeConstants.LOAD_SKIN_SAGA });
  }
}

export function* saveAllMessage(payload) {
  const data = {
    PARAM: {
      CHECKED: payload.payload.data,
      STAT: payload.payload.stat,
    },
  };
  const response = yield call(Axios.post, '/api/common/v1/account/appNotiSaveAllList/', data);

  if (response.result === 'success') {
    yield put({ type: LOAD_LIST_SAGA });
  }
}

export default function* userSettingSaga() {
  yield takeLatest(LOAD_LIST_SAGA, getAppNotiList);
  yield takeLatest(SAVE_MESSAGE_LIST_SAGA, getSaveMessage);
  yield takeLatest(SAVE_ALL_SAGA, saveAllMessage);
  yield takeLatest(SAVE_SKIN_SAGA, saveSkin);
  yield takeLatest(LOAD_LANG_SAGA, getLangList);
  yield takeLatest(SAVE_LANG_SAGA, saveLang);
}
