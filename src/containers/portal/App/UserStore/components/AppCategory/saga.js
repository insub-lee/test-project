import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as treeFunc from 'containers/common/functions/treeFunc';

import { Axios } from 'utils/AxiosFunc';

import { SET_CATEGORY_DATA, INIT_CATEGORY_DATA } from './constants';

export function* getTreeData() {
  const response = yield call(Axios.get, '/api/bizstore/v1/store/appTree', { data: 'temp' });
  const { result, rootId } = response;
  let categoryData = treeFunc.setFlatDataKey(result, 'CATG_ID');
  categoryData = fromJS(treeFunc.getTreeFromFlatTreeData(categoryData, rootId));

  yield put({ type: SET_CATEGORY_DATA, categoryData });
}

export default function* rootSaga() {
  yield takeLatest(INIT_CATEGORY_DATA, getTreeData);
}
