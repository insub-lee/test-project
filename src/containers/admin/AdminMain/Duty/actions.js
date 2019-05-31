import * as constants from './constants';

export const getDutyComboList = DUTY_ID => ({
  type: constants.GET_DUTY_COMBO_LIST,
  DUTY_ID,
});

export const getDutyTreeData = () => ({
  type: constants.GET_DUTY_DATA,
});

export const getChangeDutyTreeData = DUTY_ID => ({
  type: constants.GET_CHANGE_DUTY_DATA,
  DUTY_ID,
});

export const insertDuty = (
  DUTY_CD,
  PRNT_ID,
  NAME_KOR,
  NAME_ENG,
  NAME_CHN,
  NAME_JPN,
  NAME_ETC,
  COMP_CD,
  selectedDept,
) => ({
  type: constants.INSERT_DUTY,
  payload: {
    DUTY_CD,
    PRNT_ID,
    NAME_KOR,
    NAME_ENG,
    NAME_CHN,
    NAME_JPN,
    NAME_ETC,
    COMP_CD,
    selectedDept,
  },
});

export const updateDuty = (
  DUTY_ID,
  DUTY_CD,
  PRNT_ID,
  NAME_KOR,
  NAME_ENG,
  NAME_CHN,
  NAME_JPN,
  NAME_ETC,
  COMP_CD,
  selectedDept,
) => ({
  type: constants.UPDATE_DUTY,
  payload: {
    DUTY_ID,
    DUTY_CD,
    PRNT_ID,
    NAME_KOR,
    NAME_ENG,
    NAME_CHN,
    NAME_JPN,
    NAME_ETC,
    COMP_CD,
    selectedDept,
  },
});

export const deleteDuty = (DUTY_ID, PRNT_ID, SORT_SQ, selectedDept) => ({
  type: constants.DELETE_DUTY,
  payload: {
    DUTY_ID,
    PRNT_ID,
    SORT_SQ,
    selectedDept,
  },
});

export const moveDuty = (PRNT_ID, treeData) => ({
  type: constants.MOVE_DUTY,
  PRNT_ID,
  treeData,
});

export const updateMenuDisp = () => ({
  type: constants.UPDATE_MENU_DISP,
});
