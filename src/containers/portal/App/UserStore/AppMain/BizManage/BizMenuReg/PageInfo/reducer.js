import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  widgetList: [],
  bizGroupInfo: {},
  BIZGRP_ID: -1,
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_BIZ_INFO:
      return state.set('bizGroupInfo', action.bizGroupInfo);
    case constants.SET_WIDGET_LIST:
      return state.set('widgetList', action.widgetList).set('BIZGRP_ID', action.BIZGRP_ID || state.get('BIZGRP_ID'));
    default:
      return state;
  }
};

export default orgReducer;
