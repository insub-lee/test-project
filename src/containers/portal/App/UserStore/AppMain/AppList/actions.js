import * as constants from './constants';
import * as appConstants from '../../constants';

export const initPage = (initType, param) => ({
  type: constants.INIT_PAGE,
  initType,
  param,
});

export const getMapListAll = key => ({
  type: constants.GET_MAPLIST_ALL,
  key,
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

export const registApp = (APP_ID, CATG_ID) => ({
  type: constants.REGIST_APP,
  APP_ID,
  CATG_ID,
});

export const registCategory = (APP_ID, CATG_ID) => ({
  type: constants.REGIST_CATEGORY,
  APP_ID,
  CATG_ID,
});

export const registerBiz = (APP_ID, CATG_ID) => ({
  type: constants.REGISTER_BIZ,
  APP_ID,
  CATG_ID,
});

export const registAppModal = (APP_ID, CATG_ID, history) => ({
  type: constants.REGIST_APP_MODAL,
  APP_ID,
  CATG_ID,
  history,
});

export const registCategoryModal = (APP_ID, CATG_ID, history) => ({
  type: constants.REGIST_CATEGORY_MODAL,
  APP_ID,
  CATG_ID,
  history,
});

export const registBizModal = (APP_ID, CATG_ID, history) => ({
  type: constants.REGIST_BIZ_MODAL,
  APP_ID,
  CATG_ID,
  history,
});

export const changeSearchword = searchword => ({
  type: constants.CHANGE_SEARCHWORD,
  searchword,
});

export const appBizGubun = gubun => ({
  type: appConstants.APP_BIZ_GUBUN,
  gubun,
});
