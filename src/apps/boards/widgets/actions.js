import * as constants from './constants';

export const getIfBoardDataList = (cateList, page, pagepernum, widgetId) => ({
  type: constants.GET_IFBOARD_DATA_LIST,
  cateList,
  page,
  pagepernum,
  widgetId,
});

export const getIfDetailBoardList = num => ({
  type: constants.GET_IFCOARD_DETAIL_DATA_LIST,
  num,
});

export const test = () => ({});

export const boardListPageing = (boardDataList, catePageList, index, pagepernum) => ({
  type: constants.BOARD_LIST_PAGEING,
  boardDataList,
  catePageList,
  index,
  pagepernum,
});
