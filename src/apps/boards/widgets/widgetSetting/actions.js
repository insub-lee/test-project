import { fromJS } from 'immutable';
import * as constants from './constants';

export const getIfBoardCfgGrpList = grKeyword => ({
  type: constants.GET_IFBOARD_CFG_GRP_LIST,
  grKeyword,
});
export const getIfBoardCfgCateList = (grSeq, ctKeyword) => ({
  type: constants.GET_IFBOARD_CFG_CATE_LIST,
  grSeq,
  ctKeyword,
});
export const updateGridData = data => ({
  type: constants.UPDATE_GRID_DATA,
  payload: fromJS(data),
});
export const deleteIfBoardCfg = (item, widgetId, pageId) => ({
  type: constants.DELETE_IFBOARD_CFG,
  item,
  widgetId,
  pageId,
});
export const deleteBizIfBoardCfg = (item, widgetId, pageId) => ({
  type: constants.DELETE_BIZIFBOARD_CFG,
  item,
  widgetId,
  pageId,
});
