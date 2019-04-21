import * as constants from './constants';


export const getWidgetList = PAGE_ID => (
  {
    type: constants.GET_WIDGET_LIST,
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
