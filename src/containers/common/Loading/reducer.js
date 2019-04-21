import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  isLoading: false,
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_LOADING:
      return state.set('isLoading', action.isLoading);
    case constants.LOADING_OFF:
      return state.set('isLoading', false);
    default:
      return state;
  }
};

export default orgReducer;
