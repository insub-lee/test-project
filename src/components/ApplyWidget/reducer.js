import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  success: false,
});

const applyReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SEND_APPLY_REDUCER:
      return state.set('success', true);
    case constants.SEND_APPLY_DELETE_REDUCER:
      return state.set('success', false);
    default:
      return state;
  }
};

export default applyReducer;
