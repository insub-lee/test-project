import React from 'react';
import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import _ from 'lodash';
import { Axios } from 'utils/AxiosFunc';
import { lang, intlObj } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as feed from 'components/Feedback/functions';
import * as treeFunc from 'containers/common/functions/treeFunc';
// import * as constantsCommon from 'containers/common/constants';

import messages from './messages';
// eslint-disable-next-line no-unused-vars
import * as constantsAppList from './AppModal/AppList/constants';
import * as constants from './constants';


function getIdByUrl(url, history) {
  const path = history.location.pathname;
  const index = history.location.pathname.indexOf(url);
  const id = path.substring(index + url.length, path.length);
  return id ? Number(id) : 0;
}

export function* getCategoryComboList() {
  const response = yield call(Axios.get, '/api/common/v1/account/organizationGrpList', { data: 'temp' });
  if (response.list.length > 0) {
    yield put({ type: constants.SET_CATEGORY_COMBO_LIST, payload: fromJS(response.list) });
  }
}

export function* getTreeData(payload) {
  const { siteId } = payload;
  const index = payload.selectedIndex && payload.selectedIndex !== '' ? payload.selectedIndex : '';
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/getAppListWithCategory', { SITE_ID: siteId });
  // const response = yield call(Axios.get, '/api/bizstore/v1/mypage/myTree', { data: 'temp' });
  const result = JSON.parse(`[${response.result.join('')}]`);
  if (result) {
    // const categoryData = result.get(0).get('children');
    const selectedIndex = index !== '' ? index : result[0].key;
    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: fromJS(result),
      selectedIndex,
    });
  }
}

export function* resetTreeData(payload) {
  console.log('$$$ myPage의 resetTreeData');
  const auth = yield select(state => state.get('auth'));
  const uuid = auth.get('uuid');

  const result = JSON.parse(`[${payload.storeTreeData}]`);
  if (payload.uuid !== uuid && result.length > 0) {
    const mypage = yield select(state => state.get('admin/AdminMain/AppStore'));
    const newCategoryData = result[0].children;
    const oldCategoryData = mypage.get('categoryData').toJS();

    treeFunc.mergeArray(newCategoryData, oldCategoryData);

    yield put({ type: constants.SET_CATEGORY_DATA, categoryData: fromJS(newCategoryData) });
  }
}

export function* moveNode(payload) {
  const { siteId, treeData } = payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/movemyappcategory', { SITE_ID: siteId, treeData });
  const { code } = response;

  if (code === 200) {
    message.success(
      <MessageContent>
        {intlObj.get(messages.cateUpdate)}
      </MessageContent>,
      3,
    );
    yield put({
      type: constants.GET_CATEGORY_DATA,
      siteId,
      // selectedIndex: `F-${CATG_ID}`,
    });    
  } else {
    feed.error(`${intlObj.get(messages.cateInsertFail)}`);
  }
}


