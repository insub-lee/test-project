import { fromJS } from 'immutable';
import * as treeFunc from 'containers/common/functions/treeFunc';
import * as constants from './constants';

const initialState = fromJS({
  searchString: '',
  searchFocusIndex: -1,
  selectedIndex: -1,
  categoryData: [],
  tempRowInfo: {},
  menuBizGrpId: -1,
  userRole: '',
  // data: {},
  // titleModalVisible: false,
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CATEGORY_DATA:
      return state.set('categoryData', action.categoryData ? action.categoryData : fromJS([]))
        .set('categoryFlatData', treeFunc.generateListBizManage(action.categoryData))
        .set('selectedIndex', action.selectedIndex || state.get('selectedIndex'))
        .set('tempRowInfo', action.tempRowInfo || state.get('tempRowInfo'));
    case constants.SET_SELECTED_INDEX:
      return state.set('selectedIndex', action.selectedIndex);
    case constants.SAVE_DATA:
      return state.set('categoryData', action.categoryData).set('tempRowInfo', action.tempRowInfo);
    case constants.SET_MENUBIZGRP_ID:
      return state.set('menuBizGrpId', action.menuBizGrpId);
    case constants.SET_USER_ROLE:
      return state.set('userRole', action.userRole);
    // case constants.SET_DATA:
    //   return state.set('data', action.data);
    default:
      return state;
  }
};

export default orgReducer;
