import { createSelector } from 'reselect';

const selectOrg = state => state.get('bizmenuPageInfo');

const makeBizGroupInfo = () => createSelector(
  selectOrg,
  org => org.get('bizGroupInfo'),
);

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
  makeBizGroupInfo,
  makeWidgetList,
  // makeModalVisible,
};
