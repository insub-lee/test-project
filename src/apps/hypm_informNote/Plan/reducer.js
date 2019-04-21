import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  planDataList: [],
  resultCode: '',
});

const planReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_PLANPARAM:
      return state.set('planDataList', action.planDataList)
        .set('resultCode', action.resultCode);
    default:
      return state;
  }
};
export default planReducer;
