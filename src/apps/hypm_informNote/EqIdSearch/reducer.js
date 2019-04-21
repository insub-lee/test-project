import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
});

const eqIdSearchReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_TIDNPARAM:
      return state.set('tidnList', action.tidnList);
    default:
      return state;
  }
};
export default eqIdSearchReducer;
