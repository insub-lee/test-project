import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import _ from 'lodash';
import { lang, intlObj } from 'utils/commonUtils';
import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
// import * as constantsCommon from 'containers/common/constants';
import * as constantsLoading from 'containers/common/Loading/constants';
import * as treeFunc from 'containers/common/functions/treeFunc';
import * as constants from './constants';
import * as constantsBizManage from '../constants';
import * as constantsTopMenu from './TopMenu/constants';
import * as constantsAppList from './AppBizModal/AppModal/AppList/constants';
import messages from './messages';

export function* getTreeData(payload) {
  const { BIZGRP_ID } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/bizmenuTree', { BIZGRP_ID });
  const { categoryData, bizGroupInfo } = response;

  if (bizGroupInfo) {
    const result = fromJS(JSON.parse(`[${categoryData}]`));
    let newCategoryData = result.get(0).get('children');
    if (newCategoryData === undefined) {
      newCategoryData = fromJS([]);
    }

    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: newCategoryData,
      bizGroupInfo: fromJS(bizGroupInfo),
      selectedIndex: -1,
      BIZGRP_ID,
    });
  }

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
}

export function* moveNode(payload) {
  const { BIZGRP_ID, treeData } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/moveBizmenu', { BIZGRP_ID, treeData });
  const { code } = response;

  if (code === 200) {
    yield put({
      type: constantsTopMenu.GET_BIZ_INFO,
      BIZGRP_ID,
    });

    yield put({
      type: constantsBizManage.UPDATE_TREENODE,
      key: BIZGRP_ID,
      newNode: { CHG_YN: 'Y' },
    });
    // console.log('error?');
  }
}

export function* insertNode(payload) {
  const {
    rowInfo, treeData, data, history,
  } = payload;
  const { node } = rowInfo;
  const { BIZGRP_ID } = node;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/insertBizmenu', { data });
  const { code, resultNode } = response;

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
      history.push(`/store/appMain/bizManage/bizMenuReg/page/${BIZGRP_ID}/${newNode.PAGE_ID}`);
    }

    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
      selectedIndex: resultNode.key,
      tempRowInfo: { node: newNode },
    });

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
  // else {
  //   console.log('error?');
  // }
}

export function* updateNode(payload) {
  const {
    rowInfo, treeData, data, history,
  } = payload;
  const langGubun = lang.getLocale();

  const { node } = rowInfo;
  const { BIZGRP_ID } = node;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/updateBizmenu', { data, langGubun });
  const { code, bizMenu } = response;

  if (code === 200) {
    const newNode = {
      ...node, ...bizMenu, title: lang.get('NAME', bizMenu),
    }; // 병합
    const rowInfoN = { node: newNode, path: _.drop(node.path, 1) };
    const newCategoryData = treeFunc.editNodeByKey(rowInfoN, treeData);

    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
    });

    if (newNode.PAGE_ID && newNode.PAGE_ID !== -1) {
      history.push(`/store/appMain/bizManage/bizMenuReg/page/${BIZGRP_ID}/${newNode.PAGE_ID}`);
    }

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
  const BIZGRP_ID = Number(node.BIZGRP_ID);

  const data = {
    BIZGRP_ID,
    MENU_ID: Number(node.MENU_ID),
  };

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/deleteBizMenu', { data });
  const { code } = response;

  if (code === 200) {
    const newCategoryData = treeFunc.deleteNode(rowInfo, categoryData);

    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
    });

    // 삭제 시 사용중 -> 사용안함 상태로 변경
    if (node.REF_ID !== 0 && node.APP_ID !== 0) {
      yield put({
        type: constantsAppList.UPDATE_CHANGE_WGCOUNT,
        CATG_ID: node.REF_ID,
        APP_ID: node.APP_ID,
        WG_COUNT: 0,
      });
    }

    yield put({
      type: constantsTopMenu.GET_BIZ_INFO,
      BIZGRP_ID,
    });

    yield put({
      type: constantsBizManage.UPDATE_TREENODE,
      key: BIZGRP_ID,
      newNode: { CHG_YN: 'Y' },
    });

    const APP_ID = getIdByUrl(`app/${BIZGRP_ID}/`, history);
    const PAGE_ID = getIdByUrl(`page/${BIZGRP_ID}/`, history);

    if (node.REF_ID === APP_ID || node.PAGE_ID === PAGE_ID) {
      history.push(`/store/appMain/bizManage/bizMenuReg/info/${BIZGRP_ID}`);
    }

    message.success(`${intlObj.get(messages.completeDelete)}`, 2);
  } else {
    // console.log('error?');
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.INIT_CATEGORY_DATA, getTreeData);
  yield takeLatest(constants.MOVE_MYMENU, moveNode);
  yield takeLatest(constants.DELETE_NODE, deleteNode);
  yield takeLatest(constants.UPDATE_NODE, updateNode);
  yield takeLatest(constants.INSERT_NODE, insertNode);
}
