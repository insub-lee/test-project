import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* serviceSearch(payload) {
  // const param = {
  //   sdptValue: payload.value,
  // };
  const data = yield call(Axios.post, '/apps/api/v1/cicd/serviceSearch', payload);
  yield put({
    type: constants.SEARCH_SERVICE,
    dataList: data.serviceList,
  });
}

export default function* serviceSaga() {
  yield takeLatest(constants.SEARCH_SERVICE_SAGA, serviceSearch);
}
