import * as actionTypes from './constants';

export const getDraftPrcRule = draftId => ({
  type: actionTypes.GET_DRAFT_PRC_RULE,
  draftId,
});

export const setDraftPrcRule = draftPrcRule => ({
  type: actionTypes.SET_DRAFT_PRC_RULE,
  draftPrcRule,
});
