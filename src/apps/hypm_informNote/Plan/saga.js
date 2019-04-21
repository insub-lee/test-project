import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingPlanParam(payload) {
  const data = yield call(Axios.post, '/api/gipms/v1/informNote/fabNextTBMList', payload.param);

  yield put({
    type: constants.LOADING_PLANPARAM,
    planDataList: data.list === undefined ? [] : data.list.ET_LIST,
    resultCode: data.resultCode,
  });
}

export default function* planSaga() {
  yield takeLatest(constants.LOADING_PLANPARAM_SAGA, loadingPlanParam);
}
