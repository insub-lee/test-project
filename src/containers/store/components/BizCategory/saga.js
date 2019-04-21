import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as treeFunc from 'containers/common/functions/treeFunc';
// import _ from 'lodash';

import { Axios } from '../../../../utils/AxiosFunc';
import { SET_CATEGORY_DATA, INIT_CATEGORY_DATA } from './constants';

export function* getTreeData() {
  const response = yield call(Axios.get, '/api/bizstore/v1/store/bizTree', { data: 'temp' });

  const { result, rootId } = response;
  if (result.length > 1) {
    let categoryData = treeFunc.setFlatDataKey(result, 'BIZGRP_ID');
    categoryData = treeFunc.getTreeFromFlatTreeData(categoryData, rootId);
    yield put({ type: SET_CATEGORY_DATA, categoryData: fromJS(categoryData) });
  }
}

export default function* rootSaga() {
  yield takeLatest(INIT_CATEGORY_DATA, getTreeData);
}
