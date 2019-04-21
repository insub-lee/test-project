import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  delayCauseDetail: [],
  // dangerTaskList: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_FAB_PARAMTEST:
      return state.set('delayCauseDetail', action.delayCauseDetail);
    default:
      return state;
  }
};
export default pmsheetReducer;
