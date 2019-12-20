import * as constants from './constants';

export const getWidgetList = PAGE_ID => ({
  type: constants.GET_WIDGET_LIST,
  PAGE_ID,
});

export const test = pageId => ({
  type: constants.TEST,
  pageId,
});
