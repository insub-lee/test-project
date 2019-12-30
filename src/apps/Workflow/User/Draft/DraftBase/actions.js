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

export const getExtraApiData = (id, apiArr) => ({
  type: `${actionTypes.GET_EXTRA_API_DATA}_${id}`,
  id,
  apiArr,
});

export const setExtraApiData = (id, apiKey, response) => ({
  type: actionTypes.SET_EXTRA_API_DATA,
  id,
  apiKey,
  response,
});

export const setApprovalProcessQueIdByReducr = queId => ({ type: actionTypes.SET_APPROVAL_PROCESS_QUE_ID_BY_REDUCR, queId });

export const setDraftStepInfoByReducr = (step, stepList) => ({ type: actionTypes.SET_DRAFT_STEP_INFO_BY_REDUCR, step, stepList });

export const getProcessDataBySaga = prcId => ({ type: actionTypes.GET_PROCESS_DATA_BY_SAGA, prcId });

export const setProcessDataByReducr = (processInfo, processStep) => ({
  type: actionTypes.SET_PROCESS_DATA_BY_REDUCR,
  processInfo,
  processStep,
});

export const addDraftLineBySaga = (REL_TYPE, REL_KEY, PRC_ID, TITLE) => ({ type: actionTypes.ADD_DRAFT_LINE_BY_SAGA, REL_TYPE, REL_KEY, PRC_ID, TITLE });
