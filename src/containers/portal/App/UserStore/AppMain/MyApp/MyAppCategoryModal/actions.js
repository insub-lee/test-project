import * as constants from './constants';

export const initCategoryData = () => ({
  type: constants.INIT_CATEGORY_DATA,
});

export const updateMenuDisp = () => ({
  type: constants.UPDATE_MENU_DISP,
});

export const cateinsert = (PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN) => ({
  type: constants.INSERT_CATE,
  payload: {
    PRNT_ID,
    NAME_KOR,
    NAME_ENG,
    NAME_CHN,
  },
});

export const cateUpdate = (PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN) => ({
  type: constants.UPDATE_CATE,
  payload: {
    PRNT_ID,
    NAME_KOR,
    NAME_ENG,
    NAME_CHN,
  },
});

export const cateDelete = (PRNT_ID, SORT_SQ) => ({
  type: constants.DELETE_CATE,
  payload: {
    PRNT_ID,
    SORT_SQ,
  },
});

export const moveMymenu = treeData => ({
  type: constants.MOVE_MYMENU,
  treeData,
});
