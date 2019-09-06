import { closeModalInit } from 'components/OrganizationRole/actions';
import * as constantTypes from './constants';

export const setBizBuilderWidgetSettingBySaga = item => ({
  type: constantTypes.SET_BIZBUILDERLIST_SETTING_BYSAGA,
  item,
});

export const setBizBuilderConfigChangeValueByReducr = (widgetId, key, value) => ({
  type: constantTypes.SET_BIZBUILDERLIST_CONFIGCHANGEVALUE,
  widgetId,
  key,
  value,
});

export const getBizBuilderWidgetSettingBySaga = item => ({
  type: constantTypes.GET_BIZBUILDERLIST_SETTING_BYSAGA,
  item,
});

export const setBizBuilderWidgetSttingByReducr = (widgetId, item) => ({
  type: constantTypes.SET_BIZBUILDERLIST_SETTING_BYREDUCR,
  widgetId,
  item,
});

export const setBizBuillderWidgetSettingAsJSON = cols => ({
  type: constantTypes.SET_BIZBUILDERLIST_SETTING_BYREDUCR_ASJSON,
  cols,
});

// work list read
export const getWorkListBySaga = widgetId => ({
  type: constantTypes.GET_WORKLIST_BYSAGA,
  widgetId,
});

export const setWorkListByReducr = (widgetId, workList) => ({
  type: constantTypes.SET_WORKLIST_BYREDUCR,
  widgetId,
  workList,
});

export const getWorkMetaBySaga = (widgetId, workSeq) => ({
  type: constantTypes.GET_WORKMETA_BYSAGA,
  widgetId,
  workSeq,
});

export const setWorkMetaByReducr = (widgetId, metaInfo) => ({
  type: constantTypes.SET_WORKMETA_BYREDUCR,
  widgetId,
  metaInfo,
});
