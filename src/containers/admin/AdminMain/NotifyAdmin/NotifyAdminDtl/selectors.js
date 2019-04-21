import { createSelector } from 'reselect';

const selectNotifyAdminDtl = state => state.get('NotifyAdminDtl');

const makeSelectNotifyMsg = () => createSelector(
  selectNotifyAdminDtl,
  NotifyAdminDtlState => NotifyAdminDtlState.get('notifyMsg'),
);

const makeSelectNotifyReceiver = () => createSelector(
  selectNotifyAdminDtl,
  NotifyAdminDtlState => NotifyAdminDtlState.get('notifyReceiver'),
);

export {
  selectNotifyAdminDtl,
  makeSelectNotifyMsg,
  makeSelectNotifyReceiver,
};
