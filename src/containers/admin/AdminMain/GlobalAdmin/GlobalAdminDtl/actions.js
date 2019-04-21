import * as constants from './constants';

export const getGlobalMsg = MSG_KEY => (
  {
    type: constants.GET_GLOBAL_MSG,
    MSG_KEY,
  }
);

export const registGlobalMsg = (MSG_KEY, DSCR_KOR, DSCR_ENG, DSCR_CHN, history) => (
  {
    type: constants.REG_GLOBAL_MSG,
    MSG_KEY,
    DSCR_KOR,
    DSCR_ENG,
    DSCR_CHN,
    history,
  }
);

export const delGlobalMsg = (delKeys, history) => (
  {
    type: constants.DEL_GLOBAL_MSG,
    delKeys,
    history,
  }
);

export const udtGlobalMsg = (MSG_KEY, DSCR_KOR, DSCR_ENG, DSCR_CHN, history) => (
  {
    type: constants.UDT_GLOBAL_MSG,
    MSG_KEY,
    DSCR_KOR,
    DSCR_ENG,
    DSCR_CHN,
    history,
  }
);
