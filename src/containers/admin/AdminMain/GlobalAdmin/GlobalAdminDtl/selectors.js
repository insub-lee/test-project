import { createSelector } from 'reselect';

const selectGlobalAdminDtl = state => state.get('GlobalAdminDtl');

const makeSelectGlobalMsg = () => createSelector(
  selectGlobalAdminDtl,
  globalAdminDtlState => globalAdminDtlState.get('globalMsg'),
);

export {
  selectGlobalAdminDtl,
  makeSelectGlobalMsg,
};
