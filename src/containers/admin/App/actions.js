import * as actionType from './constants';

export const changeSearchword = searchword => ({
  type: actionType.CHANGE_SEARCHWORD,
  searchword,
});

export const menuAuthChk = (pathname, history, SCRGRP_CD) => ({
  type: actionType.MENU_AUTH_CHK,
  payload: { pathname, history, SCRGRP_CD },
});

export const getMenu = SCRGRP_CD => ({
  type: actionType.GET_MENU,
  SCRGRP_CD,
});
