import { fromJS } from 'immutable';

import * as constants from './constants';

const initialState = fromJS({
  widgetList: [],
  widget: {},
});

const widgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_WIDGET_LIST:
      return state.set('widgetList', action.widgetList);
    case constants.SET_WIDGET:
      return state.set('widget', action.widget);
    default:
      return state;
  }
};

export default widgetReducer;
