import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  WrokTimeDataList: [],
  OperationDataList: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_GRID_PARAM:
      return state.set('WrokTimeDataList', action.WrokTimeDataList).set('OperationDataList', action.OperationDataList);
    // case constants.LOADING_SAVE_WORKTIME:
    //   return state.set('saveDataList', action.saveDataList);
    default:
      return state;
  }
};
export default pmsheetReducer;
