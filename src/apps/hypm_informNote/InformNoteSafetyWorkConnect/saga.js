import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* loadingConnectSearchParam(payload) {
  const connectSearch = yield call(Axios.post, '/api/gipms/v1/informNote/fabSafetyWorkConnectSearch', payload.value);
  yield put({
    type: constants.LOADING_SAFEWORK_CONNECT_SEARCH,
    connectSearch: connectSearch.list.resultList,
  });
}

export default function* noteSaga() {
  yield takeLatest(constants.LOADING_SAFEWORK_CONNECT_SEARCH_SAGA, loadingConnectSearchParam);
}
