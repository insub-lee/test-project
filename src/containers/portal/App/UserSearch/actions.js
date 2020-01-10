import * as actionType from './constants';

export const handleUserSearchHistory = value => ({
  type: actionType.USER_SEARCH_HISTORY_SAGA,
  payload: {
    value,
  },
});
export const handleUserSearch = value => ({
  type: actionType.USER_SEARCH_SAGA,
  payload: {
    value,
  },
});

export const handleClickToHistoryDelete = history => ({
  type: actionType.USER_HISTORY_DELETE_SAGA,
  payload: {
    history,
  },
});

export const handleClickToHistoryDeleteAll = history => ({
  type: actionType.USER_HISTORY_DELETEALL_SAGA,
  payload: {
    history,
  },
});

export const handleClickToHistoryInsert = user => ({
  type: actionType.USER_HISTORY_INSERT_SAGA,
  payload: {
    user,
  },
});

export const handleEnableSearchResultView = () => ({
  type: actionType.USER_ENABLE_SEARCH_RESULT_VIEW,
});

export const handleClearSearchResultView = () => ({
  type: actionType.USER_CLEAR_SEARCH_RESULT_VIEW,
});

export const handleDisableSearchResultView = () => ({
  type: actionType.USER_DISABLE_SEARCH_RESULT_VIEW,
});

export const handleGetProfileData = userId => ({
  type: actionType.USER_PROFILE_DATA_SAGA,
  userId,
});
