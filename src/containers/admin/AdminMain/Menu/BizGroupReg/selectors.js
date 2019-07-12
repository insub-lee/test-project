import { createSelector } from 'reselect';

const selectOrg = state => state.get('admin/AdminMain/Menu/BizGroupReg');

const makeData = () => createSelector(
  selectOrg,
  org => org.get('data').toJS(),
);

export {
  selectOrg,
  makeData,
};
