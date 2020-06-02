import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  siteList: [],
});

const fileManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SITE_LIST:
      return state.set('siteList', action.siteList);
    default:
      return state;
  }
};

export default fileManageReducer;
