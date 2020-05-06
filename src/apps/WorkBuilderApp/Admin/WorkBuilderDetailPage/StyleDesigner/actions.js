import * as actionTypes from './constants';

export const getMetaDataBySaga = (workSeq, viewType, viewID) => ({ type: actionTypes.GET_METADATA_SAGA, workSeq, viewType, viewID });

export const setInitDataByReducer = (workSeq, viewType) => ({ type: actionTypes.SET_INIT_DATA_REDUCER, workSeq, viewType });

export const setWorkInfoByReducer = (workSeq, viewType) => ({ type: actionTypes.SET_WORK_INFO_REDUCER, workSeq, viewType });

export const setViewDataByReducer = viewData => ({ type: actionTypes.SET_VIEW_DATA_REDUCER, viewData });

export const setCompDataByReducer = compData => ({ type: actionTypes.SET_COMP_DATA_REDUCER, compData });

export const setTopMenusByReducer = topMenus => ({ type: actionTypes.SET_TOP_MENUS_REDUCER, topMenus });

export const setInitListDataByReducer = (workSeq, viewType) => ({ type: actionTypes.SET_INIT_LIST_DATA_REDUCER, workSeq, viewType });

export const setComponentPoolListByReducer = (list, group) => ({ type: actionTypes.SET_COMPONENT_POOL_REDUCER, list, group });

export const setSysMetaListByReducer = (list, compList) => ({ type: actionTypes.SET_SYSMETA_LIST_REDUCER, list, compList });

export const enableContentLoading = () => ({
  type: actionTypes.ENABLE_CONTENT_LOADING,
});

export const disableContentLoading = () => ({
  type: actionTypes.DISABLE_CONTENT_LOADING,
});

// Column Widths
export const onChangeWidths = (groupIndex, widths) => ({
  type: actionTypes.ON_CHANGE_WIDTHS,
  groupIndex,
  widths,
});

// Cell Heights
export const onChangeHeights = (groupIndex, heights) => ({
  type: actionTypes.ON_CHANGE_HEIGHTS,
  groupIndex,
  heights,
});

export const updateCellStyle = (groupIndex, rowIndex, colIndex, key, value) => ({
  type: actionTypes.UPDATE_CELL_STYLE,
  groupIndex,
  rowIndex,
  colIndex,
  key,
  value,
});

export const addMetaDataBySaga = callbackFunc => ({ type: actionTypes.ADD_METADATA_SAGA, callbackFunc });
