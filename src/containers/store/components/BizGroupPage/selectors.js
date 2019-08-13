import { createSelector } from 'reselect';

const selectView = state => state.get('common');

const currentView = () => createSelector(
  selectView,
  viewState => viewState.get('view'),
);

export {
  selectView,
  currentView,
};
