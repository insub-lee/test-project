import { AUTH_REQUEST, AUTH_REQUEST_UUID, AUTH_SUCCESS, AUTH_CHECK, AUTH_LOADING, CHANGE_LANG } from './constants';

export const authRequest = empNo => ({
  type: AUTH_REQUEST,
  payload: {
    empNo,
  },
});
export const authRequestUuid = uuid => ({
  type: AUTH_REQUEST_UUID,
  payload: {
    uuid,
  },
});
export const authSuccess = sKey => ({
  type: AUTH_SUCCESS,
  payload: {
    sKey,
  },
});
export const checkAuthorization = (url, pathname, username) => ({
  type: AUTH_CHECK,
  payload: {
    url,
    pathname,
    username,
  },
});
export const loadAuthorization = url => ({
  type: AUTH_LOADING,
  payload: {
    url,
  },
});

export const changeLang = lang => ({
  type: CHANGE_LANG,
  lang,
});
