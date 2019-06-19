import { createSelector } from 'reselect';

const selectUserReg = state => state.get('UserReg');

const makeEmpNoCheck = () => createSelector(
  selectUserReg,
  userReg => userReg.get('empCheck'),
);

const makeSelectComboData = () => createSelector(
  selectUserReg,
  userReg => userReg.get('comboData').toJS(),
);

const makeTreeData = () => createSelector(
  selectUserReg,
  userReg => userReg.get('treeData').toJS(),
);

const makeIsLoading = () => createSelector(
  selectUserReg,
  userReg => userReg.get('isLoading'),
);

export {
  selectUserReg,
  makeEmpNoCheck,
  makeSelectComboData,
  makeTreeData,
  makeIsLoading,
};
