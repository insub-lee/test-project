import { createSelector } from 'reselect';

const selectUserProfile = state => state.get('auth');
const selectUserFullPath = state => state.get('userProfile');

const makeSelectProfile = () =>
  createSelector(
    selectUserProfile,
    userProfileState => userProfileState.get('profile'), // .toJS(),
  );

const makeSelectFullPath = () =>
  createSelector(
    selectUserProfile,
    // selectUserFullPath,
    userProfileState => userProfileState.get('profile'), // fullPath'), // .toJS(),
  );

export { selectUserProfile, selectUserFullPath, makeSelectProfile, makeSelectFullPath };
