import { createSelector } from 'reselect';

const selectView = state => state.get('common');

const currentView = () =>
  createSelector(
    selectView,
    viewState => viewState.get('view'),
  );

const selectApp = state => state.get('app');

const makeSelectUserMenuOpen = () =>
  createSelector(
    selectApp,
    appState => (appState ? appState.get('open') : false),
  );

export { selectView, currentView, makeSelectUserMenuOpen };
