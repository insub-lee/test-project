import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  pmBomTreeList: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.SET_MASTER_PMBOM:
      return state.set('pmBomTreeList', action.pmBomTreeList);
    default:
      return state;
  }
};
export default pmsheetReducer;
