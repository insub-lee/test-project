import { takeLatest, put, select, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import _ from 'lodash';
import * as treeFunc from 'containers/common/functions/treeFunc';

import { Axios } from 'utils/AxiosFunc';

// import * as constantsApp from 'containers/store/App/constants';
import * as constantsLoading from 'containers/common/Loading/constants';
import * as constantsBizMenu from '../../../constants';

import * as constants from './constants';
import * as constantsTopMenu from '../../../TopMenu/constants';
import * as constantsBizManage from '../../../../constants';

const appBlockSize = 20;
const appBlockSizeAll = 8;

console.debug('@@@ You Call Me Super Saga');

/* 초기 페이지 세팅 */
export function* initPage(payload) {
  const { initType, param } = payload;

  // appList에 카테고리 데이터가 없는 경우
  const appListStore = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg/AppBizModal/AppModal/AppList'));
  const oldCategoryData = appListStore.get('categoryData');
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
  let map = fromJS({ key: CATG_ID });

  // 업무그룹 ID
  const bizmenureg = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg'));
  const BIZGRP_ID = bizmenureg.get('BIZGRP_ID');

  const appListStore = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg/AppBizModal/AppModal/AppList'));
  const categoryFlatData = appListStore.get('categoryFlatData');

  const response = yield call(Axios.post, '/api/bizstore/v1/store/applist/manage', {
    TYPE: 'ONE',
    CATG_ID,
    LIMIT: appBlockSize,
    BIZGRP_ID,
  });
  const { result, total } = response;

  map = map.concat(categoryFlatData.get(CATG_ID)); // 카테고리 정보 복제
  // 앱데이터 업데이트
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
    isLoading: false,
  });
}

/* 앱리스트 - 더보기 */
export function* getMapListMore(payload) {
  const { key } = payload;
  const CATG_ID = Number(key);

  // 업무그룹 ID
  const bizmenureg = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg'));
  const BIZGRP_ID = bizmenureg.get('BIZGRP_ID');

  const appListStore = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg/AppBizModal/AppModal/AppList'));
  const initType = appListStore.get('initType'); // ONE, SEARCH
  const searchword = appListStore.get('searchword'); // 검색어

  let mapList = appListStore.get('mapList'); // 기존 앱리스트 데이터
  const matchMap = mapList.filter(map => map.get('key') === CATG_ID).get(0); // 기존 앱데이터
  const limit = matchMap.get('appList').size + appBlockSize; // limit값 증가

  const response = yield call(Axios.post, '/api/bizstore/v1/store/applist/manage', {
    TYPE: initType,
    CATG_ID,
    LIMIT: limit,
    searchword,
    BIZGRP_ID,
  });
  const { result, total } = response;

  // 기존 앱데이터에 appList 업데이트
  mapList.forEach((map, i) => {
    if (map.get('key') === CATG_ID) {
      const showReadMoreBtn = total > limit;
      mapList = mapList.setIn([i, 'appList'], fromJS(result));
      mapList = mapList.setIn([i, 'showReadMoreBtn'], showReadMoreBtn);
    }
  });

  yield put({ type: constants.SET_MAPLIST_MORE, mapList, categoryId: key });

  yield put({
    type: constantsLoading.LOADING_OFF,
    isLoading: false,
  });
}

/* 앱리스트 ALL - 카테고리별 앱 8개씩 */
export function* getMapListAll() {
  const appListStore = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg/AppBizModal/AppModal/AppList'));
  const categoryData = appListStore.get('categoryData');

  // 업무그룹 ID
  const bizmenureg = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg'));
  const BIZGRP_ID = bizmenureg.get('BIZGRP_ID');

  const response = yield call(Axios.post, '/api/bizstore/v1/store/applist/manage', {
    TYPE: 'ALL',
    LIMIT: appBlockSizeAll,
    BIZGRP_ID,
  });
  const { result } = response;

  const newResult = _.groupBy(result, 'CATG_ID');

  let mapList = fromJS([]);

  categoryData.forEach(data => {
    let newData = data;
    const categoryKey = data.get('key');
    newData = newData.set('showReadMoreBtn', false);
    newData = newData.set('appList', fromJS(newResult[categoryKey])); // 앱 목록
    mapList = mapList.push(newData);
  });

  yield put({ type: constants.SET_MAPLIST_ALL, mapList });

  yield put({
    type: constantsLoading.LOADING_OFF,
    isLoading: false,
  });
}

/* 앱리스트 SEARCH - 검색결과 앱리스트 */
export function* getMapListSearch(payload) {
  const { searchword } = payload;

  // 업무그룹 ID
  const bizmenureg = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg'));
  const BIZGRP_ID = bizmenureg.get('BIZGRP_ID');

  const url = '/api/bizstore/v1/store/applist/manage';

  const response = yield call(Axios.post, url, {
    TYPE: 'SEARCH',
    searchword: payload.searchword,
    LIMIT: appBlockSize,
    BIZGRP_ID,
  });
  const { result } = response;

  if (result) {
    const appListStore = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg/AppBizModal/AppModal/AppList'));
    const categoryFlatData = appListStore.get('categoryFlatData');

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
    isLoading: false,
  });
}

