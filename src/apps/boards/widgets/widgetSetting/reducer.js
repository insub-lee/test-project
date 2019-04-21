import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  getIfBoardCfgGrpList: [],
  getIfBoardCfgCateList: [],
  item: [],
  widgetId: '',
  pageId: '',
  grSeq: 0,
});

const ifBoardConfReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_IFBOARD_CFG_GRP_LIST:
      return state.set('getIfBoardCfgGrpList', action.payload);
    case constants.SET_IFBOARD_CFG_CATE_LIST:
      return state.set('getIfBoardCfgCateList', action.payload);      
    case constants.UPDATE_GRID_DATA:
      return state.set('getIfBoardCfgDataList', action.payload);
    case constants.SET_IFBOARD_CFG:
      return state.set('item', action.item).set('widgetId', action.widgetId).set('pageId', action.pageId);
    case constants.SET_BIZIFBOARD_CFG:
      return state.set('item', action.item).set('widgetId', action.widgetId).set('pageId', action.pageId);
    case constants.SET_GR_SEQ:
      return state.set('grSeq', action.payload);
    default:
      return state;
  }
};

export default ifBoardConfReducer;