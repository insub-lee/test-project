import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  bizInfo: {},
  selectedApp: [],
  setMyMenuData: {},
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_BIZ_INFO:
      return state.set('bizInfo', action.bizInfo);
    case constants.EXEC_APPS_SUCCESS:
      return state.set('selectedApp', action.resultValue).set('setMyMenuData', action.node);
    default:
      return state;
  }
};

export default orgReducer;
