import { createSelector } from 'reselect';

const selectOrg7 = state => state.get('org');

const makeTreeData = () => createSelector(
  selectOrg7,
  org => org.get('treeData').toJS(),
);

const makeUsers = () => createSelector(
  selectOrg7,
  org => org.get('users').toJS(),
);

const makeUser = () => createSelector(
  selectOrg7,
  org => org.get('user'),
);

export {
  selectOrg7,
  makeTreeData,

  makeUsers,
  makeUser,
};
