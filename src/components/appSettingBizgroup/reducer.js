import { fromJS } from 'immutable';

import * as constants from './constants';

const initialState = fromJS({
  BIZGRP_ID: -1,
  widgetList: [],
  widget: {},
});

const widgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_WIDGET_SETTING:
      return state
        .set('widgetList', action.widgetList)
        .set('BIZGRP_ID', action.BIZGRP_ID || state.get('BIZGRP_ID'))
        .set('widget', action.widget);
    case constants.SET_WIDGET_LIST:
      return state.set('widgetList', action.widgetList).set('BIZGRP_ID', action.BIZGRP_ID || state.get('BIZGRP_ID'));
    case constants.SET_WIDGET:
      return state.set('widget', action.widget);
    default:
      return state;
  }
};

export default widgetReducer;
