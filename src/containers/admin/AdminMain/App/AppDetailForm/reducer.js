import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  appDetail: [],
  appProcess: [],
  appManual: [],
  screenshotList: [],
  reqAppList: [],
  recomAppList: [],
  systemLink: [],
});

const AppDetailaReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_MY_APP_DETAIL:
      return state.set('appDetail', action.payload);
    case constants.APP_PROCESS:
      return state.set('appProcess', action.payload);
    case constants.APP_MANUAL:
      return state.set('appManual', action.payload);
    case constants.SCREENSHOT_LIST:
      return state.set('screenshotList', action.payload);
    case constants.RES_APP_LIST:
      return state.set('reqAppList', action.payload);
    case constants.RECOM_APP_LIST:
      return state.set('recomAppList', action.payload);
    case constants.SYSTEM_LINK:
      return state.set('systemLink', action.payload);
    default:
      return state;
  }
};

export default AppDetailaReducer;
