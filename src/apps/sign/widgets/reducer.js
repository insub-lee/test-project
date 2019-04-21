import { fromJS } from 'immutable';

import * as constants from './constants';

const initialState = fromJS({
  signList: [],
});

const signReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_SIGNLIST:
      return state.set('signList', action.payload);
    
    default:
      return state;
  }
};

export default signReducer;