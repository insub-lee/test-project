import { createSelector } from 'reselect';

const selectSiteList = state => state.get('SiteList');

const makeSelectSiteList = () => createSelector(selectSiteList, selectSiteState => selectSiteState.get('siteList').toJS());

const makeDelRow = () => createSelector(selectSiteList, delRowState => delRowState.get('delList').toJS());

export { selectSiteList, makeSelectSiteList, makeDelRow };
