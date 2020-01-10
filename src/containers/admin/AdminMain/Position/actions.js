import * as constants from './constants';

export const getPstnComboList = PSTN_ID => ({
  type: constants.GET_PSTN_COMBO_LIST,
  PSTN_ID,
});

export const getPstnTreeData = () => ({
  type: constants.GET_PSTN_DATA,
});

export const getChangePstnTreeData = PSTN_ID => ({
  type: constants.GET_CHANGE_PSTN_DATA,
  PSTN_ID,
});

export const insertPstn = (PSTN_CD, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN, NAME_JPN, NAME_ETC, COMP_CD, selectedDept) => ({
  type: constants.INSERT_PSTN,
  payload: {
    PSTN_CD,
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

export const updatePstn = (PSTN_ID, PSTN_CD, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN, NAME_JPN, NAME_ETC, COMP_CD, selectedDept) => ({
  type: constants.UPDATE_PSTN,
  payload: {
    PSTN_ID,
    PSTN_CD,
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

export const deletePstn = (PSTN_ID, PRNT_ID, SORT_SQ, selectedDept) => ({
  type: constants.DELETE_PSTN,
  payload: {
    PSTN_ID,
    PRNT_ID,
    SORT_SQ,
    selectedDept,
  },
});

export const movePosition = (PRNT_ID, treeData) => ({
  type: constants.MOVE_PSTN,
  PRNT_ID,
  treeData,
});

export const updateMenuDisp = () => ({
  type: constants.UPDATE_MENU_DISP,
});
