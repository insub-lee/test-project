import * as constantTypes from './constants';

export const changeViewMode = (node, mode) => ({
  type: constantTypes.CHANGE_VIEW_MODE,
  node,
  mode,
});

export const changeCategoryInfo = (key, value) => ({
  type: constantTypes.CHANGE_CATEGORY_INFO,
  key,
  value,
});

export const saveCategoryInfo = () => ({
  type: constantTypes.SAVE_CATEGORY_INFO,
});

export const changeCategoryTreeData = treeData => ({
  type: constantTypes.CHANGE_CATEGORY_TREE_DATA,
  treeData,
});

export const getCategoryTreeData = () => ({
  type: constantTypes.GET_CATEGORY_TREE_DATA,
});

export const removeCategoryInfo = node => ({
  type: constantTypes.REMOVE_CATEGORY_INFO,
  node,
});

export const moveCategory = treeData => ({
  type: constantTypes.MOVE_CATEGORY,
  treeData,
});

export const changeSelectedIndex = selectedIndex => ({
  type: constantTypes.CHANGE_SELECTED_INDEX,
  selectedIndex,
});

export const setOnHoverKey = key => ({
  type: constantTypes.SET_ON_HOVER_KEY,
  key,
});

export const setIsWaitModalByReducr = flag => ({ type: constantTypes.SET_IS_WAIT_MODAL, flag });

export const getManualList = () => ({
  type: constantTypes.GET_MANUALLIST_SAGA,
});

export const setManualListByReducr = manualList => ({
  type: constantTypes.SET_MANUALLIST_REDUCR,
  manualList,
});

export const setListLodingByRedcr = flag => ({ type: constantTypes.SET_LIST_LODING_REDUCR, flag });

export const setPaginationIdxByReducr = idx => ({
  type: constantTypes.SET_PAGINATION_IDX_REDUCR,
  idx,
});
