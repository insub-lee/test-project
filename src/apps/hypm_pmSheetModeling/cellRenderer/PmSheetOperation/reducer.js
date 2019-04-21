import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  pmSheetDataList: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_PMSHEET_OPERATION_PARAM:
      return state.set('pmSheetDataList', action.pmSheetDataList);
    case constants.LOADING_SAVE_PARAM:
      return state.set('save', action.save);
    default:
      return state;
  }
};
export default pmsheetReducer;
