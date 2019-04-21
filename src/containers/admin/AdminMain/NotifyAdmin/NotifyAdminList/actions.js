import * as constants from './constants';

export const getNotifyList = (
  sNum,
  eNum,
  notifyList,
  sortColumn,
  sortDirection,
  searchType,
  searchKeyword,
  oneDate,
  startDate,
  endDate,
  searchSite,
) => (
  {
    type: constants.GET_NOTIFY_LIST,
    payload: {
      sNum,
      eNum,
      notifyList,
      sortColumn,
      sortDirection,
      searchType,
      searchKeyword,
      oneDate,
      startDate,
      endDate,
      searchSite,
    },
  }
);

export const udtPostState = (
  MSG_ID,
  OPEN_YN,
  sNum,
  eNum,
  notifyList,
  sortColumn,
  sortDirection,
  searchType,
  searchKeyword,
  oneDate,
  startDate,
  endDate,
  searchSite,
) => (
  {
    type: constants.UDT_POST_STATE,
    MSG_ID,
    OPEN_YN,
    payload: {
      sNum,
      eNum,
      notifyList,
      sortColumn,
      sortDirection,
      searchType,
      searchKeyword,
      oneDate,
      startDate,
      endDate,
      searchSite,
    },
  }
);

// 수정중
export const getSiteCombo = SCR_CD => (
  {
    type: constants.GET_SITE_COMBO,
    SCR_CD,
  }
);
