import { createSelector } from 'reselect';

const selectNotifyAdmin = state => state.get('NotifyAdmin');

const makeSelectNotifyList = () => createSelector(selectNotifyAdmin, notifyAdminState => notifyAdminState.get('notifyList').toJS());

const makeSelectSiteCombo = () => createSelector(selectNotifyAdmin, notifyAdminState => notifyAdminState.get('siteCombo').toJS());

export { selectNotifyAdmin, makeSelectNotifyList, makeSelectSiteCombo };
