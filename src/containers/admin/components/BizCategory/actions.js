import { fromJS } from 'immutable';

import { INIT_CATEGORY_DATA, SET_CATEGORY_DATA } from './constants';

export const initCategoryData = () => ({
  type: INIT_CATEGORY_DATA,
});

export const updateTreeData = treeData => ({
  type: SET_CATEGORY_DATA,
  treeData: fromJS(treeData),
});