// 성공 시 사용중으로 상태 변경.
function changeWGCount(mapList, CATG_ID, APP_ID, WG_COUNT) {
  let matchMapIndex = 0;
  let matchAppIndex = 0;

  let matchAppList = mapList.filter((map, i) => {
    if (Number(map.get('key')) === CATG_ID) {
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

/* 모달 앱 등록(업무그룹관리) */
export function* registAppModal(payload) {
  const { APP_ID, CATG_ID } = payload;

  // get PRNT_ID
  const parentStore = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg'));
  const { node } = parentStore.get('tempRowInfo');
  const PRNT_ID = node ? node.key : -1;
  const BIZGRP_ID = parentStore.get('BIZGRP_ID');

  if (BIZGRP_ID) {
    const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/registApp', { BIZGRP_ID, APP_ID, PRNT_ID });
    const { code, resultCategoryData } = response;

    if (code === 200) {
      // update Tree
      const result = JSON.parse(`[${resultCategoryData.join('')}]`); // response.result -> json string 배열
      const newCategoryData = result[0].children;
      const oldCategoryData = parentStore.get('categoryData').toJS();

      treeFunc.mergeArray(newCategoryData, oldCategoryData);

      yield put({
        type: constantsBizMenu.SET_CATEGORY_DATA,
        categoryData: fromJS(newCategoryData),
      });

      // 성공 시 사용중으로 상태 변경.
      const store = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg/AppBizModal/AppModal/AppList'));
      const mapList = changeWGCount(store.get('mapList'), CATG_ID, APP_ID, 1);

      yield put({ type: constants.SET_MAPLIST, mapList });

      yield put({
        type: constantsTopMenu.GET_BIZ_INFO,
        BIZGRP_ID,
      });

      yield put({
        type: constantsBizManage.UPDATE_TREENODE,
        key: BIZGRP_ID,
        newNode: { CHG_YN: 'Y' },
      });
    }
  }
}

/* 카테고리포함 모달 앱 등록(업무그룹관리) */
export function* registCategoryModal(payload) {
  const { APP_ID, CATG_ID } = payload;

  // get PRNT_ID
  const parentStore = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg'));
  const { node } = parentStore.get('tempRowInfo');
  const PRNT_ID = node ? node.key : -1;
  const BIZGRP_ID = parentStore.get('BIZGRP_ID');

  if (BIZGRP_ID) {
    const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/registCategory', { BIZGRP_ID, APP_ID, PRNT_ID });
    const { code, resultCategoryData } = response;

    if (code === 200) {
      // update Tree
      const result = JSON.parse(`[${resultCategoryData.join('')}]`); // response.result -> json string 배열
      const newCategoryData = result[0].children;
      const oldCategoryData = parentStore.get('categoryData').toJS();

      treeFunc.mergeArray(newCategoryData, oldCategoryData);

      yield put({
        type: constantsBizMenu.SET_CATEGORY_DATA,
        categoryData: fromJS(newCategoryData),
      });

      // 성공 시 사용중으로 상태 변경.
      const store = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg/AppBizModal/AppModal/AppList'));
      const mapList = changeWGCount(store.get('mapList'), CATG_ID, APP_ID, 1);

      yield put({ type: constants.SET_MAPLIST, mapList });

      yield put({
        type: constantsTopMenu.GET_BIZ_INFO,
        BIZGRP_ID,
      });

      yield put({
        type: constantsBizManage.UPDATE_TREENODE,
        key: BIZGRP_ID,
        newNode: { CHG_YN: 'Y' },
      });
    }
  }
}

export function* updateChangeWGCount(payload) {
  const { CATG_ID, APP_ID, WG_COUNT } = payload;
  // 성공 시 사용중으로 상태 변경.
  const store = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg/AppBizModal/AppModal/AppList'));
  const mapList = changeWGCount(store.get('mapList'), CATG_ID, APP_ID, WG_COUNT);

  yield put({ type: constants.SET_MAPLIST, mapList });
}

export default function* watcher() {
  yield takeLatest(constants.INIT_PAGE, initPage);
  yield takeLatest(constants.GET_MAPLIST_ONE, getMapListOne);
  yield takeLatest(constants.GET_MAPLIST_ALL, getMapListAll);
  yield takeLatest(constants.GET_MAPLIST_SEARCH, getMapListSearch);
  yield takeLatest(constants.GET_MAPLIST_MORE, getMapListMore);
  yield takeLatest(constants.REGIST_APP_MODAL, registAppModal);
  yield takeLatest(constants.REGIST_CATEGORY_MODAL, registCategoryModal);
  yield takeLatest(constants.UPDATE_CHANGE_WGCOUNT, updateChangeWGCount);
}
