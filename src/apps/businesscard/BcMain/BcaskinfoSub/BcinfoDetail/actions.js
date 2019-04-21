import * as constants from './constants';

export const getBcInfo = BC_ID => (
  {
    type: constants.GET_SITE_DETAIL,
    BC_ID,
  }
);

export const delGlobalMsg = (delKeys, history) => (
  {
    type: constants.DEL_GLOBAL_MSG,
    delKeys,
    history,
  }
);

