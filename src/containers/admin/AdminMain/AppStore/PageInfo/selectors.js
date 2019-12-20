import { createSelector } from 'reselect';

const selectOrg = state => state.get('admin/AdminMain/AppStore/PageInfo');

const makeWidgetList = () => createSelector(selectOrg, org => org.get('widgetList').toJS());

// const makeModalVisible = () => createSelector(
//   selectOrg,
//   org => org.get('titleModalVisible'),
// );

export {
  selectOrg,
  makeWidgetList,
  // makeModalVisible,
};
