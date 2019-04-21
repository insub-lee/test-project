import * as constants from './constants';

export const serviceDupChk = param => (
  {
    type: constants.SERVICE_DUPCHECK_SAGA,
    param,
  }
);

export const serviceDupChkValChg = param => (
  {
    type: constants.SET_DUPCHECK_FLAG,
    param,
  }
);

export const serviceSave = param => (
  {
    type: constants.SERVICE_SAVE_SAGA,
    param,
  }
);

export const serviceSaveFlag = param => (
  {
    type: constants.SET_SAVE_FLAG,
    param,
  }
);
