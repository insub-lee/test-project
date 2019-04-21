import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  getUserInfoRow: [],
  getRow: [],
});

const BcAskInfoReducer = (state = initialState, action) => {
  // console.log('!!!!!!!!', action.payload);
  switch (action.type) {
    case constants.SET_INFO_LIST:
      return state.set('getRow', action.payload);
    case constants.SET_USER_INFO_LIST:
      return state.set('getUserInfoList', action.userInfoList);
    // return {
    //   ...state,
    //   getRow: action.payload,
    // }
    default:
      return state;
  }
};

export default BcAskInfoReducer;
