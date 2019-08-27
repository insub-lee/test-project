import { createSelector } from 'reselect';

const selectView = state => state.get('common');

const currentView = () => createSelector(
  selectView,
  viewState => viewState.get('view'),
);

const selectApp = state => state.get('app');

const makeSelectUserMenuOpen = () => createSelector(
    selectApp,
    appState => appState.get('open'),
);

export {
  selectView,
  currentView,
  makeSelectUserMenuOpen,
};
