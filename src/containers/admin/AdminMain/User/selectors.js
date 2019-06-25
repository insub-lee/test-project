import { createSelector } from 'reselect';

const selectUserReg = state => state.get('UserReg');

const makeEmpNoCheck = () => createSelector(
  selectUserReg,
  userReg => userReg.get('empNoCheck'),
);

const makeEmpNoFlag = () => createSelector(
  selectUserReg,
  userReg => userReg.get('empNoFlag'),
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

const makeUserInfo = () => createSelector(
  selectUserReg,
  userReg => userReg.get('userInfo'),
);

export {
  selectUserReg,
  makeEmpNoCheck,
  makeEmpNoFlag,
  makeSelectComboData,
  makeTreeData,
  makeIsLoading,
  makeUserInfo,
};
