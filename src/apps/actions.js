import * as constantTypes from './constants';

export const bootWidget = (widgetId, param) => ({
  type: constantTypes.BOOT_WIDGET,
  widgetId,
  param,
});
