import axios from 'axios';
import { select } from 'redux-saga/effects';
import { Cookies } from 'react-cookie';

function* makeRequestHeader() {
  const authInfo = yield select(state => state.get('auth'));
  const META = authInfo.get('meta');
  return JSON.stringify(META);
}

function errorAxiosProcess(error) {
  if (error.response.status === 401) {
    const cookies = new Cookies();
    cookies.remove('empNo', { path: '/' });
    cookies.remove('access_token', { path: '/' });
    window.location.href = `/api/common/v1/auth/oauth`;
  } else {
    console.log(error);
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
};

export const Axios = {
  get: (fullUrl, payload, headers) => getAxios(fullUrl, payload, headers),
  post: (fullUrl, payload, headers) => postAxios(fullUrl, payload, headers),
  put: (fullUrl, payload, headers) => putAxios(fullUrl, payload, headers),
  delete: (fullUrl, payload, headers) => deleteAxios(fullUrl, payload, headers),
  getDown: (fullUrl, payload, headers) => getFileDownAxios(fullUrl, payload, headers),
};

export default Axios;
