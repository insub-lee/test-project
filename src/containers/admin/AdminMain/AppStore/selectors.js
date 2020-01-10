import { createSelector } from 'reselect';

const selectAppStore = state => state.get('admin/AdminMain/AppStore');

const makeCategoryComboList = () => createSelector(selectAppStore, appStoreState => appStoreState.get('categoryComboList').toJS());

const makeCategoryData = () => createSelector(selectAppStore, appStoreState => appStoreState.get('categoryData').toJS());

const makeSelectedIndex = () => createSelector(selectAppStore, appStoreState => appStoreState.get('selectedIndex'));

const makeSiteId = () => createSelector(selectAppStore, appStoreState => appStoreState.get('siteId'));

export { selectAppStore, makeCategoryComboList, makeCategoryData, makeSelectedIndex, makeSiteId };
