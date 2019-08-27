import { fromJS } from 'immutable';
import * as constantTypes from './constants';
const initialState = fromJS({});
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantTypes.SET_BIZBULDERLISTWIDGET_SETTINGINFO_BYREDUCR: {
      const { configInfo } = action;
      return state.setIn(['BizBuilderWidget', 'ConfigInfo'], configInfo);
    }
    case constantTypes.SET_BIZBUILDERLIST_BYREDUCR: {
      const { bizBuilderList } = action;
      console.debug('bizBuilderList', bizBuilderList);
      return state.setIn(['BizBuilderWidget', 'bizBuilderList'], bizBuilderList);
    }
    default:
      return state;
  }
};
export default appReducer;
