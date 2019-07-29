import { createSelector } from 'reselect';

const selectUserList = state => state.get('UserList');

const makeSelectUserList = () => createSelector(
  selectUserList,
  userList => userList.get('userList'),
);

export {
  selectUserList,
  makeSelectUserList,
};
