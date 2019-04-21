import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* serviceDupChk(payload) {
  // const param = {
  //   param: payload.param,
  // };
  const data = yield call(Axios.post, '/apps/api/v1/cicd/serviceDupCheck', payload);
  yield put({
    type: constants.SET_DUPCHECK_FLAG,
    dupCheck: data.result,
  });
}

export function* serviceSave(payload) {
  // const param = {
  //   SERVICE_NAME: payload.value,
  // };
  const data = yield call(Axios.post, '/apps/api/v1/cicd/serviceCreate', payload);
  yield put({
    type: constants.SET_SAVE_FLAG,
    saveCheck: data.result,
  });
}

export default function* serviceSaga() {
  yield takeLatest(constants.SERVICE_DUPCHECK_SAGA, serviceDupChk);
  yield takeLatest(constants.SERVICE_SAVE_SAGA, serviceSave);
}
