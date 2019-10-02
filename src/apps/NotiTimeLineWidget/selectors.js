import { createSelector } from 'reselect';

const selectNotiTiemLine = state => state.get('apps.NotiTimeLineWidget');

const makeSelectNotifyList = () =>
  createSelector(
    selectNotiTiemLine,
    state => state.get('notifyList').toJS(),
  );

export { makeSelectNotifyList };
