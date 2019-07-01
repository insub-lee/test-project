import { createSelector } from 'reselect';

const selectOrg = state => state.get('appstore');

const makeCategoryData = () => createSelector(
  selectOrg,
  org => org.get('categoryData').toJS(),
);

const makeSelectedIndex = () => createSelector(
  selectOrg,
  org => org.get('selectedIndex'),
);

// const makeModalVisible = () => createSelector(
//   selectOrg,
//   org => org.get('titleModalVisible'),
// );

export {
  selectOrg,
  makeCategoryData,
  makeSelectedIndex,
  // makeModalVisible,
};
