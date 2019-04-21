import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  siteList07: [],
  delList: [],
  List100: []
});

const BcAskInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_INFO_LIST:
      return state.set('siteList07', action.payload);
      
    case constants.SET_DEL_ROW:
      return state.set('delList', action.payload);
    
    case constants.SET_STD_ROW100:
      return state.set('List100', action.payload);

    default:
      return state;
  }
};

export default BcAskInfoReducer;
