import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  rankComboData: [],
  rankTreeData: [],
  titleModalVisible: false,
  selectedIndex: -1,
  selectedDept: 0,
  tempRowInfo: {},
});

const RankReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_RANK_COMBO_LIST:
      return state.set('rankComboData', action.rankComboData).set('selectedDept', action.selectedDept);
    case constants.SET_RANK_DATA:
      return state.set('rankTreeData', action.rankTreeData);
    case constants.SET_CHANGE_RANK_DATA:
      return state.set('rankTreeData', action.rankTreeData).set('selectedDept', action.selectedDept);
    case constants.ROOT_SELECTED_INDEX:
      return state.set('selectedIndex', action.RANK_ID);
    default:
      return state;
  }
};

export default RankReducer;
