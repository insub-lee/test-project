import { createSelector } from 'reselect';

const selectOrg = state => state.get('bizPage');

const makeWidgetList = () => createSelector(selectOrg, org => org.get('widgetList').toJS());

export { selectOrg, makeWidgetList };
