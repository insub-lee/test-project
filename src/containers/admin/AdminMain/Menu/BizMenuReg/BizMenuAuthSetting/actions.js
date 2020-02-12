import * as constants from './constants';

export const getBizMenuAuthInfo = (BIZGRP_ID, MENU_ID) => ({
  type: constants.GET_BIZMENU_AUTH_INFO,
  BIZGRP_ID,
  MENU_ID,
});

export const updateBizMenuAuth = (dataList, BIZGRP_ID, MENU_ID, INHERIT) => ({
  type: constants.UPDATE_BIZMENU_AUTH,
  dataList,
  BIZGRP_ID,
  MENU_ID,
  INHERIT,
});
