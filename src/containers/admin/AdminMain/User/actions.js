import * as constants from './constants';

export const getUser = userId => ({
  type: constants.GET_USER_DATA,
  userId,
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

export const getDeptComboData = () => ({
  type: constants.GET_DEPT_COMBO_LIST,
});

export const getChangeDeptTreeData = DEPT_ID => ({
  type: constants.GET_CHANGE_DEPT_DATA,
  DEPT_ID,
});

export const getDutyComboData = () => ({
  type: constants.GET_DUTY_COMBO_LIST,
});

export const getChangeDutyTreeData = DUTY_ID => ({
  type: constants.GET_CHANGE_DUTY_DATA,
  DUTY_ID,
});

export const getPSTNComboData = () => ({
  type: constants.GET_PSTN_COMBO_LIST,
});

export const getChangePSTNTreeData = PSTN_ID => ({
  type: constants.GET_CHANGE_PSTN_DATA,
  PSTN_ID,
});
