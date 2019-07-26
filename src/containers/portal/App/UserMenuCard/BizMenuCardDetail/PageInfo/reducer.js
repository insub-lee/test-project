import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  widgetList: [],
});

const pageInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_WIDGET_LIST:
      return state.set('widgetList', action.widgetList);
    default:
      return state;
  }
};

export default pageInfoReducer;
