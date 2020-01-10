import { createSelector } from 'reselect';

const selectNotifyAdminReg = state => state.get('NotifyAdminReg');

const makeSelectRegNotify = () => createSelector(selectNotifyAdminReg, NotifyAdminDtlState => NotifyAdminDtlState.get('msgId'));

const makeSelectSiteCombo = () => createSelector(selectNotifyAdminReg, notifyAdminState => notifyAdminState.get('siteCombo').toJS());

export { selectNotifyAdminReg, makeSelectRegNotify, makeSelectSiteCombo };
