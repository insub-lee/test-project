import axios from 'axios';
import { select } from 'redux-saga/effects';
import { loginPage } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';

function* makeRequestHeader() {
  const authInfo = yield select(state => state.get('auth'));
  const META = authInfo.get('meta');
  return JSON.stringify(META);
}

function errorAxiosProcess(error) {
  console.error(`${error.response.status} ${error.response.statusText}`, error);
  if (error.response.status === 401 || error.response.status === 403) {
    // TODO 사이트접속권한없을 경우 메시지 처리
    feed.error(`${error.response.status} ${error.response.statusText}`, '로그인 페이지로 이동합니다.', loginPage, loginPage);
  }
}

function* getAxios(fullUrl, payload, headers) {
  try {
    const response = yield Promise.resolve(
      axios({
        method: 'get',
        url: fullUrl,
        param: { ...payload },
        headers: { ...headers, META: yield makeRequestHeader() },
      }),
    );

    if (response.statusText !== 'OK') {
      return Promise.reject(response.data);
    }
    return response.data;
  } catch (error) {
    errorAxiosProcess(error);
  }
  return {};
}

function* postAxios(fullUrl, payload, headers) {
  try {
    const response = yield Promise.resolve(
      axios({
        method: 'post',
        url: fullUrl,
        data: { ...payload },
        headers: { ...headers, META: yield makeRequestHeader() },
      }),
    );
    if (response.statusText !== 'OK') {
      return Promise.reject(response.data);
    }
    return response.data;
  } catch (error) {
    errorAxiosProcess(error);
  }
  return {};
}

function* putAxios(fullUrl, payload, headers) {
  try {
    const response = yield Promise.resolve(
      axios({
        method: 'put',
        url: fullUrl,
        data: { ...payload },
        headers: { ...headers, META: yield makeRequestHeader() },
      }),
    );
    if (response.statusText !== 'OK') {
      return Promise.reject(response.data);
    }
    return response.data;
  } catch (error) {
    errorAxiosProcess(error);
  }
  return {};
}
function* deleteAxios(fullUrl, payload, headers) {
  try {
    const response = yield Promise.resolve(
      axios({
        method: 'delete',
        url: fullUrl,
        data: { ...payload },
        headers: { ...headers, META: yield makeRequestHeader() },
      }),
    );
    if (response.statusText !== 'OK') {
      return Promise.reject(response.data);
    }
    return response.data;
  } catch (error) {
    errorAxiosProcess(error);
  }
  return {};
}

function* getFileDownAxios(fullUrl, payload, headers) {
  try {
    const response = yield Promise.resolve(
      axios({
        method: 'get',
        url: fullUrl,
        param: { ...payload },
        headers: { ...headers, META: yield makeRequestHeader() },
        responseType: 'blob',
      }),
    );

    if (response.statusText !== 'OK') {
      return Promise.reject(response.data);
    }
    return response.data;
  } catch (error) {
    errorAxiosProcess(error);
  }
  return {};
}

function* postNoResponseAxios(fullUrl, payload, headers) {
  try {
    axios({
      method: 'post',
      url: fullUrl,
      data: { ...payload },
      headers: { ...headers, META: yield makeRequestHeader() },
    });
  } catch (error) {
    errorAxiosProcess(error);
  }
}

function* getFileDownProgressAxios(fullUrl, payload, headers, onProgress) {
  try {
    const response = yield Promise.resolve(
      axios({
        method: 'get',
        url: fullUrl,
        param: { ...payload },
        headers: { ...headers, META: yield makeRequestHeader() },
        responseType: 'blob',
        onDownloadProgress: progressEvent => {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        },
      }),
    );

    if (response.statusText !== 'OK') {
      return Promise.reject(response.data);
    }
    return response.data;
  } catch (error) {
    errorAxiosProcess(error);
  }
  return {};
}

export const Axios = {
  get: (fullUrl, payload, headers) => getAxios(fullUrl, payload, headers),
  post: (fullUrl, payload, headers) => postAxios(fullUrl, payload, headers),
  put: (fullUrl, payload, headers) => putAxios(fullUrl, payload, headers),
  delete: (fullUrl, payload, headers) => deleteAxios(fullUrl, payload, headers),
  getDown: (fullUrl, payload, headers) => getFileDownAxios(fullUrl, payload, headers),
  getDownProgress: (fullUrl, payload, headers, onProgress) => getFileDownProgressAxios(fullUrl, payload, headers, onProgress),
  postNoResponse: (fullUrl, payload, headers) => postNoResponseAxios(fullUrl, payload, headers),
};

export default Axios;
