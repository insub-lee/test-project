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
    //window.location.href = `http://ssodev.skhynix.com/sso/agentless/agentless_redirect.jsp?initpage=${error.response.data.url}`;
    const cookies = new Cookies();
    cookies.remove('empNo', { path: '/' })
    cookies.remove('access_token', { path: '/' })
    window.location.href = `/api/common/v1/auth/oauth`;
  } else {
    console.log(error);
  }
}

function* getAxios(fullUrl, payload) {
  try {
    const response = yield Promise.resolve(axios({
      method: 'get',
      url: fullUrl,
      param: { ...payload },
      headers: { META: yield makeRequestHeader() },
    }));

    if (response.statusText !== 'OK') {
      return Promise.reject(response.data);
    }
    return response.data;
  } catch (error) {
    errorAxiosProcess(error);
  }
  return {};
}

function* postAxios(fullUrl, payload) {
  try {
    const response = yield Promise.resolve(axios({
      method: 'post',
      url: fullUrl,
      data: { ...payload },
      headers: { META: yield makeRequestHeader() },
    }));
    if (response.statusText !== 'OK') {
      return Promise.reject(response.data);
    }
    return response.data;
  } catch (error) {
    errorAxiosProcess(error);
  }
  return {};
}

function* putAxios(fullUrl, payload) {
  try {
    const response = yield Promise.resolve(axios({
      method: 'put',
      url: fullUrl,
      data: { ...payload },
      headers: { META: yield makeRequestHeader() },
    }));
    if (response.statusText !== 'OK') {
      return Promise.reject(response.data);
    }
    return response.data;
  } catch (error) {
    errorAxiosProcess(error);
  }
  return {};
}
function* deleteAxios(fullUrl, payload) {
  try {
    const response = yield Promise.resolve(axios({
      method: 'delete',
      url: fullUrl,
      param: { ...payload },
      headers: { META: yield makeRequestHeader() },
    }));
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
  get: (fullUrl, payload) => getAxios(fullUrl, payload),
  post: (fullUrl, payload) => postAxios(fullUrl, payload),
  put: (fullUrl, payload) => putAxios(fullUrl, payload),
  delete: config => deleteAxios(config),
};

export default Axios;
