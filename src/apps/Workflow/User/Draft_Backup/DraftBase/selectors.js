import { createSelector } from 'reselect';

const selectDraftBase = state => state.get('apps.WorkFlow.User.Draft.DraftBase');

const makeDraftDetail = () => createSelector(selectDraftBase, state => state.get('draftDetail').toJS());

const makeSignline = () => createSelector(selectDraftBase, state => state.get('signline').toJS());

const makeDraftHistoryList = () => createSelector(selectDraftBase, state => state.get('draftHistory').toJS());

const makeIsRedirect = () => createSelector(selectDraftBase, state => state.get('isRedirect'));

const makeVisibleOpinionModal = () => createSelector(selectDraftBase, state => state.get('visibleOpinionModal'));

const makeApprovalProcessQueId = () => createSelector(selectDraftBase, state => state.get('approvalProcessQueId'));

const makeProcessStep = () => createSelector(selectDraftBase, state => state.get('processStep').toJS());

const makeStepLine = () => createSelector(selectDraftBase, state => state.get('stepLine').toJS());

export {
  makeDraftDetail,
  makeSignline,
  makeDraftHistoryList,
  makeIsRedirect,
  makeVisibleOpinionModal,
  makeApprovalProcessQueId,
  makeStepLine,
  makeProcessStep,
};
