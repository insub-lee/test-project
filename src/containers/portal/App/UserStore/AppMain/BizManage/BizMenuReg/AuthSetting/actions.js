import * as constants from './constants';

export const initCategoryData = BIZGRP_ID => ({
  type: constants.INIT_CATEGORY_DATA,
  BIZGRP_ID,
});

export const insertAuth = dataList => ({
  type: constants.INSERT_AUTH,
  dataList,
});

export const deleteAuth = dataList => ({
  type: constants.DELETE_AUTH,
  dataList,
});
