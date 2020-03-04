import { createSelector } from 'reselect';

const selectApproveBase = state => state.get('apps.WorkFlow.components.ApproveBase.reducer');

const makeSelectApproveList = () =>
  createSelector(
    selectApproveBase,
    state => state.get('approveList').toJS(),
  );

const makeSelectUnApproveList = () =>
  createSelector(
    selectApproveBase,
    state => state.get('unApproveList').toJS(),
  );

const makeSelectDraftList = () =>
  createSelector(
    selectApproveBase,
    state => state.get('draftList').toJS(),
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
  makeSelectApproveList,
  makeSelectUnApproveList,
  makeSelectDraftList,


  
  makeSelectSelectedRow,
  makeSelectViewVisible,
  makeSelectOpinionVisible,
  makeSelectOpinion,
  makeSelectFormData,
};
