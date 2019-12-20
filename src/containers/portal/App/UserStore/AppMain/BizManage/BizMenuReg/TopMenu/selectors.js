import { createSelector } from 'reselect';

const selectOrg = state => state.get('bizmemuTopMenu');

const makgeBizInfo = () => createSelector(selectOrg, org => org.get('bizInfo'));

const makeSelectApps = () => createSelector(selectOrg, org => org.get('selectedApp'));

const makgeSelectedApp = () => createSelector(selectOrg, org => org.get('selectedApp'));

const makeSelectMyMenuData = () => createSelector(selectOrg, org => org.get('setMyMenuData'));

export { selectOrg, makgeBizInfo, makeSelectApps, makgeSelectedApp, makeSelectMyMenuData };
