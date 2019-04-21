import { takeLatest, put, call } from 'redux-saga/effects';
import * as actionType from './constants';

import { Axios } from '../../../../../utils/AxiosFunc';

export function* getOpinionData(payload) {
  const data = {
    PARAM: {
      TYPE: payload.sort ? payload.sort : '',
      PAGENUM: payload.pageNum ? payload.pageNum : 20,
    },
  };
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/getopinionlist', data);
  const list = response.result;

  yield put({ type: actionType.SET_OPINION_LIST, list });
}

export function* getOpinionSearchData(payload) {
  const data = {
    PARAM: {
      TYPE: payload.sortType,
      DATETYPE: payload.dateType,
      DATE: payload.date,
      KEYWORD: payload.keyword,
    },
  };
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/getopinionsearchlist', data);
  const list = response.result;

  yield put({ type: actionType.SET_OPINION_LIST, list });
}

export function* acceptApps(payload) {
  const data = {
    PARAM: {
      ID: payload.id,
      APPID: payload.appID,
      VER: payload.ver,
      DATE: payload.date,
    },
  };

  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/appaccept', data);

  if (response.result === 'success') {
    yield put({ type: actionType.GET_OPINION_LIST });
  }
}

export function* getOppoList() {
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/getoppolist');

  const list = response.result;

  yield put({ type: actionType.SET_OPPO_LIST, list });
}

export function* oppoApps(payload) {
  const data = {
    PARAM: {
      ID: payload.id,
      APPID: payload.appID,
      VER: payload.ver,
      COMMENT: payload.comment,
    },
  };

  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/appoppo', data);

  if (response.result === 'success') {
    yield put({ type: actionType.GET_OPINION_LIST });
  }
}

export function* comboList() {
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/getapprovallist');
  const list = response.result;

  if (list.length > 0) {
    yield put({ type: actionType.SET_COMBO_LIST, list });
  }
}

export default function* rootSaga() {
  yield takeLatest(actionType.GET_OPINION_LIST, getOpinionData);
  yield takeLatest(actionType.GET_OPINION_SEARCH_LIST, getOpinionSearchData);
  yield takeLatest(actionType.ACCEPT_APPS, acceptApps);
  yield takeLatest(actionType.GET_OPPO_LIST, getOppoList);
  yield takeLatest(actionType.OPPO_APPS, oppoApps);
  yield takeLatest(actionType.COMBO_LIST, comboList);
}
