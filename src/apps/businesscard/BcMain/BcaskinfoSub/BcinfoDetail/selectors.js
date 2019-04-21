import { createSelector } from 'reselect';

const selectSiteInfo = state => state.get('SiteInfo');

const makeSelectSiteInfo = () => createSelector(
  selectSiteInfo,
  selectSiteState => selectSiteState.get('siteList'),
);

export {
  selectSiteInfo,
  makeSelectSiteInfo,
};
