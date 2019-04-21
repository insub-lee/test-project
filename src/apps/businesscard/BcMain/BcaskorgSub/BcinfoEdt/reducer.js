import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  siteList: [],
  BcUdt: [],
});

const BcInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_SITE_DETAIL:
      return state.set('siteList', action.payload);
    
    default:
      return state;
  }
};

export default BcInfoReducer;


