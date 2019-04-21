import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as feed from 'components/Feedback/functions';
import * as treeFunc from 'containers/common/functions/treeFunc';

import { Axios } from 'utils/AxiosFunc';
import * as constantsTree from 'containers/store/components/BizCategory/constants';
import * as constants from './constants';

export function* getBizMenu(payload) {
  const { key, history } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/store/bizmenu', { BIZGRP_ID: Number(key) });
  const { result, rootId } = response;
  // get menuId by appId or pageId
  let selectedIndex = -1;

  if (result.length > 1) {
    const bizMenuData = result[0];
    let children = treeFunc.setFlatDataKey(result, 'MENU_ID');
    children = treeFunc.getTreeFromFlatTreeData(children, rootId);
    bizMenuData.children = children;

    const { location } = history;
    const { pathname } = location; // /store/appMain/bizStore/biz/detail/app(page)/1421/3
    const paths = pathname.split('/');
    const id = Number(paths[paths.length - 1]);
    const type = history.location.pathname.indexOf('/app/') > -1 ? 'app' : 'page';

    const bizmenuFlatData = treeFunc.getFlatMapDataFromTreeData(children);
    bizmenuFlatData.map((obj) => {
      if ((type === 'page' && id === obj.PAGE_ID)
        || (type === 'app' && id === obj.APP_ID)
      ) {
        selectedIndex = obj.MENU_ID;
      }
      return '';
    });

    yield put({
      type: constants.SET_BIZMENU_DATA,
      bizMenuData: fromJS(bizMenuData),
      selectedIndex,
    });
  } else {
    yield put({
      type: constants.SET_BIZMENU_DATA,
      bizMenuData: fromJS({}),
      selectedIndex,
    });
  }

  yield put({
    type: constantsTree.SET_SELECTED_INDEX,
    selectedIndex: key,
  });
}

export function registerBiz() {
  feed.warning('준비중입니다.');
}

export default function* rootSaga() {
  yield takeLatest(constants.REGISTER_BIZ, registerBiz);

  yield takeLatest(constants.GET_BIZMENU, getBizMenu);
}
