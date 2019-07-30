import { createSelector } from 'reselect';

const selectUserList = state => state.get('UserList');

const makeSelectUserList = () => createSelector(
  selectUserList,
  userList => userList.get('userList'),
);

const makeSelectComboData = () => createSelector(
  selectUserList,
  userReg => userReg.get('comboData').toJS(),
);

const makeTreeData = () => createSelector(
  selectUserList,
  userReg => userReg.get('treeData').toJS(),
);

const makeIsLoading = () => createSelector(
  selectUserList,
  userReg => userReg.get('isLoading'),
);

export {
  selectUserList,
  makeSelectUserList,
  makeSelectComboData,
  makeTreeData,
  makeIsLoading,
};
