import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  globalMsg: false,
});

const GlobalAdminDtlReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_GLOBAL_MSG_RES:
      return state.set('globalMsg', action.payload);
    default:
      return state;
  }
};

export default GlobalAdminDtlReducer;
