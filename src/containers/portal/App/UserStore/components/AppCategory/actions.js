import { fromJS } from 'immutable';

import { INIT_CATEGORY_DATA, SET_CATEGORY_DATA } from './constants';

export const initCategoryData = () => ({
  type: INIT_CATEGORY_DATA,
});

export const updateTreeData = categoryData => ({
  type: SET_CATEGORY_DATA,
  categoryData: fromJS(categoryData),
});
