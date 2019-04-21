import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingFabParamTest() {
  const responsetest = yield call(Axios.post, '/api/gipms/v1/pmsheet/pmSheetDelayList');
  yield put({
    type: constants.LOADING_FAB_PARAMTEST,
    delayCauseDetail: responsetest.delayList,
  });
}

export default function* pmSheetSaga() {
  yield takeLatest(constants.LOADING_FAB_PARAMTEST_SAGA, loadingFabParamTest);
}
