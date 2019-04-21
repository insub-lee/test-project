import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
});

const columSetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_GRIDCOLUMN_SEARCH:
      return state.set('userGridDefineList', action.userGridDefineList);
    case constants.LOADING_GRIDCOLUMN_SAVE:
      return state.set('resultCode', action.resultCode);
    default:
      return state;
  }
};
export default columSetReducer;
