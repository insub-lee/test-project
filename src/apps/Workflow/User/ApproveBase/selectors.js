import { createSelector } from 'reselect';

const selectApproveBase = state => state.get('apps.WorkFlow.User.ApproveBase.reducer');

const makeSelectSearchType = () =>
  createSelector(
    selectApproveBase,
    state => state.get('searchType'),
  );

const makeSelectApproveList = () =>
  createSelector(
    selectApproveBase,
    state => state.get('approveList').toJS(),
  );

const makeSelectSelectedRow = () =>
  createSelector(
    selectApproveBase,
    state => state.get('selectedRow').toJS(),
  );

const makeSelectViewVisible = () =>
  createSelector(
    selectApproveBase,
    state => state.get('viewVisible'),
  );

const makeSelectOpinionVisible = () =>
  createSelector(
    selectApproveBase,
    state => state.get('opinionVisible'),
  );

const makeSelectOpinion = () =>
  createSelector(
    selectApproveBase,
    state => state.get('opinion'),
  );

const makeSelectFormData = () =>
  createSelector(
    selectApproveBase,
    state => state.get('formData'),
  );

export {
  makeSelectSearchType,
  makeSelectApproveList,
  makeSelectSelectedRow,
  makeSelectViewVisible,
  makeSelectOpinionVisible,
  makeSelectOpinion,
  makeSelectFormData,
};
