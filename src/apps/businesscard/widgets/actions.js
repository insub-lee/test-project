import * as constants from './constants';

export const getList = (
  pageType,
) => (
  {
    type: constants.GET_INFO_LIST,
    pageType,
  }
);

export const getUserInfoList = (  
) => (
  {
    type: constants.GET_USER_INFO_LIST,
  }
);

export const handleSaveBusinessCardRequest = (
  cardTypeCd,
  reqstId,
  reqstKorNm,
  reqstEngNm,
  jwKorNm,
  jwEngNm,
  tmKorNm,
  tmEngNm,
  addrKorNm1,
  addrKorNm2,
  addrEngNm1,
  addrEngNm2,
  telNo,
  faxNo,
  hpNo,
  email,
  jmYN,
  jmKornm,
  jmEngnm,
  cardRcvCd,
  buldingNm,
  jcYN,
  jcKorNm,
  plUnKorNm,
  menoDesc,
  reqstQty,
  reqstChnNm,
  plGbn,
  licKorNm,
  licEngNm,
) => (
  {
    type: constants.SAVE_BC_REQST,
    cardTypeCd,
    reqstId,
    reqstKorNm,
    reqstEngNm,
    jwKorNm,
    jwEngNm,
    tmKorNm,
    tmEngNm,
    addrKorNm1,
    addrKorNm2,
    addrEngNm1,
    addrEngNm2,
    telNo,
    faxNo,
    hpNo,
    email,
    jmYN,
    jmKornm,
    jmEngnm,
    cardRcvCd,
    buldingNm,
    jcYN,
    jcKorNm,
    plUnKorNm,
    menoDesc,
    reqstQty,
    reqstChnNm,
    plGbn,
    licKorNm,
    licEngNm,
    // payload : {
      
    // }
  }
);
