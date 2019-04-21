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
  informNoticeList: [],
});

const pmsheetReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_FAB_PARAM:
      return state.set('fabList', action.fabList)
        .set('versionList', action.versionList)
        .set('signStatusList', action.signStatusList);
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
    case constants.LOADING_INFORMNOTICE:
      return state.set('informNoticeList', action.informNoticeList);
    default:
      return state;
  }
};
export default pmsheetReducer;
