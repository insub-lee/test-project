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

export const registerBiz = (app, catg) => ({
  type: constants.REGISTER_BIZ,
  app,
  catg,
});

export const registBizModal = (BIZGRP_ID, CATG_ID, history) => ({
  type: constants.REGIST_BIZ_MODAL,
  BIZGRP_ID,
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
// 테스트
// export const getBizMenu = key => ({
//   type: constants.GET_BIZMENU,
//   key,
// });
