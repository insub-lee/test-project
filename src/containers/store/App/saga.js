import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* getMenu(payload) {
  const { SCRGRP_CD } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/store/getMenu', { SCRGRP_CD });
  const { menuList } = response;

  if (menuList) {
    yield put({
      type: constants.SET_MENU,
      menuList: fromJS(menuList),
    });
  }
}

export function* menuAuthChk(payload) {
  const { pathname, history, SCRGRP_CD } = payload.payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/store/menuAuthChk', { pathname, SCRGRP_CD });

  if (!response.menuAuthChk) {
    history.push('/store/appMain/errorPage');
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_MENU, getMenu);
  yield takeLatest(constants.MENU_AUTH_CHK, menuAuthChk);
}
