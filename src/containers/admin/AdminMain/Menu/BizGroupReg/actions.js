import * as constants from './constants';

export const updateBizGroup = (data, history) => ({
  type: constants.UPDATE_BIZGROUP,
  data,
  history,
});

export const getBizGroupInfo = BIZGRP_ID => ({
  type: constants.GET_BIZGROUP_INFO,
  BIZGRP_ID,
});
