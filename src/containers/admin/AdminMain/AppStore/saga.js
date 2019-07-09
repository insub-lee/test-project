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
import * as constantsAppList from './AppBizModal/AppModal/AppList/constants';
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
    const mypage = yield select(state => state.get('appstore'));
    const newCategoryData = result[0].children;
    const oldCategoryData = mypage.get('categoryData').toJS();

    treeFunc.mergeArray(newCategoryData, oldCategoryData);

    yield put({ type: constants.SET_CATEGORY_DATA, categoryData: fromJS(newCategoryData) });
  }
}

export function* moveNode(payload) {
  const { treeData } = payload;

  yield call(Axios.post, '/api/bizstore/v1/mypage/moveMymenu', { treeData });
  // const response = yield call(Axios.post, '/api/bizstore/v1/mypage/moveMymenu', { treeData });
  // const { code } = response;

  // if (code !== 200) {
  //   console.log('error?');
  // }
}


export function* insertNode(payload) {
  const {
    rowInfo, treeData, data, history,
  } = payload;
  const { node } = rowInfo;

  const {
    SITE_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN,
  } = data;

  // 앱 카테고리 수정
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
        selectedIndex: `F-${catgId}`,
      });
    } else {
      feed.error(`${intlObj.get(messages.cateInsertFail)}`);
    }
  } else if (data.NODE_TYPE === 'P') { // 페이지 추가
    const response = yield call(Axios.post, '/api/bizstore/v1/mypage/insertMenu', { data });
    const { code, resultNode } = response;

    // resultNode에는 SNGL_APP_YN 값이 있음...
    // 이를 APP_YN으로 고쳐줘야함
    resultNode.APP_YN = resultNode.SNGL_APP_YN;
    delete resultNode.SNGL_APP_YN;

    if (code === 200) {
      const isRoot = node.key === -1;
      let newCategoryData = [];
      let newNode = {};

      if (isRoot) {
        const path = [resultNode.PRNT_ID, resultNode.key];
        newNode = { ...resultNode, path };
        newCategoryData = treeData.concat(newNode);
      } else {
        const path = [...node.path, resultNode.key];
        newNode = { ...resultNode, path };
        newCategoryData = treeFunc.addNode(rowInfo, newNode, treeData);
      }

      if (newNode.PAGE_ID && newNode.PAGE_ID !== -1) {
        history.push(`/admin/adminmain/appstore/page/${newNode.PAGE_ID}`);
      }

      yield put({
        type: constants.SET_CATEGORY_DATA,
        categoryData: fromJS(newCategoryData),
        selectedIndex: resultNode.key,
        tempRowInfo: { node: newNode },
      });
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
    SITE_ID, NAME_KOR, NAME_ENG, NAME_CHN, CATG_ID,
  } = data;

  // 앱 카테고리 수정
  if (data.NODE_TYPE === 'F') {
    const param = {
      SITE_ID, CATG_ID, NAME_KOR, NAME_ENG, NAME_CHN,
    };
    const siteId = SITE_ID;
    const catgId = CATG_ID;
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
        siteId,
        selectedIndex: `F-${catgId}`,
      });
    } else {
      feed.error(`${intlObj.get(messages.cateUpdateFail)}`);
    }
  } else if (data.NODE_TYPE === 'P') { // 페이지 (앱은 수정이 없음)
    const langGubun = lang.getLocale();

    const { node } = rowInfo;

    const response = yield call(Axios.post, '/api/bizstore/v1/mypage/updateMenu', { data, langGubun });
    const { code, appInfo } = response;

    if (code === 200) {
      const newNode = {
        ...node, ...appInfo, title: lang.get('NAME', appInfo),
      }; // 병합
      const rowInfoN = { node: newNode, path: _.drop(node.path, 1) };
      const newCategoryData = treeFunc.editNodeByKey(rowInfoN, treeData);

      yield put({
        type: constants.SET_CATEGORY_DATA,
        categoryData: fromJS(newCategoryData),
        selectedIndex: newNode.key,
      });

      if (newNode.PAGE_ID && newNode.PAGE_ID !== -1) {
        history.push(`/admin/adminmain/appstore/page/${newNode.PAGE_ID}`);
      }
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
        selectedIndex: `${LVL === 1 ? 'R' : 'F'}-${PRNT_ID}`,
      });
    } else if (code === 210) {
      feed.error(`${intlObj.get(messages.cateDeleteFail1)}`);
    } else {
      feed.error(`${intlObj.get(messages.cateDeleteFail2)}`);
    }

  } else if (node.NODE_TYPE === 'A') {
    const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/deleteApp', {
      SITE_ID: Number(node.SITE_ID),
      APP_ID: Number(node.APP_ID),
      CATG_ID: Number(node.PRNT_ID),
    });
    const { code, resultCategoryData } = response;

    if (code === 200) {
      message.success('앱 삭제 성공 하였습니다.', 3);
      // update Tree
      const result = JSON.parse(`[${resultCategoryData.join('')}]`); // response.result -> json string 배열
      const store = yield select(state => state.get('appstore'));
      const newCategoryData = result;
      const oldCategoryData = store.get('categoryData').toJS();

      treeFunc.mergeArray(newCategoryData, oldCategoryData);
      yield put({
        type: constants.SET_CATEGORY_DATA,
        categoryData: fromJS(newCategoryData),
      });
      // 성공 시 사용중으로 상태 변경.
      // const mapList = changeWGCount(store.get('mapList'), CATG_ID, APP_ID, 1);
      // yield put({ type: constants.SET_MAPLIST, mapList });
    } else if (code === 500) {
      feed.error('앱 삭제에 실패 하였습니다.');
    }
  } else if (node.NODE_TYPE === 'P') {
    // make url, param
    let menuType = 'mymenu'; // 일반앱
    let isPageOrSnglApp = false; // 해당 앱이 페이지나 싱글앱일 경우 독아이템 목록에서 제거 해줘야 함

    if (node.REF_TYPE === 'B') { // 업무그룹
      menuType = 'bizgroup';
    } else if (node.NODE_TYPE === 'F') { // 폴더
      menuType = 'folder';
    } else if ((node.APP_YN === 'N' && node.REF_TYPE === 'M') || node.APP_YN === 'Y') {
      isPageOrSnglApp = true;
    }
    const response = yield call(Axios.post, `/api/bizstore/v1/mypage/delete/${menuType}`, {
      MENU_ID: Number(node.MENU_ID),
      PAGE_ID: Number(node.PAGE_ID),
      isPageOrSnglApp,
    });
    const { code } = response;

    if (code === 200) {
      // delete tree node
      const newCategoryData = treeFunc.deleteNode(rowInfo, categoryData);

      yield put({
        type: constants.SET_CATEGORY_DATA,
        categoryData: fromJS(newCategoryData),
      });

      const APP_ID = getIdByUrl('app/', history); // /store/appMain/myPage/app/14
      const PAGE_ID = getIdByUrl('page/', history); // /store/appMain/myPage/page/1

      // main으로 화면 전환(현재 열려있는 메뉴가 삭제된 경우)
      if (node.APP_ID === APP_ID || node.PAGE_ID === PAGE_ID) {
        history.push('/admin/adminmain/appstore');
      } else {
        // 메뉴 사용중 -> 사용안함 상태로 변경(앱, 업무그룹, 업무메뉴 리스트 화면인 경우)
        const { location } = history;
        const { pathname } = location;

        if (node.CATG_ID !== 0) {
          if (pathname.indexOf('/modal/app') > -1) {
            if (node.REF_TYPE === 'B' && node.REF_ID !== -1) {
              yield put({ // 앱
                type: constantsAppList.UPDATE_CHANGE_WGCOUNT,
                CATG_ID: node.CATG_ID,
                APP_ID: node.REF_ID,
                WG_COUNT: 0,
              });
            } else if (node.REF_TYPE !== 'B' && node.APP_ID !== 0) {
              yield put({ // 앱
                type: constantsAppList.UPDATE_CHANGE_WGCOUNT,
                CATG_ID: node.CATG_ID,
                APP_ID: node.APP_ID,
                WG_COUNT: 0,
              });
            }
          }
        }
      }

      message.success(`${intlObj.get(messages.completeDelete)}`, 2);
    } else {
      console.log('error?');
    }
  }
}

export function* updateMymenuDisp() {
  const mypage = yield select(state => state.get('appstore'));
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

export default function* rootSaga() {
  yield takeLatest(constants.GET_CATEGORY_COMBO_LIST, getCategoryComboList);
  yield takeLatest(constants.GET_CATEGORY_DATA, getTreeData);
  yield takeLatest(constants.INSERT_NODE, insertNode);
  yield takeLatest(constants.UPDATE_NODE, updateNode);
  yield takeLatest(constants.DELETE_NODE, deleteNode);
  // yield takeLatest(constants.MOVE_MYMENU, moveNode);
  // yield takeLatest(constants.UPDATE_MYMENU_DISP, updateMymenuDisp);
  // yield takeLatest(constantsCommon.RESET_MYMENU_CATEGORY_DATA, resetTreeData);
}
