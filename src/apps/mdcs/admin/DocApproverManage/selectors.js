import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const makeSelectDocApproverState = state => state.get('apps-mdcs-admin-DocApproverManage-reducer');

const makeSelectCategoryMapList = () => createSelector(makeSelectDocApproverState, state => state.get('categoryMapList'));

const makeSelectDraftMapList = () => createSelector(makeSelectDocApproverState, state => state.get('draftMapList'));

const makeSelectDegreeMapList = () => createSelector(makeSelectDocApproverState, state => state.get('degreeMapList'));

const makeSelectApproverMapList = () => createSelector(makeSelectDocApproverState, state => state.get('approverMapList'));

const makeSelectedTaskSeq = () => createSelector(makeSelectDocApproverState, state => state.get('selectedTaskSeq'));

export default {
  makeSelectCategoryMapList,
  makeSelectDraftMapList,
  makeSelectDegreeMapList,
  makeSelectApproverMapList,
  makeSelectedTaskSeq,
};
