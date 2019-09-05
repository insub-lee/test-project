import { fromJS } from 'immutable';
import * as constantTypes from './constants';
const initialState = fromJS({});
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_BIZBUILDERLIST_CONFIGCHANGEVALUE: {
      const { widgetId, key, value } = action;
      return state.setIn(['BizBuilderWidget', widgetId, 'BizBuilderConfigInfo', 'data', key], value);
    }
    case constantTypes.SET_BIZBUILDERLIST_SETTING_BYREDUCR: {
      const { widgetId, item } = action;
      return state.setIn(['BizBuilderWidget', widgetId, 'BizBuilderConfigInfo'], item);
    }
    case constantTypes.SET_WORKLIST_BYREDUCR: {
      const { widgetId, workList } = action;

      return state.setIn(['BizBuilderWidget', widgetId, 'workList'], workList);
    }
    case constantTypes.SET_WORKMETA_BYREDUCR: {
      const { widgetId, metaInfo } = action;
      return state.setIn(['BizBuilderWidget', widgetId, 'workMeta'], metaInfo);
    }
    default:
      return state;
  }
};
export default appReducer;
