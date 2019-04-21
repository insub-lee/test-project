import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  msgId: '',
  siteCombo: [],
});

const NotifyAdminRegReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_NOTIFY:
      return state.set('msgId', action.payload);
    case constants.SET_SITE_COMBO:
      return state.set('siteCombo', action.payload);
    default:
      return state;
  }
};

export default NotifyAdminRegReducer;
