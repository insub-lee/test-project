import { createSelector } from 'reselect';

const selectSiteInfo = state => state.get('SiteInfo');
const selectBcEditUp = state => state.get('BcEditUp');

const makeSelectSiteInfo = () => createSelector(
  selectSiteInfo,
  selectSiteState => selectSiteState.get('siteList'),
);

const makeSelectGlobalMsg = () => createSelector(
  selectBcEditUp,
  globalAdminDtlState => globalAdminDtlState.get('BcUdt'),
);

export {
  selectSiteInfo,
  makeSelectSiteInfo,
  selectBcEditUp,
  makeSelectGlobalMsg,
};
