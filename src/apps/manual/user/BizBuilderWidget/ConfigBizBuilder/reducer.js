import { fromJS } from 'immutable';
import * as constantTypes from './constants';
const initialState = fromJS({});
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_BIZBUILDERLIST_CONFIGCHANGEVALUE: {
      const { key, value } = action;
      return state.setIn(['BizBuilderWidget', 'BizBuilderConfigInfo', 'data', key], value);
    }
    case constantTypes.SET_BIZBUILDERLIST_SETTING_BYREDUCR_ASJSON: {
      const { cols } = action;
      const jsobj = JSON.parse(cols);
      return state.setIn(['BizBuilderWidget', 'BizBuilderConfigInfo', 'data', 'sourcecols'], jsobj);
    }
    case constantTypes.SET_BIZBUILDERLIST_SETTING_BYREDUCR: {
      const { item } = action;
      return state.setIn(['BizBuilderWidget', 'BizBuilderConfigInfo'], item);
    }
    case constantTypes.SET_WORKLIST_BYREDUCR: {
      const { workList } = action;
      return state.setIn(['BizBuilderWidget', 'workList'], workList);
    }
    default:
      return state;
  }
};
export default appReducer;
