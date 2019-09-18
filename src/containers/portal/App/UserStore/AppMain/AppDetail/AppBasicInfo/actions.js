import * as constants from './constants';
import * as appConstants from '../../../constants';

export const reqAppBasicInfo = params => ({
  type: constants.REQ_APP_BASIC_INFO,
  payload: { params },
});

export const resAppBasicInfo = list => ({
  type: constants.RES_APP_BASIC_INFO,
  payload: { list },
});

export const appProcess = list => ({
  type: constants.APP_PROCESS,
  payload: { list },
});

export const appManual = list => ({
  type: constants.APP_MANUAL,
  payload: { list },
});

export const appManagerList = list => ({
  type: constants.APP_MANAGER_LIST,
  payload: { list },
});

export const registApp = APP_ID => ({
  type: constants.REGIST_APP,
  APP_ID,
});

export const registCategory = APP_ID => ({
  type: constants.REGIST_CATEGORY,
  APP_ID,
});

export const appBizGubun = gubun => ({
  type: appConstants.APP_BIZ_GUBUN,
  gubun,
});
