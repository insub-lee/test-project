import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import _ from 'lodash';
import { Axios } from 'utils/AxiosFunc';
import { lang, intlObj } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import * as treeFunc from 'containers/common/functions/treeFunc';
import * as constantsCommon from 'containers/common/constants';

import messages from './messages';
import * as constantsAppList from './AppBizModal/AppModal/AppList/constants';
import * as constantsBizList from '../Biz/BizList/constants';
import * as constantsBizMenuList from '../Biz/BizMenuList/constants';
import * as constants from './constants';

export function* getTreeData() {
  const response = yield call(Axios.get, '/api/bizstore/v1/mypage/myTree', { data: 'temp' });
  const result = fromJS(JSON.parse(`[${response.result}]`));
  if (result.size > 0) {
    const categoryData = result.get(0).get('children');

    yield put({ type: constants.SET_CATEGORY_DATA, categoryData });
  }
}

export function* resetTreeData(payload) {
  console.log('$$$ myPage의 resetTreeData');
  const auth = yield select(state => state.get('auth'));
  const uuid = auth.get('uuid');

  const result = JSON.parse(`[${payload.storeTreeData}]`);
  if (payload.uuid !== uuid && result.length > 0) {
    const mypage = yield select(state => state.get('mypage'));
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
  /* eslint-disable */
  console.debug('>>>>>>>payload: ', payload);
  const { rowInfo, treeData, data, history } = payload;
  const { node } = rowInfo;

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
      history.push(`/portal/store/appMain/myPage/page/${newNode.PAGE_ID}`);
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

export function* updateNode(payload) {
  const { rowInfo, treeData, data, history } = payload;
  const langGubun = lang.getLocale();

  const { node } = rowInfo;

  const response = yield call(Axios.post, '/api/bizstore/v1/mypage/updateMenu', { data, langGubun });
  const { code, appInfo } = response;

  if (code === 200) {
    const newNode = {
      ...node,
      ...appInfo,
      title: lang.get('NAME', appInfo),
    }; // 병합
    const rowInfoN = { node: newNode, path: _.drop(node.path, 1) };
    const newCategoryData = treeFunc.editNodeByKey(rowInfoN, treeData);

    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
      selectedIndex: newNode.key,
    });

    if (newNode.PAGE_ID && newNode.PAGE_ID !== -1) {
      history.push(`/store/appMain/myPage/page/${newNode.PAGE_ID}`);
    }
  }
  // else {
  //   console.log('error?');
  // }
}

function getIdByUrl(url, history) {
  const path = history.location.pathname;
  const index = history.location.pathname.indexOf(url);
  const id = path.substring(index + url.length, path.length);
  return id ? Number(id) : 0;
}

// 마이메뉴 삭제
export function* deleteNode(payload) {
  const { rowInfo, categoryData, history } = payload;
  const { node } = rowInfo;

  // make url, param
  let menuType = 'mymenu'; // 일반앱
  let isPageOrSnglApp = false; // 해당 앱이 페이지나 싱글앱일 경우 독아이템 목록에서 제거 해줘야 함

  if (node.REF_TYPE === 'B') {
    // 업무그룹
    menuType = 'bizgroup';
  } else if (node.NODE_TYPE === 'F') {
    // 폴더
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
    console.debug('>>>>>> delete rowInfo: ', rowInfo);
    console.debug('>>>>>> delete categoryData: ', categoryData);
    console.debug('>>>>>> delete newCategoryData: ', newCategoryData);

    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
    });

    const APP_ID = getIdByUrl('app/', history); // /store/appMain/myPage/app/14
    const PAGE_ID = getIdByUrl('page/', history); // /store/appMain/myPage/page/1

    // main으로 화면 전환(현재 열려있는 메뉴가 삭제된 경우)
    if (node.APP_ID === APP_ID || node.PAGE_ID === PAGE_ID) {
      history.push('/portal/store/appMain/myPage/modal/app/list');
      // history.push('/portal/store/appMain/myPage');
      // history.goBack();
    } else {
      // 메뉴 사용중 -> 사용안함 상태로 변경(앱, 업무그룹, 업무메뉴 리스트 화면인 경우)
      const { location } = history;
      const { pathname } = location;

      if (node.CATG_ID !== 0) {
        if (pathname.indexOf('/biz/menulist') > -1 && node.APP_ID !== 0) {
          yield put({
            type: constantsBizMenuList.UPDATE_CHANGE_WGCOUNT,
            CATG_ID: node.CATG_ID,
            APP_ID: node.APP_ID,
            WG_COUNT: 0,
          });
        } else if (pathname.indexOf('/modal/app') > -1) {
          if (node.REF_TYPE === 'B' && node.REF_ID !== -1) {
            yield put({
              // 앱
              type: constantsAppList.UPDATE_CHANGE_WGCOUNT,
              CATG_ID: node.CATG_ID,
              APP_ID: node.REF_ID,
              WG_COUNT: 0,
            });
          } else if (node.REF_TYPE !== 'B' && node.APP_ID !== 0) {
            yield put({
              // 앱
              type: constantsAppList.UPDATE_CHANGE_WGCOUNT,
              CATG_ID: node.CATG_ID,
              APP_ID: node.APP_ID,
              WG_COUNT: 0,
            });
          }
        } else if (node.REF_TYPE === 'B' && pathname.indexOf('/modal/biz') > -1) {
          // 업무그룹
          yield put({
            type: constantsBizList.UPDATE_CHANGE_WGCOUNT,
            CATG_ID: node.CATG_ID,
            BIZGRP_ID: node.REF_ID,
            EXISTYN: 'N',
          });
        }
      }
    }

    message.success(`${intlObj.get(messages.completeDelete)}`, 2);
  }
  // else {
  //   console.log('error?');
  // }
}

export function* updateMymenuDisp() {
  const mypage = yield select(state => state.get('mypage'));
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
  yield takeLatest(constants.INIT_CATEGORY_DATA, getTreeData);
  yield takeLatest(constants.INSERT_NODE, insertNode);
  yield takeLatest(constants.UPDATE_NODE, updateNode);
  yield takeLatest(constants.MOVE_MYMENU, moveNode);
  yield takeLatest(constants.DELETE_NODE, deleteNode);
  yield takeLatest(constants.UPDATE_MYMENU_DISP, updateMymenuDisp);
  yield takeLatest(constantsCommon.RESET_MYMENU_CATEGORY_DATA, resetTreeData);
}
