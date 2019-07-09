import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  appManagerList: [],
  userList: [],
  dutyList: [],
  pstnList: [],
  grpList: [],
  deptList: [],
});

const AppDetailaReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.APP_MANAGER_LIST:
      return state.set('appManagerList', action.payload);
    case constants.USER_LIST:
      return state.set('userList', action.payload);
    case constants.DUTY_LIST:
      return state.set('dutyList', action.payload);
    case constants.PSTN_LIST:
      return state.set('pstnList', action.payload);
    case constants.GRP_LIST:
      return state.set('grpList', action.payload);
    case constants.DEPT_LIST:
      return state.set('deptList', action.payload);
    default:
      return state;
  }
};

export default AppDetailaReducer;
