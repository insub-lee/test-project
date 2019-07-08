import * as constants from './constants';

export const getRankComboList = RANK_ID => ({
  type: constants.GET_RANK_COMBO_LIST,
  RANK_ID,
});

export const getRankTreeData = () => ({
  type: constants.GET_RANK_DATA,
});

export const getChangeRankTreeData = RANK_ID => ({
  type: constants.GET_CHANGE_RANK_DATA,
  RANK_ID,
});

export const insertRank = (
  RANK_CD,
  PRNT_ID,
  NAME_KOR,
  NAME_ENG,
  NAME_CHN,
  NAME_JPN,
  NAME_ETC,
  COMP_CD,
  selectedDept,
) => ({
  type: constants.INSERT_RANK,
  payload: {
    RANK_CD,
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

export const updateRank = (
  RANK_ID,
  RANK_CD,
  PRNT_ID,
  NAME_KOR,
  NAME_ENG,
  NAME_CHN,
  NAME_JPN,
  NAME_ETC,
  COMP_CD,
  selectedDept,
) => ({
  type: constants.UPDATE_RANK,
  payload: {
    RANK_ID,
    RANK_CD,
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

export const deleteRank = (RANK_ID, PRNT_ID, SORT_SQ, selectedDept) => ({
  type: constants.DELETE_RANK,
  payload: {
    RANK_ID,
    PRNT_ID,
    SORT_SQ,
    selectedDept,
  },
});

export const moveRank = (PRNT_ID, treeData) => ({
  type: constants.MOVE_RANK,
  PRNT_ID,
  treeData,
});

export const updateMenuDisp = () => ({
  type: constants.UPDATE_MENU_DISP,
});
