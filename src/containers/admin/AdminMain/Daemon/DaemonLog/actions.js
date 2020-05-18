import * as actionTypes from './constants';

export const getDaemonLogList = (daemonId, sortColumn, sortDirection, startDttm, endDttm, runType, successYn) => ({
  type: actionTypes.GET_DAEMONLOG_LIST,
  payload: {
    daemonId,
    sortColumn,
    sortDirection,
    startDttm,
    endDttm,
    runType,
    successYn,
  },
});
