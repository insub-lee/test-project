import { createSelector } from 'reselect';

const selectMembers = state => state.get('members');
const selectSettingMembers = state => state.get('membersSetting');
const selectView = state => state.get('common');

const makeMembers = () => createSelector(
  selectMembers,
  members => members.get('members'),
);

const makeUserSetMembers = () => createSelector(
  selectSettingMembers,
  userSetMembers => userSetMembers.get('userSetMembers'),
);

const currentView = () => createSelector(
  selectView,
  viewState => viewState.get('view'),
);

export {
  selectMembers,
  makeUserSetMembers,
  makeMembers,
  currentView,
};
