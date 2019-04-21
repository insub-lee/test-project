import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  fabList: [],
  teamList: [],
  sdptList: [],
  flList: [],
  modelList: [],
  auartList: [],
  downTypeList: [],
  inspLotStatusList: [],
  createGbList: [],
  pmSheetDataList: [],
  tidnList: [],
  userDefine: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_FAB_PARAM:
      return state.set('fabList', action.fabList)
        .set('versionList', action.versionList)
        .set('signStatusList', action.signStatusList)
        .set('tidnList', []);    
    case constants.LOADING_DEFAULT_PARAM:
      return state.set('teamList', action.teamList)
        .set('sdptList', action.sdptList)
        .set('flList', action.flList)
        .set('modelList', action.modelList)
        .set('tidnList', []);
    case constants.LOADING_PARAM:
      return state.set('teamList', action.teamList)
        .set('sdptList', action.sdptList)
        .set('flList', action.flList)
        .set('modelList', action.modelList)
        .set('tidnList', []);
    case constants.LOADING_TEAMPARAM:
      return state.set('sdptList', action.sdptList)
        .set('flList', action.flList)
        .set('tidnList', []);
    case constants.LOADING_SDPTPARAM:
      return state.set('modelList', action.modelList)
        .set('tidnList', []);
    case constants.LOADING_AUARTPARAM:
      return state.set('auartList', action.auartList);
    case constants.LOADING_DOWNTYPEPARAM:
      return state.set('downTypeList', action.downTypeList);
    case constants.LOADING_INSPLOTSATUSPARAM:
      return state.set('inspLotStatusList', action.inspLotStatusList);
    case constants.LOADING_CREATEGBPARAM:
      return state.set('createGbList', action.createGbList);
    case constants.LOADING_PMSHEETLISTSEARCH:
      return state.set('pmSheetDataList', action.pmSheetDataList);
    case constants.LOADING_TIDNPARAM:
      return state.set('tidnList', action.tidnList);
    case constants.GET_USER_COMPANY_DEFINE:
      return state.set('userDefine', action.define);
    default:
      return state;
  }
};
export default pmsheetReducer;
