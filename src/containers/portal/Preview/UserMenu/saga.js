import { call, put, takeLatest, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { searchTree } from 'utils/commonUtils';
import * as treeFunc from 'containers/common/functions/treeFunc';
import * as actionType from './constants';
import { Axios } from '../../../../utils/AxiosFunc';

// My App tree
export function* getMyAppTree(payload) {
  const { BIZGRP_ID } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/bizmenuTree', { BIZGRP_ID:Number(BIZGRP_ID) });
  const { categoryData, bizGroupInfo } = response;

  if (bizGroupInfo) {
    const result = fromJS(JSON.parse(`[${categoryData}]`));
    let newCategoryData = result.get(0).get('children');
    if (newCategoryData === undefined) {
      newCategoryData = fromJS([]);
    }
    yield put({ type: actionType.SET_MYAPP_TREE, myAppTreeData: fromJS(newCategoryData) });
    // yield put({
    //   type: constants.SET_CATEGORY_DATA,
    //   categoryData: newCategoryData,
    //   bizGroupInfo: fromJS(bizGroupInfo),
    //   BIZGRP_ID,
    // });
  }
}

export default function* userMenuSaga() {
  yield takeLatest(actionType.GET_MYAPP_TREE_SAGA, getMyAppTree);
}
