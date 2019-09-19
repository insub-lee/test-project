import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  menuList: [],
  menuName: '',
  menus: [],
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SEARCHWORD:
      return state.set('searchword', action.searchword);
    case actionTypes.CHANGE_MENUNAME:
      return state.set('menuName', action.menuName);
    case actionTypes.SET_MENU:
      return state.set('menuList', action.menuList);
    default:
      return state;
  }
};

export default appReducer;
