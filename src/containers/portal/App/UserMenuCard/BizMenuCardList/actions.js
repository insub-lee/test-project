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

export const loadingOn = () => ({
  type: constants.LOADING_ON,
});

export const loadingOff = () => ({
  type: constants.LOADING_OFF,
});
