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
  hotPopDataList: [],
  hotPopDataDetailList: [],
  tidnList: [],
});

const hotpopupReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.LOADING_PARAM:
      return state.set('hotPopDataList', action.hotPopDataList);
    case constants.LOADING_DEFINE_GET:
      return state.set('hotPopDataDetailList', action.hotPopDataDetailList);
    case constants.LOADING_DEFINE_DETAIL_GET:
      return state.set('hotPopDataDetailList', action.hotPopDataDetailList);  
    case constants.LOADING_INIT:
      return state.set('hotPopDataDetailList', action.hotPopDataDetailList);
    case constants.LOADING_TIDNPARAM:
      return state.set('tidnList', action.tidnList);  
    default:
      return state;
  }
};
export default hotpopupReducer;
