import { createSelector } from 'reselect';

const selectorSignLine = state => state.get('apps.WorkFlow.SignLine.reducer');

const makeSelectDraftPrcRule = () =>
  createSelector(
    selectorSignLine,
    state => (state.get('draftPrcRule') !== undefined ? state.get('draftPrcRule').toJS() : {}),
  );

export { makeSelectDraftPrcRule };
