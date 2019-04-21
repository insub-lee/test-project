import { LOAD_BAPPLIST_SAGA, DELETE_APPLIST_SAGA, LOAD_APP_TREE, LOAD_CATEGORY_LIST_SAGA, RESET_CHECKBOX, SEARCH_CATEGORY_LSIT_SAGA, RESET_CATEGORY, DELETE_APPLIST_BIZ_SAGA, LOAD_BIZAPPLIST_SAGA } from './constants';

export const onLoadBAppList = id => (
  {
    type: LOAD_BAPPLIST_SAGA,
    id,
  }
);

export const onLoadBizAppList = id => (
  {
    type: LOAD_BIZAPPLIST_SAGA,
    id,
  }
);

export const deleteAppList = (list, widgetID, pageID) => (
  {
    type: DELETE_APPLIST_SAGA,
    payload: {
      list,
      widgetID,
      pageID,
    },
  }
);

export const deleteAppBizList = (list, widgetID, pageID) => (
  {
    type: DELETE_APPLIST_BIZ_SAGA,
    payload: {
      list,
      widgetID,
      pageID,
    },
  }
);

export const loadTree = () => (
  {
    type: LOAD_APP_TREE,
  }
);

export const loadCategoryList = (node, type, num) => (
  {
    type: LOAD_CATEGORY_LIST_SAGA,
    payload: {
      node,
      type,
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

export const searchCategory = (type, num, keyword) => (
  {
    type: SEARCH_CATEGORY_LSIT_SAGA,
    payload: {
      type,
      num,
      keyword,
    },
  }
);

export const resetCategory = () => (
  {
    type: RESET_CATEGORY,
  }
);
