import { createSelector } from 'reselect';

const selectDraftView = state => state.get('apps.WorkFlow.User.Draft.DraftView');

const makeDraftDetail = () =>
  createSelector(
    selectDraftView,
    state => state.get('draftDetail').toJS(),
  );

const makeSignline = () =>
  createSelector(
    selectDraftView,
    state => state.get('signline').toJS(),
  );

const makeDraftHistoryList = () =>
  createSelector(
    selectDraftView,
    state => state.get('draftHistory').toJS(),
  );

const makeIsRedirect = () =>
  createSelector(
    selectDraftView,
    state => state.get('isRedirect'),
  );

const makeVisibleOpinionModal = () =>
  createSelector(
    selectDraftView,
    state => state.get('visibleOpinionModal'),
  );

export { makeDraftDetail, makeSignline, makeDraftHistoryList, makeIsRedirect, makeVisibleOpinionModal };
