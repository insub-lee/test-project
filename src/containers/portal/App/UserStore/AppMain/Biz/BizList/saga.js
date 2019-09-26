import { takeLatest, put, select, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import _ from 'lodash';
// import * as feed from 'components/Feedback/functions';
import { Axios } from 'utils/AxiosFunc';
import { lang } from 'utils/commonUtils';
import * as treeFunc from 'containers/common/functions/treeFunc';
// import messages from './messages';

// import * as constantsApp from 'containers/store/App/constants';
import * as constantsLoading from 'containers/common/Loading/constants';
import * as constants from './constants';
import * as constantsTree from '../../../components/BizCategory/constants';
import * as constantsMyPage from '../../MyPage/constants';

const appBlockSize = 20;
const appBlockSizeAll = 8;

export function* initPage(payload) {
  const { initType, param } = payload;

  const response = yield call(Axios.get, '/api/bizstore/v1/store/bizTree', { data: 'temp' });

  const { result, rootId } = response;
  if (result.length > 0) {
    let categoryData = treeFunc.setFlatDataKey(result, 'BIZGRP_ID');
    categoryData = treeFunc.getTreeFromFlatTreeData(categoryData, rootId);
    const categoryFlatData = treeFunc.getFlatMapDataFromTreeData(categoryData);
    // const categoryFlatData = treeFunc.generateListBiz(categoryData);
    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: fromJS(categoryData),
      categoryFlatData,
    });
  }

  if (initType.indexOf('ONE') > -1) { // ONE. 단일 리스트
    yield put({ type: constants.GET_MAPLIST_ONE, key: param });
  } else if (initType.indexOf('SEARCH') > -1) { // SEARCH. 검색 결과 리스트
    yield put({ type: constants.GET_MAPLIST_SEARCH, searchword: param });
  } else { // ALL. 전체 리스트
    yield put({ type: constants.GET_MAPLIST_ALL });
  }
}

/* 앱리스트 + 하위카테고리 */
export function* getMapListOne(payload) {
  const { key } = payload;
  const BIZGRP_ID = Number(key);

  const store = yield select(state => state.get('portal_bizList'));
  const categoryFlatData = store.get('categoryFlatData');
  const url = '/api/bizstore/v1/store/bizlist';

  /* 앱리스트 - 카테고리 key값으로 서버에서 받아온다. */
  const response = yield call(Axios.post, url, { TYPE: 'ONE', BIZGRP_ID, LIMIT: appBlockSize });
  const { result, total } = response;

  let map = fromJS({ key: BIZGRP_ID });
  map = map.concat(categoryFlatData.get(BIZGRP_ID)); // 카테고리 정보 복제
  map = map.set('bizList', fromJS(result)); // 앱 목록
  map = map.set('showReadMoreBtn', total > appBlockSize);
  map = map.set('childList', categoryFlatData.get(BIZGRP_ID).children || []); // 하위카테고리

  yield put({
    type: constants.SET_MAPLIST_ONE,
    mapList: fromJS([map]),
    categoryId: BIZGRP_ID,
  });

  yield put({
    type: constantsTree.SET_SELECTED_INDEX,
    selectedIndex: BIZGRP_ID,
  });

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
}

/* 앱리스트 더보기 */
export function* getMapListMore(payload) {
  const { key } = payload;
  const BIZGRP_ID = Number(key);

  const store = yield select(state => state.get('portal_bizList'));
  const initType = store.get('initType');
  const searchword = store.get('searchword');
  let mapList = store.get('mapList'); // 기존 리스트
  const url = '/api/bizstore/v1/store/bizlist';

  const matchMap = mapList.filter(map => map.get('key') === BIZGRP_ID).get(0);
  const limit = matchMap.get('bizList').size + appBlockSize;

  const response = yield call(Axios.post, url, {
    TYPE: initType, BIZGRP_ID, LIMIT: limit, searchword,
  });
  const { result, total } = response;

  mapList.forEach((map, i) => {
    if (map.get('key') === BIZGRP_ID) {
      const showReadMoreBtn = total > limit;
      mapList = mapList.setIn([i, 'bizList'], fromJS(result));
      mapList = mapList.setIn([i, 'showReadMoreBtn'], showReadMoreBtn);
    }
  });

  yield put({ type: constants.SET_MAPLIST_MORE, mapList, categoryId: BIZGRP_ID });

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
}

/* 1dept 카테고리 - 앱리스트 8개씩 */
export function* getMapListAll() {
  const store = yield select(state => state.get('portal_bizList'));
  const categoryData = store.get('categoryData'); // 카테고리 데이터
  const categoryKeys = categoryData.map(data => Number(data.get('key'))); // 카테고리 데이터 key list - [1,2,3,4]
  const url = '/api/bizstore/v1/store/bizlist';

  const response = yield call(Axios.post, url, { TYPE: 'ALL', BIZGRP_IDS: categoryKeys, LIMIT: appBlockSizeAll });
  const { result } = response;

  const newResult = _.groupBy(result, 'CATG_ID');

  let mapList = fromJS([]);

  categoryData.forEach((data) => {
    let newData = data;
    const categoryKey = data.get('key');

    const bizList = newResult[categoryKey];
    if (bizList) {
      newData = newData.set('showReadMoreBtn', false);
      newData = newData.set('bizList', fromJS(bizList.slice(0, appBlockSizeAll))); // 앱 목록
      mapList = mapList.push(newData);
    }
  });

  yield put({
    type: constantsTree.SET_SELECTED_INDEX,
    selectedIndex: -1,
  });

  yield put({ type: constants.SET_MAPLIST_ALL, mapList });

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
}

