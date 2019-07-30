import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  info: {},
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_FETCH_DATA: {
      const { info } = action;
      return state.set('info', fromJS(info));
    }
    case actionTypes.ACTION_TYPES:
    default:
      return state;
  }
};

export default reducer;
