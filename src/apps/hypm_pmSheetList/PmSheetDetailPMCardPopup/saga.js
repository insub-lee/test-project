import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* fncSearchList(payload) {
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmsheet/fabPMSheetPMCardDetail', payload.param);
  yield put({
    type: constants.LOADING_GRID_PARAM,
    ownCompGrid: fromJS(response1.list.ET_RESULT_A),
    contractorGrid: fromJS(response1.list.ET_RESULT_B),
    headerInfo: fromJS(response1.list.ES_INFO),
    esVenInfo: fromJS(response1.list.ES_VEN_INFO),
  });
}

export function* loadingGridParam(payload) {
  // const data1 = {
  //   param: payload.value,
  // };
  const response1 = yield call(Axios.post, '/api/gipms/v1/pmsheet/fabPMSheetPMCardDetail', payload.value);
  yield put({
    type: constants.LOADING_GRID_PARAM,
    ownCompGrid: fromJS(response1.list.ET_RESULT_A),
    contractorGrid: fromJS(response1.list.ET_RESULT_B),
    result: response1,
    // headerInfo: fromJS(response1.list.ES_INFO),
    // esVenInfo: fromJS(response1.list.ES_VEN_INFO),
  });
}
export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_FNC_SEARCH_LIST_SAGA, fncSearchList);
  yield takeLatest(constants.LOADING_GRID_PARAM_SAGA, loadingGridParam);
}
