import { createSelector } from 'reselect';

const selectApp = state => state.get('dock').toJS();
const selectView = state => state.get('hynix.common').toJS();

const makeSelectUrl = () => createSelector(
  selectApp,
  urlState => urlState.url,
);

const makeSelectView = () => createSelector(
  selectView,
  viewState => viewState.view,
);

export {
  makeSelectUrl,
  makeSelectView,
};
