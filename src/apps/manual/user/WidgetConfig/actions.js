import * as constantTypes from './constants';

export const getCategoryList = () => ({
  type: constantTypes.GET_CATEGORYLIST,
});

export const setCategoryListByReducr = categoryList => ({
  type: constantTypes.SET_CATEGORYLIST_REDUCR,
  categoryList,
});

export const setCategorySettingByReducr = (widgetId, categoryIdx) => ({
  type: constantTypes.SET_CATEGORYSETTING_INFO_REDUCR,
  widgetId,
  categoryIdx,
});

export const setManualWidgetSettingBySaga = item => ({
  type: constantTypes.SET_CATEGORYSETTING_INFO_SAGA,
  item,
});
