import { createSelector } from 'reselect';

const selectApp = state => state.get('app');

const makeSelectCollapsed = () => createSelector(selectApp, appState => appState.get('collapsed'));

const makeSelectMenus = () => createSelector(selectApp, appState => appState.get('menus').toJS());

const makeSearchword = () => createSelector(selectApp, appState => appState.get('searchword'));

const makeMenuName = () => createSelector(selectApp, appState => appState.get('menuName'));

const makeMenuList = () => createSelector(selectApp, appState => appState.get('menuList').toJS());

const makeIsLoading = () => createSelector(selectApp, appState => appState.get('isLoading'));

const makeAppBizGubun = () => createSelector(selectApp, appState => appState.get('appBizGubun'));

const selectView = state => state.get('common');

const currentView = () => createSelector(selectView, viewState => viewState.get('view'));

export { selectApp, makeSelectCollapsed, makeSelectMenus, makeSearchword, makeMenuName, makeMenuList, makeIsLoading, currentView, makeAppBizGubun };
