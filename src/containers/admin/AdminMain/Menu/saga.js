import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import _ from 'lodash';
import { Axios } from 'utils/AxiosFunc';
import { intlObj } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import * as constantsLoading from 'containers/common/Loading/constants';
import * as treeFunc from 'containers/common/functions/treeFunc';
import * as constantsTopMenu from './BizMenuReg/TopMenu/constants';
import * as constants from './constants';
import messages from './messages';

// SA권한 확인 - (SA 권한일 경우 모든 업무그룹 수정 권한 부여)
export function* getUserRole() {
  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/bizGrpSARoleCheck', { data: 'temp' });
  const { code } = response;
  const userRole = response.userRole ? response.userRole : '';
  if (code === 200 && userRole) {
    yield put({
      type: constants.SET_USER_ROLE,
      userRole,
    });
  }
}

// 업무카드관리의 좌측 트리 - (시스템[SYS_YN],홈[HOME_YN] 설정이 외의 업무그룹 리스트)
export function* getTreeData() {
  // const response = yield call(Axios.get, '/api/bizstore/v1/bizgroup/bizgroupTree', { data: 'temp' });
  const response = yield call(Axios.get, '/api/bizstore/v1/bizgroup/bizgroupTree?SYS_YN=N', { data: 'temp' });
  const result = JSON.parse(`[${response.result}]`);
  if (!result[0].children) result[0].children = [];
  const categoryData = fromJS(result).getIn([0, 'children']);
  const categoryFlatData = treeFunc.generateListBiz(categoryData);

  yield put({
    type: constants.SET_CATEGORY_DATA,
    categoryData,
    categoryFlatData,
  });

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
}

// 메뉴관리의 그룹ID (시스템[SYS_YN],홈[HOME_YN] 설정된 메뉴의 그룹ID)
export function* getMenuBizGrpID() {
  yield put({
    type: constants.SET_MENUBIZGRP_ID,
    menuBizGrpId: -1,
  });

  const response = yield call(Axios.get, '/api/bizstore/v1/bizgroup/getMenuBizGrpId', { data: 'temp' });
  const bizGrpId = response.result;
  if (response.code === 200 && bizGrpId) {
    // history.push(`/admin/adminmain/menu/bizMenuReg/${bizGrpId}`);
    yield put({
      type: constants.SET_MENUBIZGRP_ID,
      menuBizGrpId: bizGrpId,
    });
  }
}

export function* updateTreeNode(payload) {
  const { key, newNode } = payload;
  const bizmanage = yield select(state => state.get('admin/AdminMain/Menu'));
  if (bizmanage.get('categoryData').length > 0) {
    const categoryData = bizmanage.get('categoryData').toJS();
    const categoryFlatData = bizmanage.get('categoryFlatData');
    const node = categoryFlatData.get(key);
    if (node) {
      const mergedNode = {
        ...node,
        ...newNode,
      }; // 병합
      const rowInfoN = { node: mergedNode, path: _.drop(node.path, 1) };
      const newCategoryData = treeFunc.editNodeByKey(rowInfoN, categoryData);
      treeFunc.mergeArray(newCategoryData, categoryData);
      yield put({
        type: constants.SET_CATEGORY_DATA,
        categoryData: fromJS(newCategoryData),
      });
    }
  }
}

export function* moveNode(payload) {
  const { treeData } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/moveBizgroup', { treeData });
  const { code } = response;

  if (code !== 200) {
    // console.log('error?');
  }
}

