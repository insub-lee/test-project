import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  mapList: [],
  bizMenuData: {},
  selectedIndex: -1,
  loading: false,
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CATEGORY_DATA:
      return state.set('categoryData', action.categoryData).set('categoryFlatData', action.categoryFlatData);
    case constants.SET_BIZMENU_DATA:
      return state.set('bizMenuData', action.bizMenuData).set('selectedIndex', action.selectedIndex);
    case constants.SET_SELECTED_INDEX:
      return state.set('selectedIndex', action.selectedIndex);
    case constants.ENABLE_LOADING:
      return state.set('loading', true);
    case constants.DISABLE_LOADING:
      return state.set('loading', false);
    default:
      return state;
  }
};

export default orgReducer;
