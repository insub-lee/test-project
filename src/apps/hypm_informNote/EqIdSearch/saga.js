import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingTidnParam(payload) {
  const data = yield call(Axios.post, '/api/gipms/v1/informNote/loadingTidnParam', payload.param);
  const tidnData = data.list.tidnList;
  for (let i = 0; i < tidnData.length; i += 1) {
    tidnData[i].key = i.toString();
    tidnData[i].title = tidnData[i].CODE;
    tidnData[i].description = '';
    tidnData[i].chosen = '';
  }
  yield put({
    type: constants.LOADING_TIDNPARAM,
    tidnList: tidnData,
  });
}

export default function* eqIdSearchSaga() {
  yield takeLatest(constants.LOADING_TIDNPARAM_SAGA, loadingTidnParam);
}
