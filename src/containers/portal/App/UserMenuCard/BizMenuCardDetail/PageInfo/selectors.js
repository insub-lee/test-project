import { createSelector } from 'reselect';

const selectOrg = state => state.get('portal_bizMenuCard_PageInfo');

const makeWidgetList = () => createSelector(selectOrg, org => org.get('widgetList').toJS());

const makePageInfoData = () => createSelector(selectOrg, org => org.get('pageInfoData'));

export { selectOrg, makeWidgetList, makePageInfoData };
