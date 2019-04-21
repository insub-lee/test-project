import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  notifyList: [],
  siteCombo: [],
});

const NotifyAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_NOTIFY_LIST:
      return state.set('notifyList', action.payload);
    case constants.SET_SITE_COMBO:
      return state.set('siteCombo', action.payload);
    default:
      return state;
  }
};

export default NotifyAdminReducer;
