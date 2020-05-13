import { createSelector } from 'reselect';

const selectDaemon = state => state.get('admin/adminmain/daemon/detail');

const makeIsLoading = () => createSelector(selectDaemon, daemon => daemon.get('isLoading'));

const makeSelectDaemon = () => createSelector(selectDaemon, daemon => daemon.get('daemonInfo'));

export { selectDaemon, makeIsLoading, makeSelectDaemon };
