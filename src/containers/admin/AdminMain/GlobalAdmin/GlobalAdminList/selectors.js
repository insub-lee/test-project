import { createSelector } from 'reselect';

const selectGlobalAdmin = state => state.get('GlobalAdmin');

const makeSelectGlobalMsgList = () => createSelector(
  selectGlobalAdmin,
  globalAdminState => globalAdminState.get('globalMsgList').toJS(),
);

const makeDeleteGlobalMsg = () => createSelector(
  selectGlobalAdmin,
  delGlobalAdminState => delGlobalAdminState.get('delGlobalMsgList').toJS(),
);

export {
  selectGlobalAdmin,
  makeSelectGlobalMsgList,
  makeDeleteGlobalMsg,
};
