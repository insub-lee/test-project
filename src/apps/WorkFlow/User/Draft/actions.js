import * as actionTypes from './constants';

export const getDraftList = (payload, pathname) => ({
  type: actionTypes.GET_DRAFT_LIST,
  payload,
  pathname,
});

export const setDraftList = (list, pathname) => ({
  type: actionTypes.SET_DRAFT_LIST,
  list,
  pathname,
});

export const initDraftData = () => ({
  type: actionTypes.INIT_DRAFT_DATA,
});

export const setSelectedDraft = (draft, visible, pathname) => ({
  type: actionTypes.SET_SELECTED_DRAFT,
  draft,
  visible,
  pathname,
});
