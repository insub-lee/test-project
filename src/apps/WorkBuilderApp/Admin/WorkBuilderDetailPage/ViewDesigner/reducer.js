import { fromJS } from 'immutable';

import * as actionTypes from './constants';

const initialState = fromJS({});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_ON:
      return state.set('isLoading', true);
    case actionTypes.LOADING_OFF:
      return state.set('isLoading', false);
    case actionTypes.RESET_DATA:
      return initialState;
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
