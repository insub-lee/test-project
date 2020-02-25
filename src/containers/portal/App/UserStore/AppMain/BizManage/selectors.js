import { createSelector } from 'reselect';

const selectOrg = state => state.get('bizmanage');

const makeCategoryData = () => createSelector(selectOrg, org => org.get('categoryData').toJS());

const makeSelectedIndex = () => createSelector(selectOrg, org => org.get('selectedIndex'));

const makeMenuBizGrpId = () => createSelector(selectOrg, org => org.get('menuBizGrpId'));

const makeMenuHasBizGrpAuth = () => createSelector(selectOrg, org => org.get('hasBizGrpAuth'));

// const makeModalVisible = () => createSelector(
//   selectOrg,
//   org => org.get('titleModalVisible'),
// );

export {
  selectOrg,
  makeCategoryData,
  makeSelectedIndex,
  makeMenuBizGrpId,
  makeMenuHasBizGrpAuth,
  // makeModalVisible,
};
