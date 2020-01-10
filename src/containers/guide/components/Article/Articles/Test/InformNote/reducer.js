import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
});

const pmsheetReducer = (state = initState, action) => {
  console.log('test1');
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
    default:
      return state;
  }
};
export default pmsheetReducer;
