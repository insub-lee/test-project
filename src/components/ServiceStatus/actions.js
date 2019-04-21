import * as constants from './constants';

export const getService = (appID, pageID) => ({
  type: constants.GET_SERVICE_DATA,
  appID,
  pageID,
});

export const a = appID => ({
  type: constants.GET_SERVICE_DATA,
  appID,
});
