import * as actionTypes from './constants';

export const getRootMapList = payload => ({
  type: actionTypes.GET_ROOTMAP_LIST,
  payload,
});

export const setRootMapList = rootMapList => ({
  type: actionTypes.SET_ROOTMAP_LIST,
  rootMapList,
});

export const setVisibleModal = visibleModal => ({
  type: actionTypes.SET_VISIBLE_MODAL,
  visibleModal,
});

export const addRootMap = rootMapInfo => ({
  type: actionTypes.ADD_ROOTMAP,
  rootMapInfo,
});

export const updateRootMap = rootMapInfo => ({
  type: actionTypes.UPDATE_ROOTMAP,
  rootMapInfo,
});

export const deleteRootMap = payload => ({
  type: actionTypes.DELETE_ROOTMAP,
  payload,
});

export const setSelectedRowKeys = selectedRowKeys => ({
  type: actionTypes.SET_SELECTED_ROW_KEYS,
  selectedRowKeys,
});

export const setSelectedRootMap = rootMap => ({
  type: actionTypes.SET_SELECTED_ROOTMAP,
  rootMap,
});
