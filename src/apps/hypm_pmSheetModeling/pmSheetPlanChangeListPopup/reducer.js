import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  PlanChangeDataList: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_GRID_PARAM:
      return state.set('PlanChangeDataList', action.PlanChangeDataList);
    default:
      return state;
  }
};
export default pmsheetReducer;
