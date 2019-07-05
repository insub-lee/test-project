import * as constants from './constants';

export const getAppSecList =
  (PAGE, PAGE_CNT, SORT_COLUMN, SORT_DIRECTION, APP_ID, REQ_STATUS_CD, SEARCH_TEXT) => ({
    type: constants.GET_APPSECLIST_SAGA,
    PAGE,
    PAGE_CNT,
    SORT_COLUMN,
    SORT_DIRECTION,
    APP_ID,
    REQ_STATUS_CD,
    SEARCH_TEXT,
  });

export const returnRequest = (REQ_ID_ARR, COMMENT, loadingSet) => ({
  type: constants.RETURN_REQUEST,
  REQ_ID_ARR,
  COMMENT,
  loadingSet,
});

export const cancelRequest = (REQ_ID, COMMENT, loadingSet) => ({
  type: constants.CANCEL_REQUEST,
  REQ_ID,
  COMMENT,
  loadingSet,
});

export const confirmRequest = (REQ_ID_ARR, loadingSet) => ({
  type: constants.CONFIRM_REQUEST,
  REQ_ID_ARR,
  loadingSet,
});
