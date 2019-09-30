import { createSelector } from 'reselect';

const selectView = state => state.get('common');

const currentView = () =>
  createSelector(
    selectView,
    viewState => viewState.get('view'),
  );

const selectApp = state => state.get('app');

const makeSelectMenuFixedYn = () =>
createSelector(
  selectApp,
  portalState => portalState.menuFixedYn,
);  

export { selectView, currentView, makeSelectMenuFixedYn };
