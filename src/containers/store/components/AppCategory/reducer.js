import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  searchString: '',
  searchFocusIndex: -1,
  // selectedIndex: '',
  categoryData: [],
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CATEGORY_DATA:
      return state.set('categoryData', action.categoryData);
    // case constants.SET_SELECTED_INDEX:
    //   return state.set('selectedIndex', action.selectedIndex);
    default:
      return state;
  }
};

export default orgReducer;