export function* getMapListSearch(payload) {
  const { searchword } = payload;

  const url = '/api/bizstore/v1/store/bizlist';

  const response = yield call(Axios.post, url, { TYPE: 'SEARCH', searchword: payload.searchword, LIMIT: appBlockSize });
  const { result, total } = response;

  if (result) {
    let mapList = fromJS([]);

    let newData = fromJS({ key: 0 });
    newData = newData.set('searchword', searchword);
    newData = newData.set('showReadMoreBtn', total > appBlockSize);
    newData = newData.set('bizList', fromJS(result)); // 앱 목록
    mapList = mapList.push(newData);

    yield put({
      type: constants.SET_MAPLIST_SEARCH,
      mapList,
      searchword,
    });
  }

  yield put({
    type: constantsTree.SET_SELECTED_INDEX,
    selectedIndex: -1,
  });

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
}

// 성공 시 사용중으로 상태 변경.
function changeWGCount(mapList, BIZGRP_ID, EXISTYN) {
  let matchMapIndex = 0;
  let matchAppIndex = 0;

  for (let i = 0; i < mapList.size; i += 1) {
    const map = mapList.get(i);
    const bizList = map.get('bizList');
    for (let j = 0; j < bizList.size; j += 1) {
      const biz = bizList.get(j);
      if (biz.get('BIZGRP_ID') === BIZGRP_ID) {
        matchMapIndex = i;
        matchAppIndex = j;
      }
    }
  }

  return mapList.setIn([matchMapIndex, 'bizList', matchAppIndex, 'EXISTYN'], EXISTYN);
}

export function* registerBiz(payload) {
  const { app } = payload;
  const langGubun = lang.getLocale();

  const mypage = yield select(state => state.get('mypage'));
  const rowInfo = mypage.get('tempRowInfo');
  const { node } = rowInfo;
  console.debug('>>>>>>>response node : ', node);
  // const PRNT_ID = node ? node.key : -1;

  const store = yield select(state => state.get('portal_bizList'));
  const url = '/api/bizstore/v1/mypage/registbiz';

  const response = yield call(Axios.post, url, { BIZGRP_ID: Number(app), langGubun });
  console.debug('>>>>>>>response: ', response);
  const { code } = response;

  if (code === 200) {
    // feed.success(`${intlObj.get(messages.bizRegistOk)}`);
    const oldCategoryData = mypage.get('categoryData').toJS();
    console.debug('>>>>>>>response oldCategoryData: ', oldCategoryData);
    const mapList = changeWGCount(store.get('mapList'), app, 'Y');

    yield put({ type: constants.SET_MAPLIST, mapList });
  } else if (code === 201) {
    // feed.error(`${intlObj.get(messages.bizRegistfail)}`);
  } else {
    // feed.error(`${intlObj.get(messages.bizRegistErr)}`);
  }
}

export function* registBizModal(payload) {
  const { BIZGRP_ID } = payload;
  const langGubun = lang.getLocale();

  const store = yield select(state => state.get('portal_bizList'));
  const url = '/api/bizstore/v1/mypage/registbizmodal';

  const mypage = yield select(state => state.get('mypage'));
  const rowInfo = mypage.get('tempRowInfo');
  const { node } = rowInfo;
  const PRNT_ID = node ? node.key : -1;

  const response = yield call(Axios.post, url, {
    BIZGRP_ID: Number(BIZGRP_ID),
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
    const mapList = changeWGCount(store.get('mapList'), BIZGRP_ID, 'Y');

    yield put({ type: constants.SET_MAPLIST, mapList });

    // history.push('/store/appMain/myPage');

    // feed.success(`${intlObj.get(messages.bizRegistOk)}`);
  } else if (code === 500) {
    // feed.error(`${intlObj.get(messages.bizRegistErr)}`);
  }
}

export function* updateChangeWGCount(payload) {
  const { BIZGRP_ID, EXISTYN } = payload;
  // 성공 시 사용중으로 상태 변경.
  const store = yield select(state => state.get('portal_bizList'));
  const mapList = changeWGCount(store.get('mapList'), BIZGRP_ID, EXISTYN);

  yield put({ type: constants.SET_MAPLIST, mapList });
}

export default function* rootSaga() {
  yield takeLatest(constants.INIT_PAGE, initPage);
  yield takeLatest(constants.GET_MAPLIST_ONE, getMapListOne);
  yield takeLatest(constants.GET_MAPLIST_ALL, getMapListAll);
  yield takeLatest(constants.GET_MAPLIST_SEARCH, getMapListSearch);
  yield takeLatest(constants.GET_MAPLIST_MORE, getMapListMore);
  yield takeLatest(constants.REGISTER_BIZ, registerBiz);
  yield takeLatest(constants.REGIST_BIZ_MODAL, registBizModal);

  yield takeLatest(constants.UPDATE_CHANGE_WGCOUNT, updateChangeWGCount);

  // yield takeLatest(constants.GET_BIZMENU, getBizMenu);
}
