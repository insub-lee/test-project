import * as constants from './constants';

export const getList = (sNum, eNum, sortColumn, sortDirection, keywordType, keyword, siteList) => ({
  type: constants.GET_SITE_LIST,
  sNum,
  eNum,
  sortColumn,
  sortDirection,
  keywordType,
  keyword,
  siteList,
});

export const delRow = (delData, sNum, eNum, sortColumn, sortDirection, keywordType, keyword) => ({
  type: constants.GET_DEL_ROW,
  delData,
  sNum,
  eNum,
  sortColumn,
  sortDirection,
  keywordType,
  keyword,
});
