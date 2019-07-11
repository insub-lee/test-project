import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';
import * as constantsTopMenu from '../TopMenu/constants';
import * as constantsBizManage from '../../constants';

export function* getTreeData(payload) {
  const { BIZGRP_ID } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/bizmenuList', { BIZGRP_ID });
  const { categoryData, bizGroupInfo, authArr, bizMenuSecKeyList } = response;

  if (bizGroupInfo) {
    yield put({
      type: constants.SET_CATEGORY_DATA,
      categoryData: fromJS(categoryData),
      bizGroupInfo: fromJS(bizGroupInfo),
      authArr: fromJS(authArr),
      bizMenuSecKeyList: fromJS(bizMenuSecKeyList),
    });
  }
}

export function* insertAuth(payload) {
  const { dataList } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/insertBizmenuAuth', { dataList });
  const { code } = response;

  if (code === 200) {
    const { BIZGRP_ID } = dataList[0];
    yield put({
      type: constantsTopMenu.GET_BIZ_INFO,
      BIZGRP_ID,
    });

    yield put({
      type: constantsBizManage.UPDATE_TREENODE,
      key: Number(BIZGRP_ID),
      newNode: { CHG_YN: 'Y' },
    });
  }
}

export function* deleteAuth(payload) {
  const { dataList } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/deleteBizmenuAuth', { dataList });
  const { code } = response;

  if (code === 200) {
    const { BIZGRP_ID } = dataList[0];
    yield put({
      type: constantsTopMenu.GET_BIZ_INFO,
      BIZGRP_ID,
    });

    yield put({
      type: constantsBizManage.UPDATE_TREENODE,
      key: Number(BIZGRP_ID),
      newNode: { CHG_YN: 'Y' },
    });
  }
}

export function* insertBizGroupAuth(payload) {
  const { dataList } = payload;
  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/insertBizgroupAuth', { dataList });
  const { code } = response;

  if (code === 200) {
    const { BIZGRP_ID } = dataList[0];
    yield put({
      type: constantsTopMenu.GET_BIZ_INFO,
      BIZGRP_ID,
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.INIT_CATEGORY_DATA, getTreeData);
  yield takeLatest(constants.INSERT_AUTH, insertAuth);
  yield takeLatest(constants.DELETE_AUTH, deleteAuth);
  yield takeLatest(constants.INSERT_BIZGROUP_AUTH, insertBizGroupAuth);
}
