import * as actionTypes from './constants';

export const setInitialState = () => ({
  type: actionTypes.SET_INITIALSTATE,
});

export const getUsers = payload => ({
  type: actionTypes.GET_USERS,
  payload,
});

export const setUsers = (list, currentPage) => ({
  type: actionTypes.SET_USERS,
  list,
  currentPage,
});

export const setPagination = pagination => ({
  type: actionTypes.SET_PAGINATION,
  pagination,
});

export const setSelectedUsers = selectedUsers => ({
  type: actionTypes.SET_SELECTEDUSERS,
  selectedUsers,
});

// export const addSelectedUsers = rows => ({
//   type: actionTypes.ADD_SELECTEDUSERS,
//   rows,
// });

// export const removeSelectedUsers = userIds => ({
//   type: actionTypes.REMOVE_SELECTEDUSERS,
//   userIds,
// });
