import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';
import * as loadingConstants from 'containers/common/Loading/constants';

// import fakeData from './fakeData.js';

export function* loadingGridParam(payload) {
  yield put({
    type: loadingConstants.LOADING_ON,
  });
  // const responseArr = fakeData.ET_LIST;
  // yield put({ type: constants.LOADING_GRID_PARAM, PlanChangeDataList: fromJS(responseArr) });
  const data1 = {
    IV_PLNAL: payload.value.plnal,
    IV_PLNNR: payload.value.plnnr,
  };
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmmodel/masterPmSheetPlanListPopupSearch', data1);
  if (response1.list.ET_LIST) {
    yield put({
      type: constants.LOADING_GRID_PARAM,
      PlanChangeDataList: fromJS(response1.list.ET_LIST),
    });
  }
  yield put({
    type: loadingConstants.LOADING_OFF,
  });
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_GRID_PARAM_SAGA, loadingGridParam);
}
