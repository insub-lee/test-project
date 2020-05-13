import * as actionTypes from './constants';

export const getDaemonList = (sortColumn, sortDirection, keyword, stopYn) => ({
  type: actionTypes.GET_DAEMON_LIST,
  payload: {
    sortColumn,
    sortDirection,
    keyword,
    stopYn,
  },
});

export const startDaemon = (daemonId) => ({
  type: actionTypes.START_DAEMON,
  payload: {
    daemonId,
  },
});
