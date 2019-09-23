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

  try {
    if (menuList && menuList.length > 0) {
      if (menuList[0].SORT_SQ < 100) {
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
  } catch (error) {
    console.error(error);
    menu = menuList;
  }

  yield put({
    type: constants.SET_MENU,
    menuList: menu,
  });
}

export function* menuAuthChk(payload) {
  const { pathname, history, SCRGRP_CD } = payload.payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/store/menuAuthChk', { pathname, SCRGRP_CD });

  if (!response.menuAuthChk) {
    history.push('/error');
  }
}
export default function* rootSaga() {
  yield takeLatest(constants.GET_MENU, getMenu);
  yield takeLatest(constants.MENU_AUTH_CHK, menuAuthChk);
}
