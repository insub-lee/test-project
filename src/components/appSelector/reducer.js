import { fromJS } from 'immutable';

import { SET_APPLIST, SET_TREE_DATA, SET_CATEGORY_LIST, RESET_CHECKBOX, RESET_CATEGORY } from './constants';

const initialState = fromJS({
  applist: [],
  appTree: [],
  categoryList: [],
  checkboxstate: false,
});

const widgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APPLIST: {
      return state.set('applist', action.resultValue);
    }
    case SET_TREE_DATA:
      return state.set('appTree', action.categoryData);
    case SET_CATEGORY_LIST:
      return state.set('categoryList', action.result);
    case RESET_CHECKBOX:
      return state.set('checkboxstate', action.check);
    case RESET_CATEGORY:
      return state.set('categoryList', []);
    default:
      return state;
  }
};

export default widgetReducer;
