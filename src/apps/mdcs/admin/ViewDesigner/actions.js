import * as actionTypes from './constants';

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

export const getMetaData = workSeq => ({ type: actionTypes.GET_METADATA_BY_SAGA, workSeq });

export const setSelectToolbarItemByReducer = compType => ({ type: actionTypes.SET_SELECT_TOOLBAR_ITEM_REDUCER, compType });

export const changeCompDataByReducer = (groupIndex, rowIndex, colIndex, key, value) => ({
  type: actionTypes.CHANGE_COMPDATA_REDUCER,
  groupIndex,
  rowIndex,
  colIndex,
  key,
  value,
});

export const addMetaDataBySaga = () => ({ type: actionTypes.ADD_METADATA_BY_SAGA });

export const setWorkInfoByReducer = (workSeq, viewType) => ({ type: actionTypes.SET_WORK_INFO_REDUCER, workSeq, viewType });
