import { createSelector } from 'reselect';

const selectOrg = state => state.get('bizGroupReg');

const makeData = () => createSelector(
  selectOrg,
  org => org.get('data').toJS(),
);

export {
  selectOrg,
  makeData,
};
