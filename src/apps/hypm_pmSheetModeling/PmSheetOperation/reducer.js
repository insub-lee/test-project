import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  pmSheetDataList: [],
  pmTypeCombo: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_PMSHEET_OPERATION_PARAM:
      return state.set('pmSheetDataList', action.pmSheetDataList).set('pmTypeCombo', action.pmTypeCombo).set('pmTypeCombo2', action.pmTypeCombo2);
    case constants.LOADING_SAVE_PARAM:
      return state.set('save', action.save);
    default:
      return state;
  }
};
export default pmsheetReducer;
