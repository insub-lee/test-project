import * as constants from './constants';

export const getMasterPmBom = param => (
  {
    type: constants.GET_MASTER_PMBOM,
    param,
  }
);

export const temp = value => (
  {
    type: constants.TEMP,
    value,
  }
);