export function* insertNode(payload) {
  const {
    rowInfo, treeData, data, history,
  } = payload;
  const { node } = rowInfo;

  const {
    SITE_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN,
  } = data;

  if (data.NODE_TYPE === 'F') {
    const param = {
      SITE_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN,
    };
    const response = yield call(Axios.post, '/api/admin/v1/common/regiscategory', param);
    const { code, catgId } = response;
    if (code === 200) {
      message.success(
        <MessageContent>
          {intlObj.get(messages.cateInsert)}
        </MessageContent>,
        3,
      );
      yield put({
        type: constants.GET_CATEGORY_DATA,
        siteId: SITE_ID,
        selectedIndex: `${catgId}`,
      });
    } else {
      feed.error(`${intlObj.get(messages.cateInsertFail)}`);
    }
  } else if (data.NODE_TYPE === 'P') { // 페이지 추가
    const param = {
      SITE_ID, NAME_KOR, NAME_ENG, NAME_CHN, CATG_ID: PRNT_ID,
    };
    const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/registPageApp', { param });
    const {
      code, resultCategoryData, pageId, appId,
    } = response;

    if (code === 200) {
      message.success('앱 등록에 성공 하였습니다.', 3);
      // update Tree
      const result = JSON.parse(`[${resultCategoryData.join('')}]`); // response.result -> json string 배열
      const store = yield select(state => state.get('admin/AdminMain/AppStore'));
      const newCategoryData = result;
      const oldCategoryData = store.get('categoryData').toJS();

      // eslint-disable-next-line no-unused-vars
      const selectedIndex = `P-${appId}`;

      treeFunc.mergeArray(newCategoryData, oldCategoryData);
      yield put({
        type: constants.SET_CATEGORY_DATA,
        categoryData: fromJS(newCategoryData),
        selectedIndex,
      });

      if (pageId && pageId !== -1) {
        history.push(`/admin/adminmain/appstore/page/${pageId}`);
      }
    } else if (code === 500) {
      feed.error('앱 등록에 실패 하였습니다.');
    }
    // else {
    //   console.log('error?');
    // }
  }
}

export function* updateNode(payload) {
  const {
    rowInfo, treeData, data, history,
  } = payload;

  // const { node } = rowInfo;

  const {
    SITE_ID, NAME_KOR, NAME_ENG, NAME_CHN, CATG_ID, APP_ID,
  } = data;

  // 앱 카테고리 수정
  if (data.NODE_TYPE === 'F') {
    const param = {
      SITE_ID, CATG_ID, NAME_KOR, NAME_ENG, NAME_CHN,
    };
    const response = yield call(Axios.post, '/api/admin/v1/common/updatecategory', param);
    const { code } = response;
    if (code === 200) {
      message.success(
        <MessageContent>
          {intlObj.get(messages.cateUpdate)}
        </MessageContent>,
        3,
      );
      yield put({
        type: constants.GET_CATEGORY_DATA,
        siteId: SITE_ID,
        selectedIndex: `${CATG_ID}`,
      });
    } else {
      feed.error(`${intlObj.get(messages.cateUpdateFail)}`);
    }
  } else if (data.NODE_TYPE === 'P') { // 페이지 (앱은 수정이 없음)
    // const { node } = rowInfo;

    const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/updatePageApp', { data });
    const { code, resultCategoryData } = response;

    if (code === 200) {
      message.success('앱 정보를 수정 하였습니다.', 3);
      // update Tree
      const result = JSON.parse(`[${resultCategoryData.join('')}]`); // response.result -> json string 배열
      const store = yield select(state => state.get('admin/AdminMain/AppStore'));
      const newCategoryData = result;
      const oldCategoryData = store.get('categoryData').toJS();

      treeFunc.mergeArray(newCategoryData, oldCategoryData);
      yield put({
        type: constants.SET_CATEGORY_DATA,
        categoryData: fromJS(newCategoryData),
      });

      yield put({
        type: constants.GET_CATEGORY_DATA,
        siteId: SITE_ID,
        selectedIndex: `P-${APP_ID}`,
      });
      
    } else {
      feed.error('앱 정보 수정에 실패 하였습니다.');
    }
    // else {
    //   console.log('error?');
    // }  }
  }
}

