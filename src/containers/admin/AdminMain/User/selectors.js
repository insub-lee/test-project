import { createSelector } from 'reselect';

const selectUserReg = state => state.get('UserReg');

const makeEmpNoCheck = () => createSelector(
  selectUserReg,
  selectUserRegState => selectUserRegState.get('empCheck'),
);

export {
  selectUserReg,
  makeEmpNoCheck,
};
