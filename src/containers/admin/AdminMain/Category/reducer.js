import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  categoryComboList: [],
  categoryData: [],
  titleModalVisible: false,
  selectedIndex: -1,
  tempRowInfo: {},
  tp: '',
});

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CATEGORY_COMBO_LIST:
      return state.set('categoryComboList', action.payload);
    case constants.SET_CATEGORY_DATA:
      return state.set('categoryData', action.categoryData).set('tp', 'categoryData');
    case constants.ROOT_SELECTED_INDEX:
      return state.set('selectedIndex', action.payload).set('tp', 'selectedIndex');
    default:
      return state;
  }
};

export default CategoryReducer;
