import { createSelector } from 'reselect';

const selectApp = state => state.get('app');

const makeSelectCollapsed = () => createSelector(
  selectApp,
  appState => appState.get('collapsed'),
);

const makeSelectMenus = () => createSelector(
  selectApp,
  appState => appState.get('menus').toJS(),
);

const makeSearchword = () => createSelector(
  selectApp,
  appState => appState.get('searchword'),
);

export {
  selectApp,
  makeSelectCollapsed,
  makeSelectMenus,
  makeSearchword,
};
