import * as constants from './constants';

export const getUser = empNo => ({
  type: constants.GET_USER_DATA,
  empNo,
});

export const insertUser = userInfo => ({
  type: constants.INSERT_USER_DATA,
  userInfo,
});

export const updateUser = userInfo => ({
  type: constants.UPDATE_USER_DATA,
  userInfo,
});

export const checkEmpNo = empNo => (
  {
    type: constants.GET_EMPNO,
    empNo,
  }
);
