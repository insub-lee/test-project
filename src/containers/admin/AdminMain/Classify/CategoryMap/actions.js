import * as constantTypes from './constants';

export const getRootMapList = payload => ({
  type: constantTypes.GET_ROOTMAP_LIST,
  payload,
});

export const setRootMapList = rootMapList => ({
  type: constantTypes.SET_ROOTMAP_LIST,
  rootMapList,
});

export const getCategoryMapList = payload => ({
  type: constantTypes.GET_CATEGORYMAP_LIST,
  payload,
});

export const setCategoryMapList = categoryMapList => ({
  type: constantTypes.SET_CATEGORYMAP_LIST,
  categoryMapList,
});

export const setSelectedNode = selectedNode => ({
  type: constantTypes.SET_SELECTED_NODE,
  selectedNode,
});

export const addCategoryMap = categoryMap => ({
  type: constantTypes.ADD_CATEGORY_MAP,
  categoryMap,
});

export const updateCategoryMap = categoryMap => ({
  type: constantTypes.UPDATE_CATEGORY_MAP,
  categoryMap,
});

export const deleteCategoryMap = categoryMap => ({
  type: constantTypes.DELETE_CATEGORY_MAP,
  categoryMap,
});

export const setIsAdd = isAdd => ({
  type: constantTypes.SET_IS_ADD,
  isAdd,
});

export const initAddNodeInfo = () => ({
  type: constantTypes.INIT_ADDNODE_INFO,
});

export const setAddNodeInfo = nodeInfo => ({
  type: constantTypes.SET_ADDNODE_INFO,
  nodeInfo,
});

export const updateCategoryMapList = updateData => ({
  type: constantTypes.UPDATE_CATEGORYMAP_LIST,
  updateData,
});
