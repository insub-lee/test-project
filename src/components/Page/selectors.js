import { createSelector } from 'reselect';

const selectView = state => state.get('common');

const currentView = () =>
  createSelector(
    selectView,
    viewState => viewState.get('view'),
  );

const makeSelectMenuFixedYn = () =>
createSelector(
  selectView,
  viewState => viewState.get('menuFixedYn'),
);  

export { selectView, currentView, makeSelectMenuFixedYn };
