import * as constants from './constants';

export const getGlobalMsg = MSG_KEY => (
  {
    type: constants.GET_GLOBAL_MSG,
    MSG_KEY,
  }
);

export const registGlobalMsg = (CARD_TYPE_CD, CARD_REQST_NO, REQST_ID, REQST_KOR_NM,JW_KOR_NM,TM_KOR_NM, history) => (
  {
    type: constants.REG_GLOBAL_MSG,
    CARD_TYPE_CD, 
    CARD_REQST_NO, 
    REQST_ID, 
    REQST_KOR_NM,
    JW_KOR_NM,
    TM_KOR_NM,
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
