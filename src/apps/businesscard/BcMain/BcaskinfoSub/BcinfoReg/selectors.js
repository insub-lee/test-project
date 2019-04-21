import { createSelector } from 'reselect';

const selectGlobalAdminDtl = state => state.get('GlobalAdminDtl');
const selectSiteInfo = state => state.get('SiteInfo');

const makeSelectGlobalMsg = () => createSelector(
  selectGlobalAdminDtl,
  globalAdminDtlState => globalAdminDtlState.get('globalMsg'),
);

const makeSelectSiteInfo = () => createSelector(
  selectSiteInfo,
  selectSiteState => selectSiteState.get('siteList'),
);


export {
  selectGlobalAdminDtl,
  makeSelectGlobalMsg,
  selectSiteInfo,
  makeSelectSiteInfo,
};
