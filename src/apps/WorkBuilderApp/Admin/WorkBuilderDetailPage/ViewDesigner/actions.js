import * as actionTypes from './constants';
import CompItem from './CompItem/index';

export const openJsonCodeEditor = () => ({
  type: actionTypes.OPEN_JSON_CODE_EDITOR,
});

export const closeJsonCodeEditor = () => ({
  type: actionTypes.CLOSE_JSON_CODE_EDITOR,
});

export const updateJsonCode = ({ jsObject }) => ({
  type: actionTypes.UPDATE_JSON_CODE,
  jsObject,
});

export const addRow = (groupIndex, rowIndex) => ({
  type: actionTypes.ADD_ROW,
  groupIndex,
  rowIndex,
});

export const removeRow = (groupIndex, rowIndex) => ({
  type: actionTypes.REMOVE_ROW,
  groupIndex,
  rowIndex,
});

export const mergeCell = () => ({
  type: actionTypes.MERGE_CELL,
});

export const divideCell = () => ({
  type: actionTypes.DIVIDE_CELL,
});

export const selectCell = (groupIndex, rowIndex, colIndex, isCombine) => ({
  type: actionTypes.SELECT_CELL,
  groupIndex,
  rowIndex,
  colIndex,
  isCombine,
});

export const updateStyleWidth = (groupIndex, rowIndex, colIndex, width, diff) => ({
  type: actionTypes.UPDATE_STYLE_WIDTH,
  groupIndex,
  rowIndex,
  colIndex,
  width,
  diff,
});

export const updateStyleHeight = (groupIndex, rowIndex, colIndex, height) => ({
  type: actionTypes.UPDATE_STYLE_HEIGHT,
  groupIndex,
  rowIndex,
  colIndex,
  height,
});

export const updateStyleSize = (groupIndex, rowIndex, colIndex, isLast, direction, style) => ({
  type: actionTypes.UPDATE_STYLE_SIZE,
  groupIndex,
  rowIndex,
  colIndex,
  isLast,
  direction,
  style,
});

export const updateStyleRowHeight = (groupIndex, rowIndex, colIndex) => ({
  type: actionTypes.UPDATE_STYLE_ROW_HEIGHT,
  groupIndex,
  rowIndex,
  colIndex,
});

export const updateBodyStyle = (width, height) => ({
  type: actionTypes.UPDATE_BODY_STYLE,
  width,
  height,
});

export const selectStyleCell = (groupIndex, rowIndex, colIndex) => ({
  type: actionTypes.SELECT_STYLE_CELL,
  groupIndex,
  rowIndex,
  colIndex,
});

export const changeActiveTab = activeKey => ({
  type: actionTypes.CHANGE_ACTIVE_TAB,
  activeKey,
});

export const addGroup = () => ({
  type: actionTypes.ADD_GROUP,
});

export const removeGroup = groupIndex => ({
  type: actionTypes.REMOVE_GROUP,
  groupIndex,
});

export const changeGroupTitle = (groupIndex, title) => ({
  type: actionTypes.CHANGE_GROUP_TITLE,
  groupIndex,
  title,
});

export const changeUseGroupTitle = (groupIndex, useTitle) => ({
  type: actionTypes.CHANGE_USE_GROUP_TITLE,
  groupIndex,
  useTitle,
});

export const getMetaDataBySaga = (workSeq, viewType, viewID) => ({ type: actionTypes.GET_METADATA_SAGA, workSeq, viewType, viewID });

export const setSelectToolbarItemByReducer = comp => ({ type: actionTypes.SET_SELECT_TOOLBAR_ITEM_REDUCER, comp });

export const changeCompDataByReducer = (groupIndex, rowIndex, colIndex, key, value) => ({
  type: actionTypes.CHANGE_COMPDATA_REDUCER,
  groupIndex,
  rowIndex,
  colIndex,
  key,
  value,
});

export const addMetaDataBySaga = () => ({ type: actionTypes.ADD_METADATA_SAGA });

export const setInitDataByReducer = (workSeq, viewType) => ({ type: actionTypes.SET_INIT_DATA_REDUCER, workSeq, viewType });

export const setWorkInfoByReducer = (workSeq, viewType) => ({ type: actionTypes.SET_WORK_INFO_REDUCER, workSeq, viewType });

export const removeColCompByReducer = (groupIndex, rowIndex, colIndex) => ({ type: actionTypes.REMOVE_COL_COMP_REDUCER, groupIndex, rowIndex, colIndex });

export const removeCompItemByReducer = (layerIdx, compKey) => ({ type: actionTypes.REMOVE_COMPITEM_REDUCER, layerIdx, compKey });

export const changeViewDesignerNameByReducer = value => ({ type: actionTypes.CHANGE_VIEW_DESIGNER_NAME_REDUCER, value });

export const setViewDataByReducer = viewData => ({ type: actionTypes.SET_VIEW_DATA_REDUCER, viewData });

export const setCompDataByReducer = compData => ({ type: actionTypes.SET_COMP_DATA_REDUCER, compData });

export const setTopMenusByReducer = topMenus => ({ type: actionTypes.SET_TOP_MENUS_REDUCER, topMenus });

export const setViewDataCompItemByReducer = compItem => ({ type: actionTypes.SET_VIEW_DATA_COMP_ITEM_REDUCER, compItem });

export const setInitListDataByReducer = (workSeq, viewType) => ({ type: actionTypes.SET_INIT_LIST_DATA_REDUCER, workSeq, viewType });

export const getComponentPoolListBySaga = () => ({ type: actionTypes.GET_COMPONENT_POOL_SAGA });

export const setComponentPoolListByReducer = (list, group) => ({ type: actionTypes.SET_COMPONENT_POOL_REDUCER, list, group });

export const changeViewCompDataByReducer = (groupIndex, rowIndex, colIndex, key, value) => ({
  type: actionTypes.CHANGE_VIEW_COMPDATA_REDUCER,
  groupIndex,
  rowIndex,
  colIndex,
  key,
  value,
});

export const getSysMetaListBySaga = () => ({ type: actionTypes.GET_SYSMETA_LIST_SAGA });

export const setSysMetaListByReducer = (list, compList) => ({ type: actionTypes.SET_SYSMETA_LIST_REDUCER, list, compList });

export const setSysCompItemByReducer = compItem => ({ type: actionTypes.SET_SYS_COMP_ITEM_REDUCER, compItem });

export const removeHiddenCompByReducer = compIdx => ({ type: actionTypes.REMOVE_HIDDEN_COMP_REDUCER, compIdx });

export const changeColConfigByReducer = (groupIndex, rowIndex, colIndex, key, value) => ({
  type: actionTypes.CHANGE_COL_CONFIG_REDUCER,
  groupIndex,
  rowIndex,
  colIndex,
  key,
  value,
});

export const changeGroupDataByReducer = (groupIndex, key, value) => ({
  type: actionTypes.CHANGE_GROUP_DATA_REDUCER,
  groupIndex,
  key,
  value,
});
