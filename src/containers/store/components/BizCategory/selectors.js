import { createSelector } from 'reselect';

const selectOrg = state => state.get('bizcategory');

const makeCategoryData = () => createSelector(selectOrg, org => org.get('categoryData').toJS());

const makeSelectedIndex = () => createSelector(selectOrg, org => org.get('selectedIndex'));

const selectView = state => state.get('common');

const currentView = () => createSelector(selectView, viewState => viewState.get('view'));

export { selectOrg, makeCategoryData, makeSelectedIndex, currentView };
