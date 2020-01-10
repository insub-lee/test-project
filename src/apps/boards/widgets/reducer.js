import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  getIfBoardDataList: [],
  getDetailBoardData: '',
  catePageList: [],
});

const IfBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_IFBOARD_DATA_LIST:
      return state.set('getIfBoardDataList', action.payload);
    case constants.SET_IFCOARD_DETAIL_DATA_LIST:
      return state.set('getDetailBoardData', action.result);
    case constants.CATE_PAGE_LIST:
      return state.set('catePageList', action.payload);
    default:
      return state;
  }
};

export default IfBoardReducer;
