import { takeLatest, put, call } from 'redux-saga/effects';
// import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* getMenu(payload) {
  const { SCRGRP_CD } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/store/getMenu', { SCRGRP_CD });
  // const response = yield call(Axios.post, '/api/admin/v1/common/getmenu', { SCRGRP_CD });
  const { menuList } = response;
  let menu = [];
  if (menuList && menuList.length > 0) {
    if (menuList[0].SORT_SQ < 1000) {
      menu = menuList;
    } else {
      menuList.map(item => {
        const sortSeq = Number(item.SORT_SQ);
        if (sortSeq % 100 === 0) {
          menu.push(item);
        } else {
          const m = menu[menu.length - 1];
          if (sortSeq % 100 === 1) {
            m.child = [];
          }
          m.child.push(item);
        }
      });
    }
  }

  yield put({
    type: constants.SET_MENU,
    menuList: menu,
  });
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_MENU, getMenu);
}
