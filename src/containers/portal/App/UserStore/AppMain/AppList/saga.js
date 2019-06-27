import { takeLatest, put, select, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import _ from 'lodash';
import { lang } from 'utils/commonUtils';
import { Axios } from 'utils/AxiosFunc';

import * as treeFunc from 'containers/common/functions/treeFunc';
import * as constantsLoading from 'containers/common/Loading/constants';
import * as constants from './constants';
import * as constantsMyPage from '../MyPage/constants';

// 앱리스트 사이즈
const appBlockSize = 20;
const appBlockSizeAll = 8;

/* 초기 페이지 세팅 */
export function* initPage(payload) {
  const { initType, param } = payload;
  // appList에 카테고리 데이터가 없는 경우
  const store = yield select(state => state.get('store-appList'));
  const oldCategoryData = store.get('categoryData');
  if (oldCategoryData.size === 0) {
    const response = yield call(Axios.get, '/api/bizstore/v1/store/appTree', { data: 'temp' });
    const { result, rootId } = response;
    let categoryData = treeFunc.setFlatDataKey(result, 'CATG_ID');
    categoryData = treeFunc.getTreeFromFlatTreeData(categoryData, rootId);
    const categoryFlatData = treeFunc.getFlatMapDataFromTreeData(categoryData);

    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: fromJS(categoryData),
      categoryFlatData: fromJS(categoryFlatData),
    });
  }

  // ONE. 단일 앱리스트
  if (initType.indexOf('ONE') > -1) {
    yield put({ type: constants.GET_MAPLIST_ONE, key: param });
  } else if (initType.indexOf('SEARCH') > -1) {
    // SEARCH. 검색 결과 앱리스트
    yield put({ type: constants.GET_MAPLIST_SEARCH, searchword: param });
  } else {
    // ALL. 전체 앱리스트
    yield put({ type: constants.GET_MAPLIST_ALL });
  }
}

/* 앱리스트 ONE - 한 카테고리의 앱리스트 + 하위카테고리 */
export function* getMapListOne(payload) {
  const { key } = payload;
  const CATG_ID = Number(key);

  const store = yield select(state => state.get('store-appList'));
  const categoryFlatData = store.get('categoryFlatData');

  const response = yield call(Axios.post, '/api/bizstore/v1/store/applist', {
    TYPE: 'ONE',
    CATG_ID,
    LIMIT: appBlockSize,
  });
  const { result, total } = response;

  let map = fromJS({ key: CATG_ID });
  map = map.concat(categoryFlatData.get(CATG_ID)); // 카테고리 정보 복제
  map = map.set('appList', fromJS(result)); // 앱리스트
  map = map.set('showReadMoreBtn', total > appBlockSize); // 더보기 버튼 여부
  map = map.set('childList', categoryFlatData.get(CATG_ID).children || []); // 하위 카테고리

  yield put({
    type: constants.SET_MAPLIST_ONE,
    mapList: fromJS([map]),
    categoryId: CATG_ID,
  });

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
}

/* 앱리스트 - 더보기 */
export function* getMapListMore(payload) {
  const { key } = payload;
  const CATG_ID = Number(key);

  const store = yield select(state => state.get('store-appList'));
  const initType = store.get('initType'); // ONE, SEARCH
  const searchword = store.get('searchword'); // 검색어

  // 기존 리스트개수 + 추가 블럭 개수
  let mapList = store.get('mapList');
  const matchMap = mapList.filter(map => map.get('CATG_ID') === CATG_ID).get(0);
  const limit = matchMap.get('appList').size + appBlockSize;

  const response = yield call(Axios.post, '/api/bizstore/v1/store/applist', {
    TYPE: initType,
    CATG_ID,
    LIMIT: limit,
    searchword,
  });
  const { result, total } = response;

  // 기존 앱데이터에 appList 업데이트
  mapList.forEach((map, i) => {
    if (map.get('CATG_ID') === CATG_ID) {
      const showReadMoreBtn = total > limit;
      mapList = mapList.setIn([i, 'appList'], fromJS(result));
      mapList = mapList.setIn([i, 'showReadMoreBtn'], showReadMoreBtn);
    }
  });

  yield put({ type: constants.SET_MAPLIST_MORE, mapList, categoryId: key });

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
}

/* 앱리스트 ALL - 카테고리별 앱 8개씩 */
export function* getMapListAll() {
  const store = yield select(state => state.get('store-appList'));
  const categoryData = store.get('categoryData');

  const response = yield call(Axios.post, '/api/bizstore/v1/store/applist', {
    TYPE: 'ALL',
    LIMIT: appBlockSizeAll,
  });

  // 데이터형태: 리스트. CATG_ID 값으로 GROUP BY -> 각 map에 appList push
  const { result } = response;
  /* eslint-disable */
  const newResult = _.groupBy(result, 'CATG_ID');
  let mapList = fromJS([]);
  categoryData.forEach(data => {
    let newData = data;
    const categoryKey = data.get('CATG_ID');
    newData = newData.set('showReadMoreBtn', false);
    newData = newData.set('appList', fromJS(newResult[categoryKey])); // 앱 목록
    mapList = mapList.push(newData);
  });

  yield put({ type: constants.SET_MAPLIST_ALL, mapList });

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
}

