import { fromJS } from 'immutable';
import { takeLatest, put, call, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';

import * as constantTypes from './constants';
import * as actions from './actions';
import selectors from './selectors';

function* getManualList(action) {
  yield put(actions.setListLodingByRedcr(true));
  const { categoryIdx } = action;
  const response = yield call(Axios.get, `/api/manual/v1/ManualListHandler/${categoryIdx}`);
  const { manualList } = response;
  const rowKeyList = [];
  manualList.forEach(node => {
    rowKeyList.push(node.MUAL_IDX);
  });
  yield put(actions.setManualListByReducr(fromJS(manualList)));
  yield put(actions.setExpandedKeyListByReducr(fromJS(rowKeyList)));
}
export default function* initManualListSaga() {
  yield takeLatest(constantTypes.GET_MANUALLIST_SAGA, getManualList);
}
