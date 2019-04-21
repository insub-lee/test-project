import * as constants from './constants';

export const LoadingNoticeList = (value) => (
  {
    type: constants.LOADING_NOTICE_LIST_SAGA,
    payload: {
      value,
    }
  }
);

export const handleUpdateNotice = (inspLot, empNo, coWorker, content) => (
  {
    type: constants.UPDATE_NOTICE_LIST_SAGA,
    payload: {
      inspLot,
      empNo,
      coWorker,
      content,
    }
  }
);
