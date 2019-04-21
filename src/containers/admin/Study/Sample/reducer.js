import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  setStart: '',
  setFakelist1: [],
});

const sampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_START:
      return state.set('setStart', action.payload);
    case constants.SET_FAKELIST1:
      return state.set('setFakelist1', action.payload);
    default:
      return state;
  }
};

export default sampleReducer;
