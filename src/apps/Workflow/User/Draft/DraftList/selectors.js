import { createSelector } from 'reselect';

const selectDraftList = state => state.get('apps.WorkFlow.User.Draft.DraftList');

const makeDraftList = () =>
  createSelector(
    selectDraftList,
    state => state.get('draftList').toJS(),
  );

export { makeDraftList };
