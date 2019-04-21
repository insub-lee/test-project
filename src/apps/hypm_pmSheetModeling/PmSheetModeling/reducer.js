import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  fabList: [],
  teamList: [],
  sdptList: [],
  flList: [],
  versionList: [],
  signStatusList: [],
  modelList: [],
  pmSheetDataList: [],
  pmTypeCombo: [],
  stratCombo: [],
  searchSuccess: false,
  // EV_SUBRC: "",
  copySdptCombo: [],
  copyModelCombo: [],

});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_FAB_PARAM:
      return state.set('fabList', action.fabList)
        .set('pmTypeCombo', action.pmTypeCombo)
        .set('stratCombo', action.stratCombo);        
      // .set('signStatusList', action.signStatusList);
    case constants.LOADING_PARAM:
      return state.set('teamList', action.teamList)
        .set('sdptList', action.sdptList)
        .set('flList', action.flList);
      // .set('modelList', action.modelList);
    case constants.LOADING_TEAMPARAM:
      return state.set('sdptList', action.sdptList)
        .set('flList', action.flList);
      // .set('modelList', action.modelList);
    case constants.LOADING_SDPTPARAM:
      return state.set('modelList', action.modelList);
    case constants.LOADING_PMSHEETSEARCH:
      return state.set('pmSheetDataList', action.pmSheetDataList)
        .set('searchSuccess', action.searchSuccess);
    case constants.COPY_SDPT_COMBO:
      return state.set('copySdptCombo', action.comboList);
    case constants.COPY_MODEL_COMBO:
      return state.set('copyModelCombo', action.comboList);
      
    default:
      return state;
  }
};
export default pmsheetReducer;
