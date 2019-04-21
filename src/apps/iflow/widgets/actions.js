import * as constants from './constants';

export const getIflowDataList = (pageSnum, pageEnum, dataList) => (
  {
    type: constants.GET_IFLOW_DATA_LIST,
    pageSnum,
    pageEnum,
    dataList,
  }
);

export const test = () => (
  {}
);