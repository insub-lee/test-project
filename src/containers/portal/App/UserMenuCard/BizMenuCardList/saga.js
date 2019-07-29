import { takeLatest, put, select, call } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';
import { setFlatKey, getTreeFromFlatTreeData, getFlatMapDataFromTreeData } from 'containers/common/functions/treeFunc';
import * as loadingActions from 'containers/common/Loading/actions';

import * as selectors from './selectors';
import * as constants from './constants';
import * as actions from './actions';

const appBlockSize = 20;
const appBlockSizeAll = 8;

/* 초기 페이지 데이터 세팅 */
function* initPage({ id, pageType }) {
  yield put(actions.loadingOn());
  let response = {};
  if (pageType === 'myMenu') {
  } else {
    response = yield call(Axios.post, '/api/bizstore/v1/store/getMenuCardTree', { id });
  }

  yield put(actions.setMenuList(response.menuList, response.parentMenu));
  yield put(actions.loadingOff());
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_MENU_INIT_PAGE, initPage);
}
