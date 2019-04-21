import { createSelector } from 'reselect';
const selectProf = state => state.get('prof');
const makeTreeData = () => createSelector(
  selectProf,
  org => org.get('treeData').toJS(),
);
const makeUsers = () => createSelector(
  selectProf,
  org => {
    if (org.get('users').length === 0) {
      return [];
    }
    return org.get('users').toJS();
  }
);
const makeUser = () => createSelector(
  selectProf,
  org => org.get('user'),
);
const makeOrganizationSearchResult = () => createSelector(
  selectProf,
  org => {
    if (org.get('organizationSearchResult').length === 0) {
      return [];
    }
    return org.get('organizationSearchResult').toJS();
  }
);
const makeOrganizationData = () => createSelector(
  selectProf,
  org => {
    return org.get('organizationData').toJS();
  }
)
const makeSelectedDept = () => createSelector(
  selectProf,
  org => {
    return org.get('selectedDept');
  }
)
const makeSelectEmptyRowsView = () => createSelector(
  selectProf,
  org => org.get('emptyRowsView'),
)
const makeLoadProfile = () => createSelector(
  selectProf,
  org => org.get('profile'),
)
export {
  selectProf,
  makeTreeData,
  makeUsers,
  makeUser,
  makeOrganizationSearchResult,
  makeOrganizationData,
  makeSelectedDept,
  makeSelectEmptyRowsView,
  makeLoadProfile,
};