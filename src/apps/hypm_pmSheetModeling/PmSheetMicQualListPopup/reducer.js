import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  checkListDataList: [],
  pmTypeCombo: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_PARAM:
      return state.set('checkListDataList', action.value)
      .set('pmTypeCombo', action.pmTypeCombo)
      .set('masseinhswGridCombo', action.masseinhswGridCombo);
    default:
      return state;
  }
};
export default pmsheetReducer;