export function* addEmptyNode(payload) {
  const {
    rowInfo, data, categoryData, history,
  } = payload;
  const { node } = rowInfo;

  // data : {
  //   PRNT_ID: 1,
  //   MENU_EXIST_YN: 'Y/N',
  //   SEC_YN: 'Y',
  //   NAME_KOR, NAME_ENG, NAME_CHN, NAME_JPN, NAME_ETC
  // }

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/insertBizgroup', { data });
  const { code, resultNode } = response;

  if (code === 200) {
    const isRoot = node.key === -1;
    let newCategoryData = [];
    let newNode = {};

    if (isRoot) {
      const path = [resultNode.PRNT_ID, resultNode.key];
      newNode = { ...resultNode, path };
      newCategoryData = categoryData.concat(newNode);
    } else {
      const path = [...node.path, resultNode.key];
      newNode = { ...resultNode, path };
      newCategoryData = treeFunc.addNode(rowInfo, newNode, categoryData);
    }

    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
      // categoryFlatData: treeFunc.generateListBizManage(fromJS(newCategoryData)),
      selectedIndex: resultNode.key,
      tempRowInfo: { node: newNode },
    });

    // history.push(`/store/appMain/bizManage/bizGroupReg/${resultNode.key}`);
    const pathArr = history.location.pathname.split('/');
    const type = pathArr[3];
    history.push(`/admin/adminmain/${type}/bizGroupReg/${resultNode.key}`);
  } else {
    // console.log('error?');
  }

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
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
  const { BIZGRP_ID } = node;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/deleteBizgroup', {
    BIZGRP_ID: Number(BIZGRP_ID),
    MENU_EXIST_YN: node.MENU_EXIST_YN,
  });
  const { code } = response;

  if (code === 200) {
    let newCategoryData = [];
    const selectedIndex = node.LVL === 1 ? -1 : node.PRNT_ID;

    if (node.MENU_EXIST_YN === 'N') {
      newCategoryData = treeFunc.deleteNode(rowInfo, categoryData);
    } else {
      const newNode = {
        ...node,
        DEL_YN: 'Y',
        CHG_YN: 'Y',
      }; // 병합
      const rowInfoN = { node: newNode, path: _.drop(node.path, 1) };
      newCategoryData = treeFunc.editNodeByKey(rowInfoN, categoryData);

      yield put({
        type: constantsTopMenu.GET_BIZ_INFO,
        BIZGRP_ID,
      });
    }

    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
      // categoryFlatData: treeFunc.generateListBizManage(fromJS(newCategoryData)),
      tempRowInfo: rowInfo,
      selectedIndex,
    });

    // 현재 페이지가 삭제된 경우
    const BIZGRP_ID2 = getIdByUrl('bizGroupReg/', history);
    if (BIZGRP_ID === BIZGRP_ID2 && node.MENU_EXIST_YN === 'N') {
      // history.push('/store/appMain/bizManage');
      const pathArr = history.location.pathname.split('/');
      const type = pathArr[3];
      history.push(`/admin/adminmain/${type}`);
    }

    message.success(`${intlObj.get(messages.completeDelete)}`, 2);

    if (node.MENU_EXIST_YN === 'Y') {
      const pathArr = history.location.pathname.split('/');
      const type = pathArr[3];
      history.push(`/admin/adminmain/${type}/bizMenuReg/info/${BIZGRP_ID}`);
    }
  } else {
    // console.log('error?');
  }

  yield put({
    type: constantsLoading.LOADING_OFF,
  });
}

export function* updateBizGroupDelYn(payload) {
  const {
    rowInfo,
    categoryData,
    data, // history,
  } = payload;
  const { node } = rowInfo;

  // data : {
  //   BIZGRP_ID: 1,
  //   DEL_YN: 'Y/N',
  // }

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/updateDelyn', { data });
  const { code } = response;

  if (code === 200) {
    const newNode = {
      ...node,
      ...data,
    }; // 병합
    const rowInfoN = { node: newNode, path: _.drop(node.path, 1) };
    const newCategoryData = treeFunc.editNodeByKey(rowInfoN, categoryData);

    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: fromJS(newCategoryData),
      // categoryFlatData: treeFunc.generateListBizManage(fromJS(newCategoryData)),
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_USER_ROLE, getUserRole);
  yield takeLatest(constants.INIT_CATEGORY_DATA, getTreeData);
  yield takeLatest(constants.GET_MENUBIZGRP_ID, getMenuBizGrpID);
  yield takeLatest(constants.ADD_EMPTY_NODE, addEmptyNode);
  yield takeLatest(constants.MOVE_MYMENU, moveNode);
  yield takeLatest(constants.DELETE_NODE, deleteNode);
  yield takeLatest(constants.UPDATE_BIZGROUP_DELYN, updateBizGroupDelYn);
  yield takeLatest(constants.UPDATE_TREENODE, updateTreeNode);
}
