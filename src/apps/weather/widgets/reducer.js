import { fromJS } from 'immutable';

import * as actionType from './constants';

const initialState = fromJS({
  itemWeatherList: {},
  widgetId: '',
  pageId: '',
});

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_WEATHERLIST_SUCCESS:
      return state.set('itemWeatherList', action.item).set('widgetId', action.widgetId).set('pageId', action.pageId);
    case actionType.SET_BIZWEATHERLIST_SUCCESS:
      return state.set('itemWeatherList', action.item).set('widgetId', action.widgetId).set('pageId', action.pageId);
    default:
      return state;
  }
};

export default weatherReducer;