/* 앱리스트 SEARCH - 검색결과 앱리스트 */
export function* getMapListSearch(payload) {
  const { searchword } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/store/applist', {
    TYPE: 'SEARCH',
    searchword: payload.searchword,
    // LIMIT: 100,
  });
  const { result } = response;

  if (result) {
    const store = yield select(state => state.get('store-appList'));
    const categoryFlatData = store.get('categoryFlatData');

    const appListMap = _.groupBy(result, 'CATG_ID');
    let mapList = fromJS([]);

    Object.keys(appListMap).map(CATG_ID => {
      let newData = fromJS(categoryFlatData.get(Number(CATG_ID)));
      newData = newData.set('showReadMoreBtn', false);
      newData = newData.set('searchword', searchword);
      newData = newData.set('appList', fromJS(appListMap[CATG_ID])); // 앱 목록
      mapList = mapList.push(newData);
      return true;
    });

    yield put({
      type: constants.SET_MAPLIST_SEARCH,
      mapList,
      searchword,
    });
  }

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
}

// 성공 시 사용중으로 상태 변경.
function changeWGCount(mapList, CATG_ID, APP_ID, WG_COUNT) {
  let matchMapIndex = 0;
  let matchAppIndex = 0;

  let matchAppList = mapList.filter((map, i) => {
    if (Number(map.get('CATG_ID')) === CATG_ID) {
      matchMapIndex = i;
      return true;
    }
    return false;
  });

  if (matchAppList.size === 0) {
    matchAppList = mapList.get(0).get('appList');
  } else {
    matchAppList = matchAppList.get(0).get('appList');
  }

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
  const { APP_ID, CATG_ID } = payload;
  const langGubun = lang.getLocale();
  const store = yield select(state => state.get('appList'));
  const url = '/api/bizstore/v1/mypage/registApp';

  const response = yield call(Axios.post, url, { APP_ID, PRNT_ID: -1, langGubun });
  const { code } = response;

  if (code === 200) {
    // feed.success(`${intlObj.get(messages.appInputSuccess)}`);

    // 성공 시 사용중으로 상태 변경.
    const mapList = changeWGCount(store.get('mapList'), CATG_ID, APP_ID, 1);

    yield put({ type: constants.SET_MAPLIST, mapList });
  } else if (code === 500) {
    // feed.error(`${intlObj.get(messages.appInputError)}`);
  }
}

/* 카테고리 포함 앱 등록 */
export function* registCategory(payload) {
  const { APP_ID, CATG_ID } = payload;
  const langGubun = lang.getLocale();
  const store = yield select(state => state.get('store-appList'));
  const url = '/api/bizstore/v1/mypage/registCategory';

  const response = yield call(Axios.post, url, { APP_ID, PRNT_ID: -1, langGubun });
  const { code } = response;

  if (code === 200) {
    // 성공 시 사용중으로 상태 변경.
    const mapList = changeWGCount(store.get('mapList'), CATG_ID, APP_ID, 1);

    yield put({ type: constants.SET_MAPLIST, mapList });
  } else if (code === 500) {
    // feed.error(`${intlObj.get(messages.appInputError)}`);
  }
}

export function* registerBiz(payload) {
  const { APP_ID, CATG_ID } = payload;
  const langGubun = lang.getLocale();

  const store = yield select(state => state.get('store-appList'));
  const url = '/api/bizstore/v1/mypage/registbiz';

  const response = yield call(Axios.post, url, { BIZGRP_ID: Number(APP_ID), langGubun });

  const { code } = response;

  if (code === 200) {
    const mapList = changeWGCount(store.get('mapList'), CATG_ID, APP_ID, 1);
    console.debug('>>>>>>>itemBiz mapList: ', mapList);
    yield put({ type: constants.SET_MAPLIST, mapList });
  } else if (code === 201) {
    // feed.error(`${intlObj.get(messages.bizRegistfail)}`);
  } else {
    // feed.error(`${intlObj.get(messages.bizRegistErr)}`);
  }
}

