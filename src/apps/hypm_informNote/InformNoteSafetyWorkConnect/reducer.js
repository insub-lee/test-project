import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
});

const pmsheetReducer = (state = initState, action) => {

  switch (action.type) {
    case constants.LOADING_SAFEWORK_CONNECT_SEARCH:
      return state.set('connectSearch', action.connectSearch);  
    default:
      return state;
  }
};

export default pmsheetReducer;
