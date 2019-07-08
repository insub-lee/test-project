import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  widgetList: [],
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_WIDGET_LIST:
      return state.set('widgetList', action.widgetList);
    default:
      return state;
  }
};

export default orgReducer;
