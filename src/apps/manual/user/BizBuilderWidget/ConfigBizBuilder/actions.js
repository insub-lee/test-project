import { closeModalInit } from 'components/OrganizationRole/actions';
import * as constantTypes from './constants';

export const setBizBuilderWidgetSettingBySaga = item => ({
  type: constantTypes.SET_BIZBUILDERLIST_SETTING_BYSAGA,
  item,
});

export const setBizBuilderConfigChangeValueByReducr = (key, value) => ({
  type: constantTypes.SET_BIZBUILDERLIST_CONFIGCHANGEVALUE,
  key,
  value,
});

export const getBizBuilderWidgetSettingBySaga = item => ({
  type: constantTypes.GET_BIZBUILDERLIST_SETTING_BYSAGA,
  item,
});

export const setBizBuilderWidgetSttingByReducr = item => ({
  type: constantTypes.SET_BIZBUILDERLIST_SETTING_BYREDUCR,
  item,
});

export const setBizBuillderWidgetSettingAsJSON = cols => ({
  type: constantTypes.SET_BIZBUILDERLIST_SETTING_BYREDUCR_ASJSON,
  cols,
});
