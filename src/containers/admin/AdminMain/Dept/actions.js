import * as constants from './constants';

export const getDeptComboList = DEPT_ID => ({
  type: constants.GET_DEPT_COMBO_LIST,
  DEPT_ID,
});

export const getDeptTreeData = () => ({
  type: constants.GET_DEPT_DATA,
});

export const getChangeDeptTreeData = DEPT_ID => ({
  type: constants.GET_CHANGE_DEPT_DATA,
  DEPT_ID,
});

export const insertDept = (
  DEPT_CD,
  PRNT_ID,
  NAME_KOR,
  NAME_ENG,
  NAME_CHN,
  NAME_JPN,
  NAME_ETC,
  COMP_CD,
  selectedDept,
) => ({
  type: constants.INSERT_DEPT,
  payload: {
    DEPT_CD,
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

export const updateDept = (
  DEPT_ID,
  DEPT_CD,
  PRNT_ID,
  NAME_KOR,
  NAME_ENG,
  NAME_CHN,
  NAME_JPN,
  NAME_ETC,
  COMP_CD,
  selectedDept,
) => ({
  type: constants.UPDATE_DEPT,
  payload: {
    DEPT_ID,
    DEPT_CD,
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

export const deleteDept = (DEPT_ID, PRNT_ID, SORT_SQ, selectedDept) => ({
  type: constants.DELETE_DEPT,
  payload: {
    DEPT_ID,
    PRNT_ID,
    SORT_SQ,
    selectedDept,
  },
});

export const moveDept = (PRNT_ID, treeData) => ({
  type: constants.MOVE_DEPT,
  PRNT_ID,
  treeData,
});

export const updateMenuDisp = () => ({
  type: constants.UPDATE_MENU_DISP,
});
