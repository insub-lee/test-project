import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  BIZGRP_ID: -1,
  searchString: '',
  searchFocusIndex: -1,
  selectedIndex: -1,
  categoryData: [],
  tempRowInfo: {},

  bizGroupInfo: {},
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CATEGORY_DATA:
      return state
        .set('categoryData', action.categoryData ? action.categoryData : fromJS({}))
        .set('selectedIndex', action.selectedIndex || state.get('selectedIndex'))
        .set('tempRowInfo', action.tempRowInfo || state.get('tempRowInfo'))
        .set('bizGroupInfo', action.bizGroupInfo || state.get('bizGroupInfo'))
        .set('BIZGRP_ID', action.BIZGRP_ID || state.get('BIZGRP_ID'));
    case constants.SET_SELECTED_INDEX:
      return state.set('selectedIndex', action.selectedIndex);
    case constants.SAVE_DATA:
      return state.set('categoryData', action.categoryData).set('tempRowInfo', action.tempRowInfo);
    // case constants.SET_DATA:
    //   return state.set('data', action.data);
    default:
      return state;
  }
};

export default orgReducer;
