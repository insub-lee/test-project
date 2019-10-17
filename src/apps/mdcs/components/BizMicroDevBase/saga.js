import { takeEvery, call, put, select, takeLatest } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

function* getCallDataHandler({ id, apiArys }) {
  if (apiArys && apiArys.length > 0) {
    for (let i = 0; i < apiArys.length; i += 1) {
      let response = {};
      const apiInfo = apiArys[i];
      if (apiInfo && apiInfo.url && apiInfo.url !== '') {
        switch (apiInfo.type.toUpperCase()) {
          case 'GET':
            response = yield call(Axios.get, apiInfo.url);
            break;
          case 'POST':
            response = yield call(Axios.post, apiInfo.url, apiInfo.params);
            break;
          default:
            break;
        }
      }
      yield put(actions.setCallDataHandler(id, apiInfo.key, response));
    }
  }
}

export default function* watcher() {
  const arg = arguments[0];
  yield takeEvery(`${actionTypes.GET_CALLDATA_SAGA}_${arg.id}`, getCallDataHandler);
}
