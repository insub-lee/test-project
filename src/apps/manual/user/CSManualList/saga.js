import { fromJS } from 'immutable';
import { takeLatest, put, call, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';

import * as constantTypes from './constants';
import * as actions from './actions';

function* getTotalManualList(action) {
  const { categoryIdx, widgetId } = action;
  const response = yield call(Axios.get, `/api/manual/v1/CSManualListHandler/${categoryIdx}`);
  yield put(actions.setTotalManualList(fromJS(response).get('totalManualList'), widgetId));
}

export default function* initCSManualListSaga() {
  yield takeLatest(constantTypes.GET_TOTALMANUALIST, getTotalManualList);
}
