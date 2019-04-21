import * as constants from './constants';

export const initWidgetSetting = (BIZGRP_ID, PAGE_ID, WIDGET_ID) => (
  {
    type: constants.INIT_WIDGET_SETTING,
    BIZGRP_ID,
    PAGE_ID,
    WIDGET_ID,
  }
);

export const getWidgetList = (BIZGRP_ID, PAGE_ID) => (
  {
    type: constants.GET_WIDGET_LIST,
    BIZGRP_ID,
    PAGE_ID,
  }
);

export const getWidget = WIDGET_ID => (
  {
    type: constants.GET_WIDGET,
    WIDGET_ID,
  }
);

export const updateWidget = (WIDGET_ID, data) => (
  {
    type: constants.UPDATE_WIDGET,
    WIDGET_ID,
    data,
  }
);

export const updateBizGroupChgYn = () => (
  {
    type: constants.UPDATE_BIZGROUP_CHGYN,
  }
);
