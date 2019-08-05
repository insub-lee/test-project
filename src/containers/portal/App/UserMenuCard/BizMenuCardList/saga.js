import { takeLatest, put, call } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as constants from './constants';
import * as actions from './actions';

/* 초기 페이지 데이터 세팅 */
function* initPage({ id, pageType }) {
  yield put(actions.loadingOn());

  const response = yield call(Axios.post, '/api/bizstore/v1/store/getMenuCardTree', { id, pageType });

  yield put(actions.setMenuList(response.menuList, response.parentMenu));
  yield put(actions.loadingOff());
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_MENU_INIT_PAGE, initPage);
}
