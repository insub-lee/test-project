import * as constants from './constants';

export const getGlobalMsgList = (num, sortColumn, sortDirection, searchType, searchKeyword) => (
  {
    type: constants.GET_GLOBAL_MSG_LIST,
    payload: {
      num,
      sortColumn,
      sortDirection,
      searchType,
      searchKeyword,
    },
  }
);

export const delGlobalMsg = (
  delKeys,
  num,
  sortColumn,
  sortDirection,
  searchType,
  searchKeyword,
) => (
  {
    type: constants.DEL_GLOBAL_MSG,
    delKeys,
    num,
    sortColumn,
    sortDirection,
    searchType,
    searchKeyword,
  }
);
