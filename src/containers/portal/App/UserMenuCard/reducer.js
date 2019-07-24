import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  menuList: [],
});

const menuCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MENULIST: {
      const { menuList } = action;
      return state.set('menuList', fromJS(menuList));
    }
    default:
      return state;
  }
};

export default menuCardReducer;
