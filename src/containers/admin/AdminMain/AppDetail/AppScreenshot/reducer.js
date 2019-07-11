import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  appScreenshotList: [],
  appExplain: [],
  requiredAppList: [],
  resRecomAppList: [],
  appScreenshot: [],
});

const AppScreenshotListReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.RES_APP_SCREENSHOT_LIST:
      return state.set('appScreenshotList', action.payload);
    case constants.RES_APP_EXPLAIN:
      return state.set('appExplain', action.payload);
    case constants.RES_REQUIRED_APP_LIST:
      return state.set('requiredAppList', action.payload);
    case constants.RES_RECOM_APP_LIST:
      return state.set('resRecomAppList', action.payload);
    default:
      return state;
  }
};

export default AppScreenshotListReducer;
