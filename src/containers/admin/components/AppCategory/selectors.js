import { createSelector } from 'reselect';

const selectOrg = state => state.get('admin/components/AppCategory');

const makeCategoryData = () => createSelector(
  selectOrg,
  org => org.get('categoryData').toJS(),
);

const selectView = state => state.get('hynix.common');

const currentView = () => createSelector(
  selectView,
  viewState => viewState.get('view'),
);
export {
  selectOrg,
  makeCategoryData,
  currentView,
};
