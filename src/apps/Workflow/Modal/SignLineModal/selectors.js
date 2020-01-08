import { createSelector } from 'reselect';

const selectAppsWorkflowSignLineModal = state => state.get('apps.Workflow.SignLienModal');

const makeUsers = () => createSelector(selectAppsWorkflowSignLineModal, state => state.get('users').toJS());

const makePagination = () => createSelector(selectAppsWorkflowSignLineModal, state => state.get('pagination').toJS());

const makeSelectedUsers = () => createSelector(selectAppsWorkflowSignLineModal, state => state.get('selectedUsers').toJS());

export { makeUsers, makePagination, makeSelectedUsers };
