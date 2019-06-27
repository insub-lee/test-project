import * as constants from './constants';
import * as appConstants from '../../../constants';

export const initPage = (initType, param) => ({
  type: constants.INIT_PAGE,
  initType,
  param,
});

export const getMapListOne = key => ({
  type: constants.GET_MAPLIST_ONE,
  key,
});

export const getMapListMore = key => ({
  type: constants.GET_MAPLIST_MORE,
  key,
});

export const getMapListSearch = searchword => ({
  type: constants.GET_MAPLIST_SEARCH,
  searchword,
});

export const registerBiz = app => ({
  type: constants.REGISTER_BIZ,
  app,
});

export const getBizMenu = (key, history) => ({
  type: constants.GET_BIZMENU,
  key,
  history,
});

export const changeSelectedIndex = selectedIndex => ({
  type: constants.SET_SELECTED_INDEX,
  selectedIndex,
});

export const appBizGubun = gubun => ({
  type: appConstants.APP_BIZ_GUBUN,
  gubun,
});
