import { fromJS } from 'immutable';
import * as constants from './constants';

const initState = fromJS({
  // 데이터의 초기값 세팅
  sdptList: [],
  flList: [],
  modelList: [],
  eqIdList: [],
  downTypeList: [],
  alarmDataList: [],
});

const alarmReducer = (state = initState, action) => {
  const tempMultiData = {
    CODE: '',
    NAME: 'ALL',
  };

  switch (action.type) {
    case constants.LOADING_PARAM:
      action.downTypeList.unshift(tempMultiData);
      action.flList.unshift(tempMultiData);
      return state.set('sdptList', action.sdptList)
        .set('downTypeList', action.downTypeList)
        .set('flList', action.flList);
    case constants.LOADING_SDPT_PARAM:
      action.modelList.unshift(tempMultiData);
      return state.set('modelList', action.modelList);
    case constants.LOADING_FL_PARAM:
      action.modelList.unshift(tempMultiData);
      return state.set('modelList', action.modelList)
        .set('eqIdList', action.eqIdList);
    case constants.LOADING_ALARM_SEARCH:
      return state.set('alarmData', action.alarmData);
    default:
      return state;
  }
};
export default alarmReducer;
