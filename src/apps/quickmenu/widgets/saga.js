import { call, put, takeLatest } from 'redux-saga/effects';
import { lang } from 'utils/commonUtils';
import { fromJS } from 'immutable';
import * as treeFunc from 'containers/common/functions/treeFunc';
import { EXEC_APPS_SUCCESS, LOAD_APPLIST_SAGA, SET_APPLIST, DELETE_APPLIST_SAGA, LOAD_APP_TREE, SET_TREE_DATA, LOAD_CATEGORY_LIST_SAGA, SET_CATEGORY_LIST, SEARCH_CATEGORY_LSIT_SAGA, SET_DSCRLIST, EXEC_APPS_SAGA } from './constants';
import { Axios } from '../../../utils/AxiosFunc';

export function* getAppList(payload) {
  const result = {}
    result["body"] = [];
    result["app_ID"] = 4;
    result["widget_ID"] = 31;

    const item = JSON.stringify(result);

  const data = {
    PARAM: {
      WIDGETID: Number(payload.id),
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
      WIDGETID: Number(payload.widgetID),
      PAGEID: payload.pageID,
    },
  };

  const id = payload.widgetID;

  const response = yield call(Axios.post, '/api/portal/v1/page/widgetServiceDelete/', data);

  // if (response.result === 'success') {
  //   yield put({ type: LOAD_APPLIST_SAGA, id });
  // }
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
    },
  };

  const response = yield call(Axios.post, '/api/portal/v1/page/loadCategoryList/', data);
  const result = response.list;
  
  yield put({ type: SET_CATEGORY_LIST, result });
}

export function* searchCategory(payload) {
  const KEYWORD = payload.keyword;

  const response = yield call(Axios.post, `/api/portal/v1/page/searchCategoryList/${KEYWORD}`);
  const result = response.list;

  yield put({ type: SET_CATEGORY_LIST, result });
}

export function* execApps(payload) {
  const { node } = payload;
  const PAGE_ID = node; //eslint-disable-line
  const response = yield call(Axios.post, '/api/portal/v1/page/executeApps/', { PAGE_ID });

  // if (response.list === 'fail') {
  //   yield put({ type: actionType.EXEC_APPS_FAIL });
  // } else {
    const resultValue = JSON.parse(response.list);

    // const myObject = yield select(state => state.get('auth').get('UNREAD_CNT'));
    // const myObjectVal = Object.values(myObject);
    // const notiVal = JSON.parse(`[${myObjectVal}]`);
    // if (notiVal !== null) {
    //   for (let a = 0; a < resultValue.length; a += 1) {
    //     for (let b = 0; b < notiVal.length; b += 1) {
    //       if (resultValue[a].APP_ID === notiVal[b].APP_ID) {
    //         Object.assign(resultValue[a], { UNREAD_CNT: notiVal[b].UNREAD_CNT }); // eslint-disable-line
    //       }
    //     }
    //   }
    //   // yield put({ type: actionType.EXEC_APPS_SUCCESS, resultValue, node });
    // }
    yield put({ type: EXEC_APPS_SUCCESS, resultValue, node });
  // }
}

export default function* quickmenuSettingSaga() {
  yield takeLatest(LOAD_APPLIST_SAGA, getAppList);
  yield takeLatest(DELETE_APPLIST_SAGA, deleteAppList);
  yield takeLatest(LOAD_APP_TREE, loadTree);
  yield takeLatest(LOAD_CATEGORY_LIST_SAGA, loadCategoryList);
  yield takeLatest(SEARCH_CATEGORY_LSIT_SAGA, searchCategory);
  yield takeLatest(EXEC_APPS_SAGA, execApps);
}