/* 모달 앱 등록(마이페이지) */
export function* registAppModal(payload) {
  const { APP_ID, CATG_ID } = payload;

  // set Url
  const store = yield select(state => state.get('store-appList'));

  // get PRNT_ID
  const parentStore = yield select(state => state.get('mypage'));
  const { node } = parentStore.get('tempRowInfo');
  const PRNT_ID = node && node.MENU_ID ? node.MENU_ID : -1;

  const response = yield call(Axios.post, '/api/bizstore/v1/mypage/registApp', {
    APP_ID,
    PRNT_ID,
    langGubun: lang.getLocale(),
  });
  const { code, resultCategoryData } = response;

  if (code === 200) {
    // update Tree
    const result = JSON.parse(`[${resultCategoryData.join('')}]`); // response.result -> json string 배열
    const newCategoryData = result[0].children;
    const oldCategoryData = parentStore.get('categoryData').toJS();

    treeFunc.mergeArray(newCategoryData, oldCategoryData);

    yield put({
      type: constantsMyPage.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
    });

    // 성공 시 사용중으로 상태 변경.
    const mapList = changeWGCount(store.get('mapList'), CATG_ID, APP_ID, 1);

    yield put({ type: constants.SET_MAPLIST, mapList });
  } else if (code === 500) {
    // feed.error(`${intlObj.get(messages.appInputError)}`);
  }
}

/* 카테고리포함 모달 앱 등록(마이페이지) */
export function* registCategoryModal(payload) {
  const { APP_ID, CATG_ID } = payload;

  // set Url
  const store = yield select(state => state.get('store-appList'));

  // get PRNT_ID
  const parentStore = yield select(state => state.get('mypage'));
  const { node } = parentStore.get('tempRowInfo');
  const PRNT_ID = node && node.MENU_ID ? node.MENU_ID : -1;

  const response = yield call(Axios.post, '/api/bizstore/v1/mypage/registCategory', {
    APP_ID,
    PRNT_ID,
    langGubun: lang.getLocale(),
  });
  const { code, resultCategoryData } = response;

  if (code === 200) {
    // update Tree
    const result = JSON.parse(`[${resultCategoryData.join('')}]`); // response.result -> json string 배열
    const newCategoryData = result[0].children;
    const oldCategoryData = parentStore.get('categoryData').toJS();

    treeFunc.mergeArray(newCategoryData, oldCategoryData);

    yield put({
      type: constantsMyPage.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
    });

    // 성공 시 사용중으로 상태 변경.
    const mapList = changeWGCount(store.get('mapList'), CATG_ID, APP_ID, 1);

    yield put({ type: constants.SET_MAPLIST, mapList });
  } else if (code === 500) {
    // feed.error(`${intlObj.get(messages.appInputError)}`);
  }
}

export function* registBizModal(payload) {
  const { APP_ID, CATG_ID } = payload;
  const langGubun = lang.getLocale();

  const store = yield select(state => state.get('store-appList'));
  const url = '/api/bizstore/v1/mypage/registbizmodal';

  const mypage = yield select(state => state.get('mypage'));
  const rowInfo = mypage.get('tempRowInfo');
  const { node } = rowInfo;
  const PRNT_ID = node && node.MENU_ID ? node.MENU_ID : -1;

  const response = yield call(Axios.post, url, {
    BIZGRP_ID: Number(APP_ID),
    PRNT_ID,
    langGubun,
  });
  const { code, resultCategoryData } = response;

  if (code === 200) {
    const result = JSON.parse(`[${resultCategoryData.join('')}]`); // response.result -> json string 배열
    const newCategoryData = result[0].children;
    const oldCategoryData = mypage.get('categoryData').toJS();

    treeFunc.mergeArray(newCategoryData, oldCategoryData);

    yield put({
      type: constantsMyPage.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
    });
    const mapList = changeWGCount(store.get('mapList'), CATG_ID, APP_ID, 1);

    yield put({ type: constants.SET_MAPLIST, mapList });

    // feed.success(`${intlObj.get(messages.bizRegistOk)}`);
  } else if (code === 500) {
    // feed.error(`${intlObj.get(messages.bizRegistErr)}`);
  }
}

export function* updateChangeWGCount(payload) {
  const { CATG_ID, APP_ID, WG_COUNT } = payload;
  // 성공 시 사용중으로 상태 변경.
  const store = yield select(state => state.get('store-appList'));
  const mapList = changeWGCount(store.get('mapList'), CATG_ID, APP_ID, WG_COUNT);

  yield put({ type: constants.SET_MAPLIST, mapList });
}

export default function* rootSaga() {
  yield takeLatest(constants.INIT_PAGE, initPage);
  yield takeLatest(constants.GET_MAPLIST_ONE, getMapListOne);
  yield takeLatest(constants.GET_MAPLIST_ALL, getMapListAll);
  yield takeLatest(constants.GET_MAPLIST_SEARCH, getMapListSearch);
  yield takeLatest(constants.GET_MAPLIST_MORE, getMapListMore);
  yield takeLatest(constants.REGIST_APP, registApp);
  yield takeLatest(constants.REGIST_CATEGORY, registCategory);
  yield takeLatest(constants.REGISTER_BIZ, registerBiz);

  yield takeLatest(constants.REGIST_APP_MODAL, registAppModal);
  yield takeLatest(constants.REGIST_CATEGORY_MODAL, registCategoryModal);
  yield takeLatest(constants.REGIST_BIZ_MODAL, registBizModal);

  yield takeLatest(constants.UPDATE_CHANGE_WGCOUNT, updateChangeWGCount);
}
