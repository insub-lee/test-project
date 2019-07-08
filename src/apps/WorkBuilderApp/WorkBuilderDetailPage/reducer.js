import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({

});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
