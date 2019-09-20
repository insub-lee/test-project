import * as constants from './constants';

export const getGlobalMsgList = (sNum, eNum, sortColumn, sortDirection, searchType, searchKeyword, globalMsgList) => ({
  type: constants.GET_GLOBAL_MSG_LIST,
  payload: {
    sNum,
    eNum,
    sortColumn,
    sortDirection,
    searchType,
    searchKeyword,
    globalMsgList,
  },
});

export const delGlobalMsg = (delKeys, sNum, eNum, sortColumn, sortDirection, searchType, searchKeyword) => ({
  type: constants.DEL_GLOBAL_MSG,
  delKeys,
  sNum,
  eNum,
  sortColumn,
  sortDirection,
  searchType,
  searchKeyword,
});
