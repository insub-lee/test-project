import { createSelector } from 'reselect';

// const selectUserSearch = function (state) {
//   state.get('userSearch');
// };

const selectUserProfile = state => state.get('auth').toJS();

const selectUserSearch = state => state.get('userSearch');

const makeSelectSearch = () => createSelector(
  selectUserSearch,
  userSearchState => userSearchState.search,
);

const makeSearchProfile = () => createSelector(
  selectUserSearch,
  userSearchState => userSearchState.searchProfile,
);

export {
  selectUserSearch,
  selectUserProfile,
  makeSelectSearch,
  makeSearchProfile,
};
