import { takeLatest, put, select, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as treeFunc from 'containers/common/functions/treeFunc';
// import * as feed from 'components/Feedback/functions';
import { lang } from 'utils/commonUtils';
import { Axios } from 'utils/AxiosFunc';

import * as constantsTree from 'containers/store/components/BizCategory/constants';
import * as constantsMyPage from '../../MyPage/constants';
import * as constants from './constants';

/* 앱리스트 ONE - 한 카테고리의 앱리스트 + 하위카테고리 */
export function* getMapList(payload) {
  const { key } = payload;
  const BIZGRP_ID = Number(key);

  const response = yield call(Axios.post, '/api/bizstore/v1/store/bizmenuList', {
    BIZGRP_ID,
  });
  const { result } = response;

  let map = fromJS({ key: BIZGRP_ID });
  map = map.set('appList', fromJS(result));

  yield put({
    type: constants.SET_MAPLIST,
    mapList: fromJS([map]),
  });

  yield put({
    type: constantsTree.SET_SELECTED_INDEX,
    selectedIndex: BIZGRP_ID,
  });
}

// 성공 시 사용중으로 상태 변경.
function changeWGCount(mapList, APP_ID, WG_COUNT) {
  const matchMapIndex = 0;
  let matchAppIndex = 0;

  const matchAppList = mapList.get(0).get('appList');

  matchAppList.filter((map, i) => {
    if (map.get('APP_ID') === APP_ID) {
      matchAppIndex = i;
      return true;
    }
    return false;
  });

  return mapList.setIn([matchMapIndex, 'appList', matchAppIndex, 'WG_COUNT'], WG_COUNT);
}

/* 앱 등록 */
export function* registApp(payload) {
  const { APP_ID } = payload;
  const langGubun = lang.getLocale();
  const store = yield select(state => state.get('bizmenuList'));
  const url = '/api/bizstore/v1/mypage/registApp';

  const response = yield call(Axios.post, url, { APP_ID, PRNT_ID: -1, langGubun });
  const { code, resultCategoryData } = response;

  if (code === 200) {
    // update Tree
    const parentStore = yield select(state => state.get('mypage'));

    const result = JSON.parse(`[${resultCategoryData.join('')}]`); // response.result -> json string 배열
    const newCategoryData = result[0].children;
    const oldCategoryData = parentStore.get('categoryData').toJS();

    treeFunc.mergeArray(newCategoryData, oldCategoryData);

    yield put({
      type: constantsMyPage.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
    });

    // 성공 시 사용중으로 상태 변경.
    const mapList = changeWGCount(store.get('mapList'), APP_ID, 1);

    yield put({ type: constants.SET_MAPLIST, mapList });
  } else if (code === 500) {
    // feed.error(`${intlObj.get(messages.appInputError)}`);
  }
}

/* 카테고리 포함 앱 등록 */
export function* registCategory(payload) {
  const { APP_ID } = payload;
  const langGubun = lang.getLocale();
  const store = yield select(state => state.get('bizmenuList'));
  const url = '/api/bizstore/v1/mypage/registCategory';

  const response = yield call(Axios.post, url, { APP_ID, PRNT_ID: -1, langGubun });
  const { code, resultCategoryData } = response;

  if (code === 200) {
    // update Tree
    const parentStore = yield select(state => state.get('mypage'));

    const result = JSON.parse(`[${resultCategoryData.join('')}]`); // response.result -> json string 배열
    const newCategoryData = result[0].children;
    const oldCategoryData = parentStore.get('categoryData').toJS();

    treeFunc.mergeArray(newCategoryData, oldCategoryData);

    yield put({
      type: constantsMyPage.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
    });

    // 성공 시 사용중으로 상태 변경.
    const mapList = changeWGCount(store.get('mapList'), APP_ID, 1);

    yield put({ type: constants.SET_MAPLIST, mapList });
  } else if (code === 500) {
    // feed.error(`${intlObj.get(messages.appInputError)}`);
  }
}

export function* updateChangeWGCount(payload) {
  const { APP_ID, WG_COUNT } = payload;
  // 성공 시 사용중으로 상태 변경.
  const store = yield select(state => state.get('bizmenuList'));
  const mapList = changeWGCount(store.get('mapList'), APP_ID, WG_COUNT);

  yield put({ type: constants.SET_MAPLIST, mapList });
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_MAPLIST, getMapList);
  yield takeLatest(constants.REGIST_APP, registApp);
  yield takeLatest(constants.REGIST_CATEGORY, registCategory);
  yield takeLatest(constants.UPDATE_CHANGE_WGCOUNT, updateChangeWGCount);
}
