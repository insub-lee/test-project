import { createSelector } from 'reselect';

const selectorApproveHistory = state => state.get('apps.WorkFlow.ApproveHistory.reducer');

const makeSelectDraftQueHistoryList = () =>
  createSelector(selectorApproveHistory, state => (state.get('draftQueHistoryList') !== undefined ? state.get('draftQueHistoryList').toJS() : []));

export { makeSelectDraftQueHistoryList };
