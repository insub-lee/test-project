import { createSelector } from 'reselect';

const selectOrg = state => state.get('admin/AdminMain/Menu/BizMenuReg');

const makeCategoryData = () => createSelector(selectOrg, org => org.get('categoryData').toJS());

const makeBizGroupInfo = () => createSelector(selectOrg, org => org.get('bizGroupInfo').toJS());

const makeSelectedIndex = () => createSelector(selectOrg, org => org.get('selectedIndex'));

const makeRootMenuId = () => createSelector(selectOrg, org => org.get('MENU_ID'));

// const makeModalVisible = () => createSelector(
//   selectOrg,
//   org => org.get('titleModalVisible'),
// );

export {
  selectOrg,
  makeCategoryData,
  makeBizGroupInfo,
  makeSelectedIndex,
  makeRootMenuId,
  // makeModalVisible,
};
