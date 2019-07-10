import * as constants from './constants';

export const getBizInfo = (BIZGRP_ID, PAGE_ID) => (
  {
    type: constants.GET_BIZ_INFO,
    BIZGRP_ID,
    PAGE_ID,
  }
);

export const getWidgetList = (BIZGRP_ID, PAGE_ID) => ({
  type: constants.GET_WIDGET_LIST,
  BIZGRP_ID,
  PAGE_ID,
});

export const deleteWidget = WIDGET_ID => ({
  type: constants.DELETE_WIDGET,
  WIDGET_ID,
});

export const addWidgets = (PAGE_ID, APP_IDS) => ({
  type: constants.ADD_WIDGETS,
  PAGE_ID,
  APP_IDS,
});

export const moveMyWidget = (PAGE_ID, layout) => ({
  type: constants.MOVE_MYWIDGET,
  PAGE_ID,
  layout,
});

export const updateWidget = (WIDGET_ID, data) => (
  {
    type: constants.UPDATE_WIDGET,
    WIDGET_ID,
    data,
  }
);
