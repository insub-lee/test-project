import * as constants from './constants';

export const getList = (num, sortColumn, sortDirection, keywordType, keyword) => (

  {
    type: constants.GET_SITE_LIST,
    num,
    sortColumn,
    sortDirection,
    keywordType,
    keyword,
  }
);

export const delRow = delData => (
  {
    type: constants.GET_DEL_ROW,
    delData,
  }
);
