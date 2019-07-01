import { createSelector } from './node_modules/reselect';

const selectOrg = state => state.get('mypage');

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
