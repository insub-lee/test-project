import { call, put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as treeFunc from 'containers/common/functions/treeFunc';
import { LOAD_BAPPLIST_SAGA, SET_BAPPLIST, DELETE_APPLIST_SAGA, LOAD_APP_TREE, SET_TREE_DATA, LOAD_CATEGORY_LIST_SAGA, SET_CATEGORY_LIST, SEARCH_CATEGORY_LSIT_SAGA, DELETE_APPLIST_BIZ_SAGA, LOAD_BIZAPPLIST_SAGA } from './constants';
import { Axios } from '../../utils/AxiosFunc';

export function* getBAppList(payload) {
  const result = {};
  result.body = [];
  result.app_ID = 4;
  result.widget_ID = 31;
  
  const item = JSON.stringify(result);

  const data = {
    PARAM: {
      WIDGETID: Number(payload.id),
      ITEMVALUE: item,
    },
  };

  const response = yield call(Axios.post, '/api/portal/v1/page/widgetService/', data);
  const list = JSON.parse(response.list.ITEM_VALUE);
  const resultValue2 = list.data;

  const resultList = [];

  if(resultValue2.length > 0) {
    resultValue2.map(list => resultList.push(list.app_ID));
  }

  const data2 = {
    PARAM: {
      APPID: resultList,
    },
  };

  const response2 = yield call(Axios.post, '/api/portal/v1/page/getwidgetDscr/', data2);
  const resultValue = response2.dscrList;

  for(let i = 0; i< resultValue2.length; i += 1) {
    resultValue[i].TARGET = resultValue2[i].TARGET
    resultValue[i].PAGE_ID = resultValue2[i].PAGE_ID
  }

  yield put({ type: SET_BAPPLIST, resultValue });
}

export function* getBizAppList(payload) {
  const result = {};
  result.body = [];
  result.app_ID = 4;
  result.widget_ID = 31;
  
  const item = JSON.stringify(result);

  const data = {
    PARAM: {
      WIDGETID: Number(payload.id),
      ITEMVALUE: item,
    },
  };

  const response = yield call(Axios.post, '/api/portal/v1/page/widgetBizService/', data);
  const list = JSON.parse(response.list.ITEM_VALUE);
  const resultValue2 = list.data;

  const resultList = [];

  if(resultValue2.length > 0) {
    resultValue2.map(list => resultList.push(list.app_ID));
  }

  const data2 = {
    PARAM: {
      APPID: resultList,
    },
  };

  const response2 = yield call(Axios.post, '/api/portal/v1/page/getwidgetDscr/', data2);
  const resultValue = response2.dscrList;

  for(let i = 0; i< resultValue2.length; i += 1) {
    resultValue[i].TARGET = resultValue2[i].TARGET
    resultValue[i].PAGE_ID = resultValue2[i].PAGE_ID
  }

  yield put({ type: SET_BAPPLIST, resultValue });
}

export function* deleteAppList(payload) {
  const data = {
    PARAM: {
      ITEM: payload.payload.list,
      WIDGETID: Number(payload.payload.widgetID),
      PAGEID: payload.payload.pageID,
    },
  };

  const id = payload.payload.widgetID;

  const response = yield call(Axios.post, '/api/portal/v1/page/widgetServiceDelete/', data);

  if (response.result === 'success') {
    yield put({ type: LOAD_BAPPLIST_SAGA, id });
  }
}

export function* deleteAppBizList(payload) {
  const data = {
    PARAM: {
      ITEM: payload.payload.list,
      WIDGETID: Number(payload.payload.widgetID),
      PAGEID: payload.payload.pageID,
    },
  };

  const id = payload.payload.widgetID;

  const response = yield call(Axios.post, '/api/portal/v1/page/widgetServiceBizDelete/', data);

  if (response.result === 'success') {
    yield put({ type: LOAD_BIZAPPLIST_SAGA, id });
  }
}

export function* loadTree() {
  const response = yield call(Axios.get, '/api/bizstore/v1/store/appTree', { data: 'temp' });
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
    },
  };

  const response = yield call(Axios.post, '/api/portal/v1/page/loadCategoryList/', data);
  const result = response.list;
  if (result !== undefined) {
    yield put({ type: SET_CATEGORY_LIST, result });
  }
}

export function* searchCategory(payload) {
  const KEYWORD = payload.payload.keyword;
  const data = {
    PARAM: {
      TYPE: payload.payload.type,
      NUM: payload.payload.num,
    },
  };

  const response = yield call(Axios.post, `/api/portal/v1/page/searchCategoryList/${KEYWORD}`, data);
  const result = response.list;

  yield put({ type: SET_CATEGORY_LIST, result });
}

export default function* appSelectorportalSaga() {
  yield takeLatest(DELETE_APPLIST_SAGA, deleteAppList);
  yield takeLatest(LOAD_APP_TREE, loadTree);
  yield takeLatest(LOAD_CATEGORY_LIST_SAGA, loadCategoryList);
  yield takeLatest(SEARCH_CATEGORY_LSIT_SAGA, searchCategory);
  yield takeLatest(LOAD_BAPPLIST_SAGA, getBAppList);
  yield takeLatest(LOAD_BIZAPPLIST_SAGA, getBizAppList);
  yield takeLatest(DELETE_APPLIST_BIZ_SAGA, deleteAppBizList);
}
