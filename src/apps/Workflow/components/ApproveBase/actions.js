import * as actionTypes from './constants';

export const getCustomDataBind = (httpMethod, rtnUrl, param) => ({
  type: actionTypes.GET_CUSTOMER_DATABIND,
  httpMethod,
  rtnUrl,
  param,
});

export const setCustomDataBind = list => ({
  type: actionTypes.SET_CUSTOMER_DATABIND,
  list,
});

export const getApproveList = () => ({
  type: actionTypes.GET_APPROVE_LIST,
});

export const setApproveList = list => ({
  type: actionTypes.SET_APPROVE_LIST,
  list,
});

export const getUnApproveList = () => ({
  type: actionTypes.GET_UNAPPROVE_LIST,
});

export const setUnApproveList = list => ({
  type: actionTypes.SET_UNAPPROVE_LIST,
  list,
});

export const getDraftList = () => ({
  type: actionTypes.GET_DRAFT_LIST,
});

export const setDraftList = list => ({
  type: actionTypes.SET_DRAFT_LIST,
  list,
});

export const setPartialInit = () => ({
  type: actionTypes.SET_PARTIAL_INIT,
});

export const submitHandlerBySaga = (id, httpMethod, apiUrl, submitData, callbackFunc) => ({
  type: actionTypes.PUBLIC_ACTIONMETHOD_SAGA,
  id,
  httpMethod,
  apiUrl,
  submitData,
  callbackFunc,
});

export const setSelectedRow = row => ({
  type: actionTypes.SET_SELECTED_ROW,
  row,
});

export const setViewVisible = visible => ({
  type: actionTypes.SET_VIEW_VISIBLE,
  visible,
});

export const setOpinionVisible = visible => ({
  type: actionTypes.SET_OPINION_VISIBLE,
  visible,
});

export const setOpinion = opinion => ({
  type: actionTypes.SET_OPINION,
  opinion,
});

export const reqApprove = appvStatus => ({
  type: actionTypes.REQ_APPROVE,
  appvStatus,
});

export const setBizFormData = formData => ({
  type: actionTypes.SET_BIZFORMDATA,
  formData,
});

export const getUserInfo = (userInfo, callBack) => ({
  type: actionTypes.GET_USERINFO,
  userInfo,
  callBack,
});

export const setUserInfo = userInfo => ({
  type: actionTypes.SET_USERINFO,
  userInfo,
});
