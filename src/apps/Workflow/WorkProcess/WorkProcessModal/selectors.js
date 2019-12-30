import { createSelector } from 'reselect';

const selectWorkProcessModal = state => state.get('apps.WorkFlow.WorkProcess.WorkProcessModal');

const makeSelectDeptList = () =>
  createSelector(
    selectWorkProcessModal,
    state => state.get('deptList').toJS(),
  );

const makeSelectDeptUserList = () =>
  createSelector(
    selectWorkProcessModal,
    state => state.get('deptUserList').toJS(),
  );

export { makeSelectDeptList, makeSelectDeptUserList };
