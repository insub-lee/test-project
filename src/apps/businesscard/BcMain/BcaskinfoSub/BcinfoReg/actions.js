import * as constants from './constants';

export const getGlobalMsg = MSG_KEY => (
  {
    type: constants.GET_GLOBAL_MSG,
    MSG_KEY,
  }
);

export const getBcInfo = BC_ID => (
  {
    type: constants.GET_SITE_DETAIL,
    BC_ID,
  }
);

export const registGlobalMsg = (CARD_TYPE_CD, 
                                CARD_REQST_NO, 
                                REQST_ID, 
                                REQST_KOR_NM,
                                JW_KOR_NM,
                                TM_KOR_NM, 
                                ADDR_KOR_NM1,
                                ADDR_KOR_NM2,
                                TEL_NO,
                                FAX_NO,
                                HP_NO,
                                EMAIL,
                                JM_KOR_NM,
                                REQST_ENG_NM,
                                JW_ENG_NM,
                                TM_ENG_NM,
                                ADDR_ENG_NM1,
                                ADDR_ENG_NM2,
                                JM_ENG_NM,
                                CARD_RCV_CD,
                                BULDING_NM,
                                PL_UN_KOR_NM,
                                MEMO_DESC,
                                REQST_QTY,
                                REQST_CHN_NM,
                                JM_YN,
                                JC_YN,
                                PL_GBN,
                                LIC_KOR_NM,
                                LIC_ENG_NM,
                                history) => (
  {
    type: constants.REG_GLOBAL_MSG,
    CARD_TYPE_CD, 
    CARD_REQST_NO, 
    REQST_ID, 
    REQST_KOR_NM,
    JW_KOR_NM,
    TM_KOR_NM, 
    ADDR_KOR_NM1,
    ADDR_KOR_NM2,
    TEL_NO,
    FAX_NO,
    HP_NO,
    EMAIL,
    JM_KOR_NM,
    REQST_ENG_NM,
    JW_ENG_NM,
    TM_ENG_NM,
    ADDR_ENG_NM1,
    ADDR_ENG_NM2,
    JM_ENG_NM,
    CARD_RCV_CD,
    BULDING_NM,
    PL_UN_KOR_NM,    
    MEMO_DESC,
    REQST_QTY,
    REQST_CHN_NM,
    JM_YN,
    JC_YN,
    PL_GBN,
    LIC_KOR_NM,
    LIC_ENG_NM,
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
