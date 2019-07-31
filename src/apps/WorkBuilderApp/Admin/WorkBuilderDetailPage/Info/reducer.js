import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  info: {},
  isLoading: true,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_FETCH_DATA: {
      const { info } = action;
      return state.set('info', fromJS(info));
    }
    case actionTypes.LOADING_ON:
      return state.set('isLoading', true);
    case actionTypes.LOADING_OFF:
      return state.set('isLoading', false);
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
