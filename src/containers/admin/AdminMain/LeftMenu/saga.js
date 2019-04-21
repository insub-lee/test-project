import { takeLatest, put, call } from 'redux-saga/effects';
// import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* getMenu(payload) {
  const { SCRGRP_CD } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/store/getMenu', { SCRGRP_CD });
  // const response = yield call(Axios.post, '/api/admin/v1/common/getmenu', { SCRGRP_CD });
  const { menuList } = response;

  yield put({
    type: constants.SET_MENU,
    menuList,
  });
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_MENU, getMenu);
}
