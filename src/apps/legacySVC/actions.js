import * as actionType from './constants';

export const getUrl = (appId, version) => ({
  type: actionType.GET_LEGACYSVC_URL_SAGA,
  appId,
  version,
});

export const test = item => ({
  type: actionType.GET_LEGACYSVC_URL_SAGA,
  item,
});
