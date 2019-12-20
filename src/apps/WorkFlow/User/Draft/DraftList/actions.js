import * as actionTypes from './constants';

export const getDraftList = payload => ({
  type: actionTypes.GET_DRAFT_LIST,
  payload,
});

export const setDraftList = list => ({
  type: actionTypes.SET_DRAFT_LIST,
  list,
});

export const initDraftData = () => ({
  type: actionTypes.INIT_DRAFT_DATA,
});
