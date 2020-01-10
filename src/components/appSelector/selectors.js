import { createSelector } from 'reselect';

const selectApps = state => state.get('atree');

const makeAppList = () => createSelector(selectApps, appState => appState.get('applist'));

const makeAppTree = () => createSelector(selectApps, appState => appState.get('appTree').toJS());

const makeAppCategoryList = () => createSelector(selectApps, appState => appState.get('categoryList'));

const makeCheckBoxStat = () => createSelector(selectApps, appState => appState.get('checkboxstate'));

export { selectApps, makeAppList, makeAppTree, makeAppCategoryList, makeCheckBoxStat };
