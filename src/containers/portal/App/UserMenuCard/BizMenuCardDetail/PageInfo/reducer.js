import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  widgetList: [],
  pageInfoData: {},
});

const pageInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_WIDGET_LIST:
      return state.set('widgetList', action.widgetList).set('pageInfoData', action.pageInfoData);
    default:
      return state;
  }
};

export default pageInfoReducer;
