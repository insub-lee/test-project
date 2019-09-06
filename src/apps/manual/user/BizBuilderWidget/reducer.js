import { fromJS } from 'immutable';
import * as constantTypes from './constants';
const initialState = fromJS({});
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_BIZBULDERLISTWIDGET_SETTINGINFO_BYREDUCR: {
      const { widgetId, configInfo } = action;
      return state.setIn(['BizBuilderWidget', `${widgetId}`, 'ConfigInfo'], configInfo);
    }
    case constantTypes.SET_BIZBUILDERLIST_BYREDUCR: {
      const { widgetId, bizBuilderList } = action;
      return state.setIn(['BizBuilderWidget', `${widgetId}`, 'bizBuilderList'], bizBuilderList);
    }
    case constantTypes.SET_BIZBUILDERVIEW_BYREDUCR: {
      const { widgetId, viewInfo } = action;
      return state.setIn(['BizBuilderWidget', `${widgetId}`, 'viewInfo'], viewInfo);
    }
    default:
      return state;
  }
};
export default appReducer;