// 삭제
export function* deleteNode(payload) {
  const { rowInfo, categoryData, history } = payload;
  const { node } = rowInfo;

  if (node.NODE_TYPE === 'F') {
    // 카테고리 삭제 (등록된 앱이 없을 경우에만 가능)
    const {
      CATG_ID, SORT_SQ, SITE_ID, LVL, PRNT_ID,
    } = node;
    const param = {
      CATG_ID, SORT_SQ, SITE_ID,
    };
    const response = yield call(Axios.post, '/api/admin/v1/common/deletecategory', param);
    const { code } = response;
    if (code === 200) {
      message.success(
        <MessageContent>
          {intlObj.get(messages.cateDelete)}
        </MessageContent>,
        3,
      );
      yield put({
        type: constants.GET_CATEGORY_DATA,
        siteId: SITE_ID,
        selectedIndex: `${PRNT_ID}`,
      });
    } else if (code === 210) {
      feed.error(`${intlObj.get(messages.cateDeleteFail1)}`);
    } else {
      feed.error(`${intlObj.get(messages.cateDeleteFail2)}`);
    }
  } else if (node.NODE_TYPE === 'A' || node.NODE_TYPE === 'P') {
    const { SITE_ID, APP_ID, PRNT_ID, CATG_ID } = node;
    const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/deleteApp', {
      SITE_ID: Number(SITE_ID),
      APP_ID: Number(APP_ID),
      CATG_ID: Number(PRNT_ID),
    });
    const { code, resultCategoryData } = response;

    if (code === 200) {
      message.success('앱 삭제 성공 하였습니다.', 3);
      // update Tree
      const result = JSON.parse(`[${resultCategoryData.join('')}]`); // response.result -> json string 배열
      const store = yield select(state => state.get('admin/AdminMain/AppStore'));
      const newCategoryData = result;
      const oldCategoryData = store.get('categoryData').toJS();

      treeFunc.mergeArray(newCategoryData, oldCategoryData);
      yield put({
        type: constants.SET_CATEGORY_DATA,
        categoryData: fromJS(newCategoryData),
        selectedIndex: node.PRNT_ID.toString(),
      });
      // 성공 시 사용중으로 상태 변경.
      const AppListStore = yield select(state => state.get('admin/AdminMain/AppStore/AppModal/AppList'));
      const mapList = changeWGCount(AppListStore.get('mapList'), CATG_ID, APP_ID, 0);
      yield put({ type: constantsAppList.SET_MAPLIST, mapList });
    } else if (code === 500) {
      feed.error('앱 삭제에 실패 하였습니다.');
    }
  }
}

export function* updateMymenuDisp() {
  const mypage = yield select(state => state.get('admin/AdminMain/AppStore'));
  const { node } = mypage.get('tempRowInfo');
  const categoryData = mypage.get('categoryData').toJS();
  const DISP_YN = node.DISP_YN === 'N' ? 'Y' : 'N';

  const response = yield call(Axios.post, '/api/bizstore/v1/mypage/updateMenudisp', { MENU_ID: Number(node.key), DISP_YN });
  const { code } = response;

  if (code === 200) {
    const rowInfo = {
      node: { ...node, DISP_YN },
      path: _.drop(node.path, 1),
    };
    const newCategoryData = treeFunc.editNodeByKey(rowInfo, categoryData);

    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
    });
  }
  // else {
  //   console.log('error?');
  // }
}

// 성공 시 사용중으로 상태 변경.
function changeWGCount(mapList, CATG_ID, APP_ID, WG_COUNT) {
  let matchMapIndex = 0;
  let matchAppIndex = 0;
  let result = false;

  mapList.some((map, i) => {
    result = false;
    map.get('appList').some((m, j) => {
      if (m.get('APP_ID') === APP_ID) {
        matchMapIndex = i;
        matchAppIndex = j;
        result = true;
        return result;
      }
    });
    if (result) return result;
  });
  return mapList.setIn([matchMapIndex, 'appList', matchAppIndex, 'WG_COUNT'], WG_COUNT);
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_CATEGORY_COMBO_LIST, getCategoryComboList);
  yield takeLatest(constants.GET_CATEGORY_DATA, getTreeData);
  yield takeLatest(constants.INSERT_NODE, insertNode);
  yield takeLatest(constants.UPDATE_NODE, updateNode);
  yield takeLatest(constants.DELETE_NODE, deleteNode);
  yield takeLatest(constants.MOVE_NODE, moveNode);
  // yield takeLatest(constants.UPDATE_MYMENU_DISP, updateMymenuDisp);
  // yield takeLatest(constantsCommon.RESET_MYMENU_CATEGORY_DATA, resetTreeData);
}
