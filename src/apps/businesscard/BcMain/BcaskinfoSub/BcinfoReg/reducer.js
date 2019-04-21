import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  globalMsg: false,
  siteList: [],
});

const GlobalAdminDtlReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_GLOBAL_MSG_RES:
      return state.set('globalMsg', action.payload);
    case constants.SET_SITE_DETAIL:
      return state.set('siteList', action.payload);

    default:
      return state;
  }
};

export default GlobalAdminDtlReducer;
