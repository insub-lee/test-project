import * as constantTypes from './constants';

export const getBizBuilderListBySaga = data => ({
  type: constantTypes.GET_BIZBUILDERLIST_BYSAGA,
  data,
});

export const setBizBuilderListByReducr = bizBuilderList => ({
  type: constantTypes.SET_BIZBUILDERLIST_BYREDUCR,
  bizBuilderList,
});

export const getBizBuilderListSettingBySaga = (widgetId, typeObj) => ({
  type: constantTypes.GET_BIZBULDERLISTWIDGET_SETTINGINFO_BYSAGA,
  widgetId,
  typeObj,
});

export const setBizBuilderListSettingByReducr = configInfo => ({
  type: constantTypes.SET_BIZBULDERLISTWIDGET_SETTINGINFO_BYREDUCR,
  configInfo,
});
