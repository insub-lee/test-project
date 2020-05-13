import { createSelector } from 'reselect';

const selectDaemon = state => state.get('admin/adminmain/daemon/log');

const makeSelectDaemonLogList = () => createSelector(selectDaemon, daemon => daemon.get('daemonLogList'));

const makeIsLoading = () => createSelector(selectDaemon, daemon => daemon.get('isLoading'));

export { selectDaemon, makeSelectDaemonLogList, makeIsLoading };
