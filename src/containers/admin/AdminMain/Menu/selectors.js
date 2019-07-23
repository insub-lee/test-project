import { createSelector } from 'reselect';

const selectOrg = state => state.get('admin/AdminMain/Menu');

const makeCategoryData = () =>
  createSelector(
    selectOrg,
    org => org.get('categoryData').toJS(),
  );

const makeSelectedIndex = () =>
  createSelector(
    selectOrg,
    org => org.get('selectedIndex'),
  );

const makeMenuBizGrpId = () =>
  createSelector(
    selectOrg,
    org => org.get('menuBizGrpId'),
  );

const makeUserRole = () =>
  createSelector(
    selectOrg,
    org => org.get('userRole'),
  );
  
// const makeModalVisible = () => createSelector(
//   selectOrg,
//   org => org.get('titleModalVisible'),
// );

export {
  selectOrg,
  makeCategoryData,
  makeSelectedIndex,
  makeMenuBizGrpId,
  makeUserRole,
  // makeModalVisible,
};
