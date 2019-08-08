import { fromJS } from 'immutable';
import * as constantTypes from './constants';
const initialState = fromJS({
  categoryList: [],
});
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_CATEGORYLIST_REDUCR: {
      const { categoryList } = action;
      return state.set('categoryList', fromJS(categoryList));
    }
    case constantTypes.SET_CATEGORYSETTING_INFO_REDUCR: {
      const { widgetId, categoryIdx } = action;
      return state.setIn(['manualWidgetSettingInfo', 'widgetId'], widgetId).setIn(['manualWidgetSettingInfo', 'categoryIdx'], categoryIdx);
    }
    default:
      return state;
  }
};
export default appReducer;
