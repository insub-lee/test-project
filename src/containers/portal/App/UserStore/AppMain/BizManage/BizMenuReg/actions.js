import { fromJS } from 'immutable';

import * as constants from './constants';

export const initCategoryData = (BIZGRP_ID, SELECTED_INDEX) => ({
  type: constants.INIT_CATEGORY_DATA,
  BIZGRP_ID,
  SELECTED_INDEX,
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

export const moveNode = (BIZGRP_ID, treeData) => ({
  type: constants.MOVE_MYMENU,
  BIZGRP_ID,
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
