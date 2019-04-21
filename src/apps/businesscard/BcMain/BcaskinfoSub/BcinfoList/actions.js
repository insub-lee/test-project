import * as constants from './constants';

export const getList = (num, 
  sortColumn, 
  sortDirection, 
  keywordType, 
  keyword,
  oneDate,
  startDate,
  endDate,
  pageType,
) => (

  {
    type: constants.GET_INFO_LIST,
    num,
    sortColumn,
    sortDirection,
    keywordType,
    keyword,
    oneDate,
    startDate,
    endDate,
    pageType,
  }
);

export const delRow = delData => (
  {
    type: constants.GET_DEL_ROW,
    delData,
  }
);
