import { createSelector } from 'reselect';

const selectApps = state => state.get('quickmenu');
const selectView = state => state.get('hynix.common');

const makeAppList = () => createSelector(
  selectApps,
  appState => appState.get('applist'),
);

const makeAppTree = () => createSelector(
  selectApps,
  appState => appState.get('appTree').toJS(),
)

const makeAppCategoryList = () => createSelector(
  selectApps,
  appState => appState.get('categoryList'),
);

const makeCheckBoxStat = () => createSelector(
  selectApps,
  appState => appState.get('checkboxstate'),
);

const makeDscrList = () => createSelector(
  selectApps,
  appState => appState.get('dscrList'),
);

const currentView = () => createSelector(
  selectView,
  viewState => viewState.get('view'),
);

export {
  selectApps,
  makeAppList,
  makeAppTree,
  makeAppCategoryList,
  makeCheckBoxStat,
  makeDscrList,
  currentView,
};
