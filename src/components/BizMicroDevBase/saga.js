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
    callbackFunc(id, response);
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

function* getCallDataHandlerReturnRes({ id, apiInfo, callbackFunc }) {
  let response = {};
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
    yield put(actions.setCallDataHandler(id, apiInfo.key, response));
    if (typeof callbackFunc === 'function') {
      callbackFunc(id, response);
    }
  }
}

function* getFileDownload({ id, url, fileName, callbackFunc }) {
  const blobResponse = yield call(Axios.getDown, url);

  if (window.navigator && window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blobResponse, fileName);
  } else {
    fileName = decodeURI(fileName);
    const fileUrl = window.URL.createObjectURL(blobResponse);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (callbackFunc && typeof callbackFunc === 'function') {
    callbackFunc(id);
  }
}

function* getFileDownloadProgress({ url, fileName, onProgress, callback }) {
  const blobResponse = yield call(Axios.getDownProgress, url, {}, {}, onProgress);
  const { data, headers } = blobResponse;
  const { size } = data;
  const cdp = headers['content-disposition'];
  let downFileName = fileName;

  if (cdp.length > 0 && cdp.indexOf('filename=') > -1) {
    const splitData = cdp.split('filename=');
    if (splitData.length > 1) {
      downFileName = splitData[1].replace(';', '');
    }
  }

  if (size > 0) {
    if (window.navigator && window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(data, downFileName);
    } else {
      downFileName = decodeURI(downFileName);
      const fileUrl = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', downFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  if (typeof callback === 'function') {
    callback(data, url, downFileName);
  }
}

function* excelUpload({ url, formData, headers, callback }) {
  const response = yield call(Axios.postExcelUpload, url, formData, headers);
  if (typeof callback === 'function') {
    callback(response);
  }
}

export default function* watcher(arg) {
  yield takeEvery(`${actionTypes.PUBLIC_ACTIONMETHOD_SAGA}_${arg.sagaKey || arg.id}`, submitHandlerBySaga);
  yield takeEvery(`${actionTypes.GET_CALLDATA_SAGA}_${arg.sagaKey || arg.id}`, getCallDataHandler);
  yield takeEvery(`${actionTypes.GET_CALLDATA_SAGA_RETURN_RES}_${arg.sagaKey || arg.id}`, getCallDataHandlerReturnRes);
  yield takeEvery(`${actionTypes.GET_FILE_DOWNLOAD}_${arg.sagaKey || arg.id}`, getFileDownload);
  yield takeEvery(`${actionTypes.GET_FILE_DOWNLOAD_PROGRESS}_${arg.sagaKey || arg.id}`, getFileDownloadProgress);
  yield takeLatest(`${actionTypes.EXCEL_UPLOAD}_${arg.sagaKey || arg.id}`, excelUpload);
}
