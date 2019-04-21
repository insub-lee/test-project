import * as constants from './constants';

export const getCategoryComboList = () => (
  {
    type: constants.GET_CATEGORY_COMBO_LIST,
  }
);

export const initCategoryData = SITE_ID => ({
  type: constants.INIT_CATEGORY_DATA,
  payload: { SITE_ID },
});

export const updateMenuDisp = () => ({
  type: constants.UPDATE_MENU_DISP,
});

export const cateinsert = (SITE_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN) => ({
  type: constants.INSERT_CATE,
  payload: {
    SITE_ID,
    PRNT_ID,
    NAME_KOR,
    NAME_ENG,
    NAME_CHN,
  },
});

export const cateUpdate = (
  SITE_ID,
  CATG_ID,
  NAME_KOR,
  NAME_ENG,
  NAME_CHN,
  DSCR_KOR,
  DSCR_ENG,
  DSCR_CHN,
) => ({
  type: constants.UPDATE_CATE,
  payload: {
    SITE_ID,
    CATG_ID,
    NAME_KOR,
    NAME_ENG,
    NAME_CHN,
    DSCR_KOR,
    DSCR_ENG,
    DSCR_CHN,
  },
});

export const cateDelete = (SITE_ID, CATG_ID, SORT_SQ) => ({
  type: constants.DELETE_CATE,
  payload: {
    SITE_ID,
    CATG_ID,
    SORT_SQ,
  },
});

export const moveMymenu = (SITE_ID, treeData) => ({
  type: constants.MOVE_MYMENU,
  SITE_ID,
  treeData,
});
