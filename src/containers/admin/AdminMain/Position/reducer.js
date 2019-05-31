import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  pstnComboData: [],
  pstnTreeData: [],
  titleModalVisible: false,
  selectedIndex: -1,
  tempRowInfo: {},
});

const PositionReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_PSTN_COMBO_LIST:
      return state.set('pstnComboData', action.pstnComboData).set('selectedDept', action.selectedDept);
    case constants.SET_PSTN_DATA:
      return state.set('pstnTreeData', action.pstnTreeData);
    case constants.SET_CHANGE_PSTN_DATA:
      return state.set('pstnTreeData', action.pstnTreeData).set('selectedDept', action.selectedDept);
    case constants.ROOT_SELECTED_INDEX:
      return state.set('selectedIndex', action.PSTN_ID);
    default:
      return state;
  }
};

export default PositionReducer;
