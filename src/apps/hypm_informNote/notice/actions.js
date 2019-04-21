import * as constants from './constants';

export const saveInformNotice = param => (
  {
    type: constants.SAVE_INFORMNOTICE_TAB_SAGA,
    param,
  }
);

export const commonJobInterlockCheck = param => (
  {
    type: constants.COMMON_JOB_INTERLOCK_CHECK_SAGA,
    param,
  }
);
