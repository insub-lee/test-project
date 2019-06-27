import * as constants from './constants';

export const getMapList = (key, history) => ({
  type: constants.GET_MAPLIST,
  key,
  history,
});

export const registApp = APP_ID => ({
  type: constants.REGIST_APP,
  APP_ID,
});

export const registCategory = APP_ID => ({
  type: constants.REGIST_CATEGORY,
  APP_ID,
});
