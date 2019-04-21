import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
});

const serviceReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.SEARCH_SERVICE:
      return state.set('dataList', action.dataList);
    default:
      return state;
  }
};
export default serviceReducer;
