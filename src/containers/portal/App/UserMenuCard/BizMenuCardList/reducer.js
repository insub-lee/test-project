import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  menuList: [],
  parentInfo: {},
  isLoading: true,
});

const menuCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MENULIST: {
      const { menuList, parentInfo } = action;
      return state.set('menuList', fromJS(menuList)).set('parentInfo', parentInfo);
    }
    case actionTypes.LOADING_ON:
      return state.set('isLoading', true);
    case actionTypes.LOADING_OFF:
      return state.set('isLoading', false);
    default:
      return state;
  }
};

export default menuCardReducer;
