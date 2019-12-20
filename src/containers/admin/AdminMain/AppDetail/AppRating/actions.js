import * as constants from './constants';

export const reqAppRatingInfo = (appId, page, pagePerNum, appRatingList) => ({
  type: constants.REQ_APP_RATING_INFO,
  payload: {
    appId,
    page,
    pagePerNum,
    appRatingList,
  },
});

export const resAppRatingInfo = list => ({
  type: constants.RES_APP_RATING_INFO,
  payload: { list },
});

export const registRating = (POINT, COMNT, APP_ID, GUBUN, page, pagePerNum) => ({
  type: constants.REGIST_RATING,
  payload: {
    POINT,
    COMNT,
    APP_ID,
    GUBUN,
    page,
    pagePerNum,
  },
});
