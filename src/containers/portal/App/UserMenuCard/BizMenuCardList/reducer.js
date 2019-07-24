import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  menuList: [],
  parentInfo: {},
});

const menuCardReducer = (state = initialState, action) => {
  console.debug('>>>>>>>>>.action: ', action);
  switch (action.type) {
    case actionTypes.SET_MENULIST: {
      const { menuList, parentInfo } = action;
      return state.set('menuList', fromJS(menuList)).set('parentInfo', parentInfo);
    }
    default:
      return state;
  }
};

export default menuCardReducer;
