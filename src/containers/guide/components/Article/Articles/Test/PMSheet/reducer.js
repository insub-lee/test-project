import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_PARAM:
      return state.set('sdptList', action.sdptList);
    case constants.LOADING_FACTORY_PARAM:
      return state
        .set('factoryList', action.factoryList)
        .set('versionList', action.versionList)
        .set('signStatusList', action.signStatusList);
    case constants.LOADING_SDPTPARAM:
      return state.set('modelList', action.modelList);
    case constants.LOADING_PMSHEETSEARCH:
      return state.set('pmSheetDataList', action.pmSheetDataList);
    case constants.LOADING_TIDNPARAM:
      return state.set('tidnList', action.tidnList);
    default:
      return state;
  }
};
export default pmsheetReducer;
