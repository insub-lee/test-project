import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  collapsed: true,
  searchword: '',
  menuList: [],
  menuName: '',
  menus: [
    {
      key: 1,
      name: 'Biz Store',
      nav: [
        {
          key: 1,
          name: 'App Store',
          link: '/store/menuListMain/menuList/list',
          subs: [],
        },
        {
          key: 2,
          name: 'My page 관리',
          link: '/store/menuListMain/myPage',
          subs: [],
        },
        {
          key: 3,
          name: 'App 관리',
          link: '/store',
          subs: [],
        },
        {
          key: 4,
          name: '업무그룹 관리',
          link: '/store',
          subs: [],
        },
      ],
    },
  ],
});

const menuListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_COLLAPSE_SIDEBAR:
      return state.set('collapsed', !state.get('collapsed'));
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

export default menuListReducer;
