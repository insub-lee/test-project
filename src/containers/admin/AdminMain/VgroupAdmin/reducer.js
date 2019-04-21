import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  vgroupTreeList: [],
  vgroupComboList: [],
  managerList: [],
  memberUList: [],
  memberDList: [],
});

const VgroupAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_VGROUP_TREE_LIST:
      return state.set('vgroupTreeList', action.result);
    case constants.SET_VGROUP_COMBO_LIST:
      return state.set('vgroupComboList', action.payload);
    case constants.SET_VGROUP_MANAGER_LIST:
      return state.set('managerList', action.payload);
    case constants.SET_VGROUP_MEMBER_U_LIST:
      return state.set('memberUList', action.payload);
    case constants.SET_VGROUP_MEMBER_D_LIST:
      return state.set('memberDList', action.payload);
    default:
      return state;
  }
};

export default VgroupAdminReducer;
