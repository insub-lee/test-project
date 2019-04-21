import { createSelector } from 'reselect';

const selectEqIdSearch = state => state.get('EqIdSearch');

export const makeTidnList = () => createSelector(
  selectEqIdSearch,
  params => params.get('tidnList'),
);

export {
  makeTidnList as default,
};
