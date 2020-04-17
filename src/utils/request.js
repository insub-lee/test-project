import axios from 'axios';
import { Cookies } from 'react-cookie';
import globalConfigs from './globalConfigs';
import { loginPage } from 'utils/commonUtils';

// const getUUID = () => getToken().get('idToken') || 'no token';
export const getMeta = () => globalConfigs.store.getState().getIn(['auth', 'meta']) || {};

const client = axios.create({
  // baseURL: process.env.REACT_APP_DOMAIN,
  // timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const request = options => {
  const optionWithMeta = {
    ...options,
    headers: {
      ...options.headers,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      META: JSON.stringify(getMeta()),
    },
  };
  console.debug('>>>> optionWithMeta', optionWithMeta);
  const onSuccess = response => {
    console.debug('Request Successful', response);
    return response.data;
  };
  const onError = error => {
    console.error('Request Failed:', error.config);
    if (error.response) {
      if (error.response.status === 401) {
        loginPage();
      }
      if (error.response.status === 404) {
        console.error('등록된 페이지가 없습니다.');
      }
      if (error.response.status === 409) {
        console.error('이미 등록된 정보가 있습니다.');
      }
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
      console.error('Error Message', error.message);
    } else {
      console.error('Error Message', error.message);
    }
    // return Promise.reject(error.response || error.message);
    // return ({ error: (error.response || error.message) });
    return { error: error.message };
  };

  return client(optionWithMeta)
    .then(onSuccess)
    .then(response => ({ response }))
    .catch(onError);
};

export default request;
