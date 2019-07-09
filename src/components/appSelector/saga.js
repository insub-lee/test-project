import { call, put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as treeFunc from 'containers/common/functions/treeFunc';
import { LOAD_APPLIST_SAGA, SET_APPLIST, DELETE_APPLIST_SAGA, LOAD_APP_TREE, SET_TREE_DATA, LOAD_CATEGORY_LIST_SAGA, SET_CATEGORY_LIST, SEARCH_CATEGORY_LSIT_SAGA } from './constants';
import { Axios } from '../../utils/AxiosFunc';

export function* getAppList(payload) {
  const result = {};
  result.body = '';
  result.app_ID = 4;
  result.widget_ID = 31;

  const item = JSON.stringify(result);

  const data = {
    PARAM: {
      WIDGETID: payload.id,
      ITEMVALUE: item,
    },
  };

  const response = yield call(Axios.post, '/api/portal/v1/page/widgetService/', data);
  const list = JSON.parse(response.list.ITEM_VALUE);
  const resultValue = list;

  if (list) {
    yield put({ type: SET_APPLIST, resultValue });
  }
}

export function* deleteAppList(payload) {
  const data = {
    PARAM: {
      ITEM: payload.list,
      WIDGETID: 31,
    },
  };

  const id = 31;

  const response = yield call(Axios.post, '/api/portal/v1/page/widgetServiceDelete/', data);

  if (response.result === 'success') {
    yield put({ type: LOAD_APPLIST_SAGA, id });
  }
}

export function* loadTree(payload) {
  const SITE_ID = payload.siteId;
  const response = yield call(Axios.post, '/api/bizstore/v1/store/appTree', { SITE_ID });
  const { result, rootId } = response;
  let categoryData = treeFunc.setFlatDataKey(result, 'CATG_ID');
  categoryData = fromJS(treeFunc.getTreeFromFlatTreeData(categoryData, rootId));

  yield put({ type: SET_TREE_DATA, categoryData });
}

export function* loadCategoryList(payload) {
  const data = {
    PARAM: {
      CATEGORYID: payload.payload.node,
      TYPE: payload.payload.type,
      NUM: payload.payload.num,
      SITE_ID: payload.payload.siteId,
    },
  };

  const response = yield call(Axios.post, '/api/portal/v1/page/loadCategoryList/', data);
  const result = response.list;

  yield put({ type: SET_CATEGORY_LIST, result });
}

export function* searchCategory(payload) {
  const data = {
    PARAM: {
      TYPE: payload.payload.type,
      NUM: payload.payload.num,
      SITE_ID: payload.payload.siteId,
    },
  };

  const KEYWORD = payload.payload.keyword;

  const response = yield call(Axios.post, `/api/portal/v1/page/searchCategoryList/${KEYWORD}`, data);
  const result = response.list;

  yield put({ type: SET_CATEGORY_LIST, result });
}

export default function* appSelectorSaga() {
  yield takeLatest(LOAD_APPLIST_SAGA, getAppList);
  yield takeLatest(DELETE_APPLIST_SAGA, deleteAppList);
  yield takeLatest(LOAD_APP_TREE, loadTree);
  yield takeLatest(LOAD_CATEGORY_LIST_SAGA, loadCategoryList);
  yield takeLatest(SEARCH_CATEGORY_LSIT_SAGA, searchCategory);
}
