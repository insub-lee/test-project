import { takeEvery, call, put, select, takeLatest } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

function* submitHandlerBySaga({ id, httpMethod, apiUrl, submitData, callbackFunc }) {
  let httpMethodInfo = Axios.put;
  switch (httpMethod.toUpperCase()) {
    case 'POST':
      httpMethodInfo = Axios.post;
      break;
    case 'PUT':
      httpMethodInfo = Axios.put;
      break;
    case 'DELETE':
      httpMethodInfo = Axios.delete;
      break;
    default:
      httpMethodInfo = Axios.get;
      break;
  }
  const response = yield call(httpMethodInfo, apiUrl, submitData);
  if (typeof callbackFunc === 'function') {
    callbackFunc(id);
  }
}

function* getCallDataHandler({ id, apiArys, callbackFunc }) {
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
          case 'PUT':
            response = yield call(Axios.put, apiInfo.url, apiInfo.params);
            break;
          case 'DELETE':
            response = yield call(Axios.delete, apiInfo.url, apiInfo.params);
            break;
          default:
            break;
        }
      }
      yield put(actions.setCallDataHandler(id, apiInfo.key, response));
    }
  }

  if (typeof callbackFunc === 'function') {
    callbackFunc(id);
  }
}

export default function* watcher(arg) {
  yield takeEvery(`${actionTypes.PUBLIC_ACTIONMETHOD_SAGA}_${arg.sagaKey || arg.id}`, submitHandlerBySaga);
  yield takeEvery(`${actionTypes.GET_CALLDATA_SAGA}_${arg.sagaKey || arg.id}`, getCallDataHandler);
}
