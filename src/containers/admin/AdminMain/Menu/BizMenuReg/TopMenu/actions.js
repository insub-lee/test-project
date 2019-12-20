import * as constants from './constants';

export const getBizInfo = BIZGRP_ID => ({
  type: constants.GET_BIZ_INFO,
  BIZGRP_ID,
});

export const confirmBizGroup = (history, BIZGRP_ID) => ({
  type: constants.CONFIRM_BIZGROUP,
  history,
  BIZGRP_ID,
});

export const execApps = node => ({
  type: constants.EXEC_APPS_SAGA,
  node,
});
