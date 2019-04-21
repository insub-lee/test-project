import * as constants from './constants';

export const serviceInfo = param => (
  {
    type: constants.SERVICE_INFO_SAGA,
    param,
  }
);

export const serviceUpdate = param => (
  {
    type: constants.SERVICE_UPDATE_SAGA,
    param,
  }
);

export const serviceUpdateFlag = param => (
  {
    type: constants.SET_UPDATE_FLAG,
    param,
  }
);
