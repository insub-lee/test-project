import * as constants from './constants';

export const getDaemonInfo = daemonId => ({
  type: constants.GET_DAEMON_INFO,
  daemonId,
});

export const updateDaemonInfo = (daemonInfo, listParam, history, onSaveSuccess) => ({
  type: constants.UPDATE_DAEMON_INFO,
  daemonInfo,
  listParam,
  history,
  onSaveSuccess,
});

export const insertDaemonInfo = (daemonInfo, listParam, history, onSaveSuccess) => ({
  type: constants.INSERT_DAEMON_INFO,
  daemonInfo,
  listParam,
  history,
  onSaveSuccess,
});

export const deleteDaemon = (daemonId, history, listParam) => ({
  type: constants.DELETE_DAEMON,
  daemonId,
  history,
  listParam,
});