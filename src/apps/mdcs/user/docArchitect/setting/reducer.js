import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_CATEGORYMAP_BYREDUCR: {
      const { key, categoryMapList } = action;
      return state.setIn(['docTemplate', key], categoryMapList);
    }
    default:
      return state;
  }
};
export default appReducer;
