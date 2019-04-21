import * as constants from './constants';

export const reqAppScreenshotList = appId => (
  {
    type: constants.REQ_APP_SCREENSHOT_LIST,
    payload: { appId },
  }
);

export const resAppScreenshotList = list => (
  {
    type: constants.RES_APP_SCREENSHOT_LIST,
    payload: { list },
  }
);

export const resAppExplain = list => (
  {
    type: constants.RES_APP_EXPLAIN,
    payload: { list },
  }
);

export const resRequiredAppList = list => (
  {
    type: constants.RES_REQUIRED_APP_LIST,
    payload: { list },
  }
);

export const resRecomAppList = list => (
  {
    type: constants.RES_RECOM_APP_LIST,
    payload: { list },
  }
);

export const registApp = (REF_APP_ID, APP_ID) => (
  {
    type: constants.REGIST_APP,
    REF_APP_ID,
    APP_ID,
  }
);

export const registCategory = (REF_APP_ID, APP_ID) => (
  {
    type: constants.REGIST_CATEGORY,
    REF_APP_ID,
    APP_ID,
  }
);
