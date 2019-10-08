import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  nodeList: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NODE_LIST: {
      const { nodeList } = action;
      return state.set('nodeList', fromJS(nodeList));
    }
    default:
      return state;
  }
};

export default appReducer;
