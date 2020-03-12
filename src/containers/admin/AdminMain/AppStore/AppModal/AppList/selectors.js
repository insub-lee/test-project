import { createSelector } from 'reselect';

const selectOrg = state => state.get('admin/AdminMain/AppStore/AppModal/AppList');

const makeInitType = () => createSelector(selectOrg, org => org.get('initType'));

const makeMapList = () => createSelector(selectOrg, org => org.get('mapList').toJS());

const makeSearchword = () => createSelector(selectOrg, org => org.get('searchword'));

const makeCategoryFlatData = () => createSelector(selectOrg, org => org.get('categoryFlatData').toJS());

const selectView = state => state.get('common');

const currentView = () => createSelector(selectView, viewState => viewState.get('view'));

export { selectOrg, makeInitType, makeMapList, makeSearchword, makeCategoryFlatData, currentView };
