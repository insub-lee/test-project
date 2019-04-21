import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  globalMsgList: [],
  delGlobalMsgList: [],
});

const GlobalAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_GLOBAL_MSG_LIST:
      return state.set('globalMsgList', action.payload);
    case constants.SET_DEL_GLOBAL_MSG:
      return state.set('delGlobalMsgList', action.payload);
    default:
      return state;
  }
};

export default GlobalAdminReducer;
