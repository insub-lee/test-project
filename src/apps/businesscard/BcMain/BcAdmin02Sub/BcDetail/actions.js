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

export const CardStdCd_100 = (CardStdCd_Id, history) => (
  {
    type: constants.CARD_STD_CD_UPDATE100,
    CardStdCd_Id,
    history,
  }
);

export const CardStdCd_126 = (CardStdCd_Id, history) => (
  {
    type: constants.CARD_STD_CD_UPDATE126,
    CardStdCd_Id,
    history,
  }
);

export const CardStdCd_125 = (CardStdCd_Id, history) => (
  {
    type: constants.CARD_STD_CD_UPDATE125,
    CardStdCd_Id,
    history,
  }
);
