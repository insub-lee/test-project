import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as treeFunc from 'containers/common/functions/treeFunc';

import { Axios } from 'utils/AxiosFunc';

import * as action from './constants';

export function* getTreeData() {
  const data = {
    param: {
      FLTYP: 'U',
      WERKS: 1010,
    },
  };

  const response = yield call(Axios.post, '/api/gipms/v1/guide/fncLocList', data);
  const { dataList } = response;
  if (dataList) {
    let categoryData = treeFunc.setFlatDataKey(dataList, 'TPLNR');
    categoryData = fromJS(treeFunc.getTreeFromFlatTreeData(categoryData, dataList[0].TPLNR));

    yield put({ type: action.SET_CATEGORY_DATA, categoryData });
  }
}

export default function* rootSaga() {
  yield takeLatest(action.INIT_CATEGORY_DATA, getTreeData);
}
