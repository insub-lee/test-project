import { createSelector } from 'reselect';

const selectOrg = state => state.get('masterFncloc');

const makeCategoryData = () => createSelector(selectOrg, org => org.get('categoryData').toJS());

const selectView = state => state.get('common');

const currentView = () => createSelector(selectView, viewState => viewState.get('view'));
export { selectOrg, makeCategoryData, currentView };
