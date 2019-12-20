import * as constants from './constants';

export const initQnaList = (appId, page, pagepernum, gubun) => ({
  type: constants.INIT_QNA_LIST,
  payload: {
    t2: appId,
    page,
    pagepernum,
    t3: gubun,
  },
});

export const getQnaList = (appId, page, pagepernum, qnaList, gubun) => ({
  type: constants.GET_QNA_LIST,
  payload: {
    t2: appId,
    page,
    pagepernum,
    qnaList,
    t3: gubun,
  },
});

export const getFaqList = (appId, page, pagepernum, faqList, gubun) => ({
  type: constants.GET_FAQ_LIST,
  payload: {
    t2: appId,
    page,
    pagepernum,
    faqList,
    t3: gubun,
  },
});

export const getMyqnaList = (appId, page, pagepernum, myqnaList, gubun) => ({
  type: constants.GET_MYQNA_LIST,
  payload: {
    t2: appId,
    page,
    pagepernum,
    myqnaList,
    t3: gubun,
  },
});
