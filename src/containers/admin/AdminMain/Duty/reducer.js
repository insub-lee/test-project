import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  dutyComboData: [],
  dutyTreeData: [],
  titleModalVisible: false,
  selectedIndex: -1,
  selectedDept: 0,
  tempRowInfo: {},
});

const DutyReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_DUTY_COMBO_LIST:
      return state.set('dutyComboData', action.dutyComboData).set('selectedDept', action.selectedDept);
    case constants.SET_DUTY_DATA:
      return state.set('dutyTreeData', action.dutyTreeData);
    case constants.SET_CHANGE_DUTY_DATA:
      return state.set('dutyTreeData', action.dutyTreeData).set('selectedDept', action.selectedDept);
    case constants.ROOT_SELECTED_INDEX:
      return state.set('selectedIndex', action.DUTY_ID);
    default:
      return state;
  }
};

export default DutyReducer;
