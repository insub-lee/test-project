import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  siteListAll: [],
  delList: [],
});

const BcAskInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_INFO_LIST:
      return state.set('siteListAll', action.payload);
    case constants.SET_DEL_ROW:
      return state.set('delList', action.payload);
    default:
      return state;
  }
};

export default BcAskInfoReducer;
