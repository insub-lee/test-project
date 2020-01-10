import * as constants from './constants';

export const getIfBoardDataList = (cateList, pageNum, count) => ({
  type: constants.GET_IFBOARD_DATA_LIST,
  cateList,
  pageNum,
  count,
});

export const test = () => ({});
