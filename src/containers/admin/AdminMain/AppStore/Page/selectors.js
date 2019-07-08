import { createSelector } from 'reselect';

const selectView = state => state.get('hynix.common');

const currentView = () => createSelector(
  selectView,
  viewState => viewState.get('view'),
);

export {
  selectView,
  currentView,
};
