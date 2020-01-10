import * as actionTypes from './constants';

export const getDraftQueHistoryList = draftId => ({
  type: actionTypes.GET_DRAFT_QUE_HISTORY_LIST,
  draftId,
});

export const setDraftQueHistoryList = list => ({
  type: actionTypes.SET_DRAFT_QUE_HISTORY_LIST,
  list,
});
