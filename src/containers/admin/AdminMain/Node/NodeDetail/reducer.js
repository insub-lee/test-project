import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  node: {},
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NODE_DETAIL: {
      const { node } = action;
      return state.set('node', fromJS(node));
    }
    default:
      return state;
  }
};

export default appReducer;
