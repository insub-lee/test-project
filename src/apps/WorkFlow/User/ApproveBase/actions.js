import * as actionTypes from './constants';

export const getApproveList = payload => ({
  type: actionTypes.GET_APPROVE_LIST,
  payload,
});

export const setApproveList = list => ({
  type: actionTypes.SET_APPROVE_LIST,
  list,
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
