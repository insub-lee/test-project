import { LOAD_APPLIST_SAGA, DELETE_APPLIST_SAGA, LOAD_APP_TREE, LOAD_CATEGORY_LIST_SAGA, RESET_CHECKBOX, SEARCH_CATEGORY_LSIT_SAGA, RESET_CATEGORY, EXEC_APPS_SAGA } from './constants';

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

export const loadTree = () => (
  {
    type: LOAD_APP_TREE,
  }
);

export const loadCategoryList = (node, type) => (
  {
    type: LOAD_CATEGORY_LIST_SAGA,
    payload: {
      node,
      type,
    },
  }
);

export const resetCheckbox = check => (
  {
    type: RESET_CHECKBOX,
    check,
  }
);

export const searchCategory = keyword => (
  {
    type: SEARCH_CATEGORY_LSIT_SAGA,
    keyword,
  }
);

export const resetCategory = () => (
  {
    type: RESET_CATEGORY,
  }
);

export const execApps = node => (
  {
    type: EXEC_APPS_SAGA,
    node,
  }
);