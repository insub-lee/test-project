import * as constants from './constants';

export const getOpinionData = (sort, pageNum) => ({
  type: constants.GET_OPINION_LIST,
  sort,
  pageNum,
});

export const getSearchOpinionData = (sortType, dateType, date, keyword) => ({
  type: constants.GET_OPINION_SEARCH_LIST,
  sortType,
  dateType,
  date,
  keyword,
});

export const acceptApps = (id, appID, ver, date) => ({
  type: constants.ACCEPT_APPS,
  id,
  appID,
  ver,
  date,
});

export const getOppoList = () => ({
  type: constants.GET_OPPO_LIST,
});

export const oppoApps = (id, appID, ver, comment) => ({
  type: constants.OPPO_APPS,
  id,
  appID,
  ver,
  comment,
});

export const getComboList = () => ({
  type: constants.COMBO_LIST,
});
