import * as actionTypes from './constants';

export const getUserList = (sNum, eNum, userList, sortColumn, sortDirection, keywordType, keyword) => (
  {
    type: actionTypes.GET_USER_LIST,
    payload: {
      sNum,
      eNum,
      userList,
      sortColumn,
      sortDirection,
      keywordType,
      keyword,
    },
  }
);
