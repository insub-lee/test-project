import * as constants from './constants';

export const getCodeAdminList = (sNum, eNum, codeAdminList, sortColumn, sortDirection, keywordType, keyword) => ({
  type: constants.GET_CODE_ADMIN_LIST,
  sNum,
  eNum,
  codeAdminList,
  sortColumn,
  sortDirection,
  keywordType,
  keyword,
});

export const delRow = (sNum, eNum, codeAdminList, sortColumn, sortDirection, delData, keywordType, keyword) => ({
  type: constants.GET_DEL_CODEID,
  sNum,
  eNum,
  codeAdminList,
  sortColumn,
  sortDirection,
  delData,
  keywordType,
  keyword,
});
