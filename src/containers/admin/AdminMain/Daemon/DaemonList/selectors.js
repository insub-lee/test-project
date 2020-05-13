import { createSelector } from 'reselect';

const selectDaemon = state => state.get('admin/adminmain/daemon/list');

const makeSelectDaemonList = () => createSelector(selectDaemon, daemon => daemon.get('daemonList'));

const makeIsLoading = () => createSelector(selectDaemon, daemon => daemon.get('isLoading'));

export { selectDaemon, makeSelectDaemonList, makeIsLoading };
