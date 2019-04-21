import { fromJS } from 'immutable';

import * as constants from './constants';

export const initCategoryData = () => ({
  type: constants.INIT_CATEGORY_DATA,
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

// export const changeTitleModalVisible = titleModalVisible => ({
//   type: constants.SET_TITLE_MODAL_VISIBLE,
//   titleModalVisible,
// });

export const moveNode = treeData => ({
  type: constants.MOVE_MYMENU,
  treeData,
});

export const addEmptyNode = (rowInfo, data, categoryData, history) => ({
  type: constants.ADD_EMPTY_NODE,
  rowInfo,
  data,
  categoryData,
  history,
});

export const updateNode = (rowInfo, categoryData, history) => ({
  type: constants.UPDATE_NODE,
  rowInfo,
  categoryData,
  history,
});

export const deleteNode = (rowInfo, categoryData, history) => ({
  type: constants.DELETE_NODE,
  rowInfo,
  categoryData,
  history,
});

export const updateBizGroupDelYn = (rowInfo, categoryData, data) => ({
  type: constants.UPDATE_BIZGROUP_DELYN,
  rowInfo,
  categoryData,
  data,
});
