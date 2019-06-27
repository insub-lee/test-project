import * as constants from './constants';

export const getBizInfo = BIZGRP_ID => ({
  type: constants.GET_BIZ_INFO,
  BIZGRP_ID,
});

export const getBizFeedBackList = (BIZGRP_ID, BOARD_TYPE) => ({
  type: constants.GET_BIZ_FEEDBACKLIST,
  BIZGRP_ID,
  BOARD_TYPE,
});
