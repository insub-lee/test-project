import { createSelector } from 'reselect';

const selectUserProfile = state => state.get('auth').toJS();
const selectUserFullPath = state => state.get('userProfile').toJS();
const selectLanguage = state => state.get('language');

// language 스토어의 locale값을 가져옴
const makeSelectLocale = () => createSelector(
  selectLanguage,
  languageState => languageState.get('locale'),
);

const makeSelectProfile = () => createSelector(
  selectUserProfile,
  userProfileState => userProfileState.profile,
);

const makeSelectFullPath = () => createSelector(
  selectUserFullPath,
  userProfileState => userProfileState.fullPath,
);

export {
  selectUserProfile,
  selectUserFullPath,
  makeSelectProfile,
  makeSelectFullPath,
  makeSelectLocale,
};
