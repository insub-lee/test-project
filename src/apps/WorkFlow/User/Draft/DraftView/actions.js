import * as actionTypes from './constants';

export const getDraftDetail = payload => ({
  type: actionTypes.GET_DRAFT_DETAIL,
  payload,
});

export const setDraftDetail = (detail, signline, draftHistory) => ({
  type: actionTypes.SET_DRAFT_DETAIL,
  detail,
  signline,
  draftHistory,
});

export const requestApproval = payload => ({
  type: actionTypes.REQ_APPROVAL,
  payload,
});

export const setIsRedirect = isRedirect => ({
  type: actionTypes.SET_ISREDIRECT,
  isRedirect,
});

export const setVisibleOpinionModal = visibleOpinionModal => ({
  type: actionTypes.SET_VISIBLE_OPINION,
  visibleOpinionModal,
});

export const initDraftDetail = () => ({
  type: actionTypes.INIT_DRAFT_DETAIL,
});
