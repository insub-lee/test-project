import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  deptComboData: [],
  deptTreeData: [],
  titleModalVisible: false,
  selectedIndex: -1,
  selectedDept: 0,
  tempRowInfo: {},
});

const DeptReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_DEPT_COMBO_LIST:
      return state.set('deptComboData', action.deptComboData).set('selectedDept', action.selectedDept);
    case constants.SET_DEPT_DATA:
      return state.set('deptTreeData', action.deptTreeData);
    case constants.SET_CHANGE_DEPT_DATA:
      return state.set('deptTreeData', action.deptTreeData).set('selectedDept', action.selectedDept);
    case constants.ROOT_SELECTED_INDEX:
      return state.set('selectedIndex', action.DEPT_ID);
    default:
      return state;
  }
};

export default DeptReducer;
