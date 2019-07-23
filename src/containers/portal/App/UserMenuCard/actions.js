import * as constants from './constants';

export const initPage = id => ({
  type: constants.GET_MENU_INIT_PAGE,
  id,
});

export const setMenuList = menuList => ({
  type: constants.SET_MENULIST,
  menuList,
});
