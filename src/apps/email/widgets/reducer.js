import { fromJS } from 'immutable';

import * as constants from './constants';

const initialState = fromJS({
  mailList: [],
});

const mailReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_MAILLIST:
      return state.set('mailList', action.payload);
    
    default:
      return state;
  }
};

export default mailReducer;