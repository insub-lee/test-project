import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  userList: [],
  comboData: [],
  treeData: [],
  isLoading: false,
});

const UserListReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_USER_LIST:
      return state.set('userList', action.payload);
    case constants.SET_DEPT_COMBO_LIST:
      return state.set('comboData', action.deptComboData);
    case constants.SET_CHANGE_DEPT_DATA:
      return state.set('treeData', action.deptTreeData);
    case constants.SET_DUTY_COMBO_LIST:
      return state.set('comboData', action.dutyComboData);
    case constants.SET_CHANGE_DUTY_DATA:
      return state.set('treeData', action.dutyTreeData);
    case constants.SET_PSTN_COMBO_LIST:
      return state.set('comboData', action.pstnComboData);
    case constants.SET_CHANGE_PSTN_DATA:
      return state.set('treeData', action.pstnTreeData);
    case constants.SET_RANK_COMBO_LIST:
      return state.set('comboData', action.rankComboData);
    case constants.SET_CHANGE_RANK_DATA:
      return state.set('treeData', action.rankTreeData);
    case constants.IS_LOADING:
      return state.set('isLoading', action.isLoading);
    default:
      return state;
  }
};

export default UserListReducer;
