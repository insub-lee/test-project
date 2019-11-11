import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
  categoryComboList: [],
  searchString: '',
  searchFocusIndex: -1,
  selectedIndex: '',
  categoryData: [],
  tempRowInfo: {},
  // siteId: -1,
  // titleModalVisible: false,
});

const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CATEGORY_COMBO_LIST:
      return state.set('categoryComboList', action.payload);
    case constants.SET_CATEGORY_DATA:
      return state.set('categoryData', action.categoryData ? action.categoryData : fromJS({}))
        // .set('titleModalVisible', action.titleModalVisible ? action.titleModalVisible : false)
        .set('selectedIndex', action.selectedIndex)
        .set('tempRowInfo', action.tempRowInfo || state.get('tempRowInfo'));
    case constants.SET_SELECTED_INDEX:
      return state.set('selectedIndex', action.selectedIndex);
    // case constants.SET_TITLE_MODAL_VISIBLE:
    //   return state.set('titleModalVisible', action.titleModalVisible);
    case constants.SAVE_DATA:
      return state.set('categoryData', action.categoryData).set('tempRowInfo', action.tempRowInfo);
    case constants.SET_SITE_ID:
      return state.set('siteId', action.payload);
    default:
      return state;
  }
};

export default orgReducer;
