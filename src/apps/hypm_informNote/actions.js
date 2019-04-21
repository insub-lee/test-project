import * as constants from './constants';

export const loadingUserDefine = () => (
  {
    type: constants.LOADING_USERCOMPANYDEFINE_SAGA,
  }
);

export const loadingUserCompanyDefine = () => (
  {
    type: constants.LOADING_USERCOMPANYDEFINE_SAGA,
  }
);

export const sendInterlockPush = (target) => (
  {
    type: constants.SEND_INTERLOCKPUSH_SAGA,
    param: target,
  }
);