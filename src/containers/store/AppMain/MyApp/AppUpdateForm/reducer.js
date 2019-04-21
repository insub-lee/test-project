import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  linkTypeList: [],
  methodList: [],
  wedgetColorList: [],

  appDetail: [],
  appProcess: [],
  appManual: [],
  screenshotList: [],
  reqAppList: [],
  recomAppList: [],
  systemLink: [],
  deptList: [],
  appIconArr: [],
  appWorkArr: [],
  appManualArr: [],
});

const AppQnaReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_LINKTYPE:
      return state.set('linkTypeList', action.payload);
    case constants.SET_METHOD:
      return state.set('methodList', action.payload);
    case constants.SET_WEDGET_COLOR:
      return state.set('wedgetColorList', action.payload);

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
    case constants.APP_ICON_ARR:
      return state.set('appIconArr', action.payload);
    case constants.APP_PROCESS_ARR:
      return state.set('appWorkArr', action.payload);
    case constants.APP_MANUAL_ARR:
      return state.set('appManualArr', action.payload);
    default:
      return state;
  }
};

export default AppQnaReducer;
