import { takeLatest, put, select, call } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';
import { setFlatKey, getTreeFromFlatTreeData, getFlatMapDataFromTreeData } from 'containers/common/functions/treeFunc';
import * as loadingActions from 'containers/common/Loading/actions';

import * as selectors from './selectors';
import * as constants from './constants';
import * as actions from './actions';

/* 초기 페이지 데이터 세팅 */
function* initPage({ id }) {
  console.debug('>>>>>>>>>Cc: ', id);
  const oldMenuList = yield select(selectors.makeMenuList());
  if (oldMenuList.size === 0) {
    const response = yield call(Axios.get, '/api/bizstore/v1/menuCard/getMenuTree', { id });
    console.debug('>>>>>>>>>response: ', response);
    const menuListFlatData = [];

    // const menuListFlatData = getFlatMapDataFromTreeData(getTreeFromFlatTreeData(setFlatKey(result, ''), rootId));

    yield put(actions.setMenuList(menuListFlatData));
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_MENU_INIT_PAGE, initPage);
}
