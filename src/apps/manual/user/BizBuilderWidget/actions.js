import * as constantTypes from './constants';

export const getBizBuilderListBySaga = (widgetId, data) => ({
  type: constantTypes.GET_BIZBUILDERLIST_BYSAGA,
  widgetId,
  data,
});

export const setBizBuilderListByReducr = (widgetId, bizBuilderList) => ({
  type: constantTypes.SET_BIZBUILDERLIST_BYREDUCR,
  widgetId,
  bizBuilderList,
});

export const getBizBuilderListSettingBySaga = (widgetId, typeObj) => ({
  type: constantTypes.GET_BIZBULDERLISTWIDGET_SETTINGINFO_BYSAGA,
  widgetId,
  typeObj,
});

export const setBizBuilderListSettingByReducr = (widgetId, configInfo) => ({
  type: constantTypes.SET_BIZBULDERLISTWIDGET_SETTINGINFO_BYREDUCR,
  widgetId,
  configInfo,
});

export const getBizBuilderContentViewBySaga = (widgetId, workSeq, taskSeq) => ({
  type: constantTypes.GET_BIZBUILDERVIEW_BYSAGA,
  widgetId,
  workSeq,
  taskSeq,
});

export const setBizBuilderContentViewByReducr = (widgetId, viewInfo) => ({
  type: constantTypes.SET_BIZBUILDERVIEW_BYREDUCR,
  widgetId,
  viewInfo,
});
