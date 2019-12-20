import * as constants from './constants';

export const getBizInfo = BIZGRP_ID => ({
  type: constants.GET_BIZ_INFO,
  BIZGRP_ID,
});

export const registBiz = BIZGRP_ID => ({
  type: constants.REGIST_BIZ,
  BIZGRP_ID,
});
