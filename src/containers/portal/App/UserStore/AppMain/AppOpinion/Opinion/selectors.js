import { createSelector } from 'reselect';

const selectOpi = state => state.get('opinionList');

const makeOpinionList = () => createSelector(
  selectOpi,
  opi => opi.get('opinionList'),
);

const makeOppoList = () => createSelector(
  selectOpi,
  opi => opi.get('oppoList'),
);

const makeComboList = () => createSelector(
  selectOpi,
  opi => opi.get('comboList'),
);

export {
  selectOpi,
  makeOpinionList,
  makeOppoList,
  makeComboList,
};
