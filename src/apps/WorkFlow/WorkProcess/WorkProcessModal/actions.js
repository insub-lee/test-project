import * as actionTypes from './constants';

export const getDeptList = payload => ({
  type: actionTypes.GET_DEPT_LIST,
  payload,
});

export const setDeptList = list => ({
  type: actionTypes.SET_DEPT_LIST,
  list,
});

export const getDeptUserList = deptId => ({
  type: actionTypes.GET_DEPT_USER_LIST,
  deptId,
});

export const setDeptUserList = list => ({
  type: actionTypes.SET_DEPT_USER_LIST,
  list,
});

export const initDeptUserList = () => ({
  type: actionTypes.INIT_DEPT_USER_LIST,
});
