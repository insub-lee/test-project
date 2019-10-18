import { createSelector } from 'reselect';

const selectDraf = state => state.get('apps.WorkFlow.User.Draft');

const makeDraftList = () =>
  createSelector(
    selectDraf,
    state => state.get('draftList').toJS(),
  );

const makeSelectedDraft = () =>
  createSelector(
    selectDraf,
    state => state.get('selectedDraft').toJS(),
  );

const makeVisibleViewModal = () =>
  createSelector(
    selectDraf,
    state => state.get('visibleViewModal').toJS(),
  );

export { makeDraftList, makeSelectedDraft, makeVisibleViewModal };
