import { LOAD_APPLIST_SAGA, DELETE_APPLIST_SAGA, LOAD_APP_TREE, LOAD_CATEGORY_LIST_SAGA, RESET_CHECKBOX, SEARCH_CATEGORY_LSIT_SAGA, RESET_CATEGORY } from './constants';

export const onLoadAppList = id => (
  {
    type: LOAD_APPLIST_SAGA,
    id,
  }
);

export const deleteAppList = list => (
  {
    type: DELETE_APPLIST_SAGA,
    list,
  }
);

export const loadTree = siteId => (
  {
    type: LOAD_APP_TREE,
    siteId,
  }
);

export const loadCategoryList = (node, type, siteId, num) => (
  {
    type: LOAD_CATEGORY_LIST_SAGA,
    payload: {
      node,
      type,
      siteId,
      num,
    },
  }
);

export const resetCheckbox = check => (
  {
    type: RESET_CHECKBOX,
    check,
  }
);

export const searchCategory = (keyword, type, siteId, num) => (
  {
    type: SEARCH_CATEGORY_LSIT_SAGA,
    payload: {
    keyword,
    type,
    siteId,
    num,
    },
  }
);

export const resetCategory = () => (
  {
    type: RESET_CATEGORY,
  }
);
