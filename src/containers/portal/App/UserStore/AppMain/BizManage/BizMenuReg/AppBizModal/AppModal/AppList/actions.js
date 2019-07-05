import * as constants from './constants';

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

export const changeSearchword = searchword => (
  {
    type: constants.CHANGE_SEARCHWORD,
    searchword,
  }
);
