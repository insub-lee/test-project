import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  categoryData: [],
  titleModalVisible: false,
  selectedIndex: -1,
  tempRowInfo: {},
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CATEGORY_DATA:
      return state.set('categoryData', action.categoryData);
    case constants.ROOT_SELECTED_INDEX:
      return state.set('selectedIndex', action.payload);
    default:
      return state;
  }
};

export default orgReducer;
