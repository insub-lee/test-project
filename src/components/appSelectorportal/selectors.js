import { createSelector } from 'reselect';

const selectApps = state => state.get('atreeportal');

const makeAppList = () => createSelector(selectApps, appState => appState.get('bapplist'));

const makeAppTree = () => createSelector(selectApps, appState => appState.get('appTree').toJS());

const makeAppCategoryList = () => createSelector(selectApps, appState => appState.get('categoryList'));

const makeCheckBoxStat = () => createSelector(selectApps, appState => appState.get('checkboxstate'));

const makeDscrList = () => createSelector(selectApps, appState => appState.get('dscrList'));

export { selectApps, makeAppList, makeAppTree, makeAppCategoryList, makeCheckBoxStat, makeDscrList };
