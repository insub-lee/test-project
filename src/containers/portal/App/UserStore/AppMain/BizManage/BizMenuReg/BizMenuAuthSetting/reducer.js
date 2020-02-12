import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  bizMenuAuthInfo: [],
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_BIZMENU_AUTH_INFO:
      return state.set('bizMenuAuthInfo', action.bizMenuAuthInfo);
    default:
      return state;
  }
};

export default orgReducer;
