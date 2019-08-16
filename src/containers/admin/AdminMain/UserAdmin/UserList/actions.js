import * as actionTypes from './constants';

export const getUserList = (sNum, eNum, userList, sortColumn, sortDirection, statusCode, keywordType, keyword, deptId, pstnId) => (
  {
    type: actionTypes.GET_USER_LIST,
    payload: {
      sNum,
      eNum,
      userList,
      sortColumn,
      sortDirection,
      statusCode,
      keywordType,
      keyword,
      deptId,
      pstnId,
    },
  }
);

export const getDeptComboData = () => ({
  type: actionTypes.GET_DEPT_COMBO_LIST,
});

export const getChangeDeptTreeData = DEPT_ID => ({
  type: actionTypes.GET_CHANGE_DEPT_DATA,
  DEPT_ID,
});

export const getDutyComboData = () => ({
  type: actionTypes.GET_DUTY_COMBO_LIST,
});

export const getChangeDutyTreeData = DUTY_ID => ({
  type: actionTypes.GET_CHANGE_DUTY_DATA,
  DUTY_ID,
});

export const getPSTNComboData = () => ({
  type: actionTypes.GET_PSTN_COMBO_LIST,
});

export const getChangePSTNTreeData = PSTN_ID => ({
  type: actionTypes.GET_CHANGE_PSTN_DATA,
  PSTN_ID,
});

export const getRANKComboData = () => ({
  type: actionTypes.GET_RANK_COMBO_LIST,
});

export const getChangeRANKTreeData = RANK_ID => ({
  type: actionTypes.GET_CHANGE_RANK_DATA,
  RANK_ID,
});