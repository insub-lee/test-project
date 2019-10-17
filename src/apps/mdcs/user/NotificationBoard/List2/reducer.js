import { fromJS } from 'immutable';
import * as constantTypes from './constants';

const initialState = fromJS({
  notificationList: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_NOTIFICATIONLIST_BYREDUCR: {
      const { key, notificationList } = action;
      return state.set(key, notificationList);
    }
    default:
      return state;
  }
};
export default appReducer;
