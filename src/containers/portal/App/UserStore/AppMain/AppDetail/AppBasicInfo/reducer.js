import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  appBasicInfo: {},
  appProcess: [],
  appManual: [],
  appManagerList: [],
  appPageInfoData: {},
});

const AppBasicInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.RES_APP_BASIC_INFO:
      return state.set('appBasicInfo', action.payload).set('appPageInfoData', action.appPageInfoData);
    case constants.APP_PROCESS:
      return state.set('appProcess', action.payload);
    case constants.APP_MANUAL:
      return state.set('appManual', action.payload);
    case constants.APP_MANAGER_LIST:
      return state.set('appManagerList', action.payload);
    default:
      return state;
  }
};

export default AppBasicInfoReducer;
