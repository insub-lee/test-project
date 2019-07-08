import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const initialState = fromJS({
  appBizGubun: 0,
  collapsed: true,
  searchword: '',
  // isLoading: false,
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
          link: '/store/appMain/bizStore/app/list',
          subs: [],
        },
        {
          key: 2,
          name: 'My page 관리',
          link: '/store/appMain/myPage',
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

const userStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_COLLAPSE_SIDEBAR:
      return state.set('collapsed', !state.get('collapsed'));
    case actionTypes.CHANGE_SEARCHWORD:
      return state.set('searchword', action.searchword);
    case actionTypes.CHANGE_MENUNAME:
      return state.set('menuName', action.menuName);
    case actionTypes.SET_MENU:
      return state.set('menuList', action.menuList);
    case actionTypes.APP_BIZ_GUBUN:
      return state.set('appBizGubun', action.gubun);
    default:
      return state;
  }
};

export default userStoreReducer;
