import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* serviceInfo(payload) {
  const data = yield call(Axios.post, '/apps/api/v1/cicd/serviceInfo', payload);
  yield put({
    type: constants.SERVICE_INFO,
    serviceData: data.serviceInfo,
  });
}

export function* serviceUpdate(payload) {
  const data = yield call(Axios.post, '/apps/api/v1/cicd/serviceUpdate', payload);
  console.log('@@@@@@@@@@@@');
  console.log(data.result);
  yield put({
    type: constants.SET_UPDATE_FLAG,
    updateCheck: data.result,
  });
}

export default function* serviceSaga() {
  yield takeLatest(constants.SERVICE_INFO_SAGA, serviceInfo);
  yield takeLatest(constants.SERVICE_UPDATE_SAGA, serviceUpdate);
}
