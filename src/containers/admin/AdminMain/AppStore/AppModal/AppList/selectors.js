import { createSelector } from 'reselect';

const selectOrg = state => state.get('admin/AdminMain/AppStore/AppModal/AppList');

const makeInitType = () => createSelector(
  selectOrg,
  org => org.get('initType'),
);

const makeMapList = () => createSelector(
  selectOrg,
  org => org.get('mapList').toJS(),
);

const makeSearchword = () => createSelector(
  selectOrg,
  org => org.get('searchword'),
);

const makeCategoryComboData = () => createSelector(
  selectOrg,
  org => org.get('categoryComboData').toJS(),
);

const selectView = state => state.get('hynix.common');

const currentView = () => createSelector(
  selectView,
  viewState => viewState.get('view'),
);

export {
  selectOrg,
  makeInitType,
  makeMapList,
  makeSearchword,
  makeCategoryComboData,
  currentView,
};
