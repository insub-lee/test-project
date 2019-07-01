import { createSelector } from './node_modules/reselect';

const selectOrg = state => state.get('pageInfo');

const makeWidgetList = () => createSelector(
  selectOrg,
  org => org.get('widgetList').toJS(),
);

// const makeModalVisible = () => createSelector(
//   selectOrg,
//   org => org.get('titleModalVisible'),
// );

export {
  selectOrg,
  makeWidgetList,
  // makeModalVisible,
};
