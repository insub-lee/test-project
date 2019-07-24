import * as constants from './constants';

export const initPage = (id, pageType) => ({
  type: constants.GET_MENU_INIT_PAGE,
  id,
  pageType,
});

export const setMenuList = (menuList, parentInfo) => ({
  type: constants.SET_MENULIST,
  menuList,
  parentInfo,
});
