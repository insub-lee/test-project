import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  appinfo: [],
  serviceStopCodeList: [],
  // serviceStopOk: false,
});

const AppQnaReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.APP_INFO:
      return state.set('appinfo', action.payload);
    case constants.SERVICE_STOP_CODE_LIST:
      return state.set('serviceStopCodeList', action.payload);
    // case constants.SERVICE_STOP_OK:
    //   return state.set('serviceStopOk', action.payload);
    default:
      return state;
  }
};

export default AppQnaReducer;
