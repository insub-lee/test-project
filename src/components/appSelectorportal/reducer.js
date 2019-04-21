import { fromJS } from 'immutable';

import { SET_BAPPLIST, SET_TREE_DATA, SET_CATEGORY_LIST, RESET_CHECKBOX, RESET_CATEGORY, SET_DSCRLIST } from './constants';

const initialState = fromJS({
  bapplist: [],
  appTree: [],
  categoryList: [],
  checkboxstate: false,
  dscrList: [],
});

const widgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BAPPLIST:
      return state.set('bapplist', action.resultValue);
    case SET_TREE_DATA:
      return state.set('appTree', action.categoryData);
    case SET_CATEGORY_LIST:
      return state.set('categoryList', action.result);
    case RESET_CHECKBOX:
      return state.set('checkboxstate', action.check);
    case RESET_CATEGORY:
      return state.set('categoryList', []);
    case SET_DSCRLIST:
      return state.set('dscrList', action.dscr);
    default:
      return state;
  }
};

export default widgetReducer;
