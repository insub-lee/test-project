import { createSelector } from 'reselect';

const selectView = state => state.get('common');

const currentView = () => createSelector(
  selectView,
  viewState => viewState.get('view'),
);

const selectApp = state => state.get('app');

const makeSelectMenuShow = () => createSelector(
    selectApp,
    appState => appState.get('menuShow'),
);

export {
  selectView,
  currentView,
  makeSelectMenuShow,
};
