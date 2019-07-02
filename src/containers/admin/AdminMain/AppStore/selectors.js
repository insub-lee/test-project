import { createSelector } from 'reselect';

const selectAppStore = state => state.get('appstore');

const makeCategoryComboList = () => createSelector(
  selectAppStore,
  appStoreState => appStoreState.get('categoryComboList').toJS(),
);

const makeCategoryData = () => createSelector(
  selectAppStore,
  appStoreState => appStoreState.get('categoryData').toJS(),
);

const makeSelectedIndex = () => createSelector(
  selectAppStore,
  appStoreState => appStoreState.get('selectedIndex'),
);

export {
  selectAppStore,
  makeCategoryComboList,
  makeCategoryData,
  makeSelectedIndex,
};
