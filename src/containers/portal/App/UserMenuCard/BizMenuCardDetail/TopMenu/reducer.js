import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  bizInfo: {},
  bizManagerList: [],
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_BIZ_INFO:
      return state.set('bizInfo', action.bizInfo);
    case constants.BIZ_MANAGER_LIST:
      return state.set('bizManagerList', action.bizManagerList);
    default:
      return state;
  }
};

export default orgReducer;
