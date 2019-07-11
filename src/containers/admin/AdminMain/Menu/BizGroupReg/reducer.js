import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  data: {},
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_DATA:
      return state.set('data', action.data);
    default:
      return state;
  }
};

export default orgReducer;
