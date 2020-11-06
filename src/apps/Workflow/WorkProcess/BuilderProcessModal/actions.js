import * as actionTypes from './constants';

export const getDeptList = callbackFunc => ({
  type: actionTypes.GET_DEPT_LIST,
  callbackFunc,
});

export const setDeptList = list => ({
  type: actionTypes.SET_DEPT_LIST,
  list,
});

export const getDeptUserList = (deptId, callbackFunc) => ({
  type: actionTypes.GET_DEPT_USER_LIST,
  deptId,
  callbackFunc,
});

export const setDeptUserList = list => ({
  type: actionTypes.SET_DEPT_USER_LIST,
  list,
});

export const initDeptUserList = () => ({
  type: actionTypes.INIT_DEPT_USER_LIST,
});

export const submitHandlerBySaga = (id, httpMethod, apiUrl, submitData, callbackFunc) => ({
  type: actionTypes.PUBLIC_ACTIONMETHOD_SAGA,
  id,
  httpMethod,
  apiUrl,
  submitData,
  callbackFunc,
});

export const getUserListByName = (payload, callbackFunc) => ({
  type: actionTypes.GET_USER_LIST_BY_NAME,
  payload,
  callbackFunc,
});

export const getDeptListByName = (payload, callbackFunc) => ({
  type: actionTypes.GET_DEPT_LIST_BY_NAME,
  payload,
  callbackFunc,
});
