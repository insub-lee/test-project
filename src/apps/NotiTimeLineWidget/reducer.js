import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  notifyList: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFY_LIST: {
      const { list } = action;
      return state.set('notifyList', fromJS(list));
    }
    default:
      return state;
  }
};

export default appReducer;
