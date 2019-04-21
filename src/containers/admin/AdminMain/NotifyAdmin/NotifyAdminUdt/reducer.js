import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  notifyMsg: [],
  notifyReceiver: [],
});

const NotifyAdminDtlReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_NOTIFY_MSG:
      return state.set('notifyMsg', action.payload);
    case constants.SET_NOTIFY_RECEIVER:
      return state.set('notifyReceiver', action.payload);
    default:
      return state;
  }
};

export default NotifyAdminDtlReducer;
