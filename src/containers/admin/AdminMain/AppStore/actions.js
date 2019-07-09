import { fromJS } from 'immutable';

import * as constants from './constants';

export const getCategoryComboList = () => (
  {
    type: constants.GET_CATEGORY_COMBO_LIST,
  }
);

export const getCategoryData = siteId => ({
  type: constants.GET_CATEGORY_DATA,
  siteId,
});


export const insertCategory = (SITE_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN) => ({
  type: constants.INSERT_CATEGORY,
  payload: {
    SITE_ID,
    PRNT_ID,
    NAME_KOR,
    NAME_ENG,
    NAME_CHN,
  },
});

export const updateCategory = (SITE_ID, CATG_ID, NAME_KOR, NAME_ENG, NAME_CHN, DSCR_KOR, DSCR_ENG, DSCR_CHN) => ({
  type: constants.UPDATE_CATEGORY,
  payload: {
    SITE_ID,
    CATG_ID,
    NAME_KOR,
    NAME_ENG,
    NAME_CHN,
    DSCR_KOR,
    DSCR_ENG,
    DSCR_CHN,
  },
});

export const saveData = (tempRowInfo, categoryData) => ({
  type: constants.SAVE_DATA,
  tempRowInfo,
  categoryData: fromJS(categoryData),
});

export const changeSelectedIndex = selectedIndex => ({
  type: constants.SET_SELECTED_INDEX,
  selectedIndex,
});

export const moveNode = treeData => ({
  type: constants.MOVE_MYMENU,
  treeData,
});

export const insertNode = (rowInfo, treeData, data, history) => ({
  type: constants.INSERT_NODE,
  rowInfo,
  treeData,
  data,
  history,
});

export const updateNode = (rowInfo, treeData, data, history) => ({
  type: constants.UPDATE_NODE,
  rowInfo,
  treeData,
  data,
  history,
});

export const deleteNode = (rowInfo, categoryData, history) => ({
  type: constants.DELETE_NODE,
  rowInfo,
  categoryData,
  history,
});

export const updateMymenuDisp = () => ({
  type: constants.UPDATE_MYMENU_DISP,
});
