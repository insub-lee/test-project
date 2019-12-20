import * as constants from './constants';

export const getMyAppList = (pageSnum, pageEnum, setMyAppList, sortColumn, sortDirection, searchText, searchType) => ({
  type: constants.GET_MY_APP_LIST,
  payload: {
    pageSnum,
    pageEnum,
    setMyAppList,
    sortColumn,
    sortDirection,
    searchText,
    searchType,
  },
});

export const test = (num, sortColumn, sortDirection) => ({
  type: constants.TEST,
  payload: { num, sortColumn, sortDirection },
});
