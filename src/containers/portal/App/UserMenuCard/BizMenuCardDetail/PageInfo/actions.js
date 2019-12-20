import * as constants from './constants';

export const getWidgetList = params => ({
  type: constants.GET_WIDGET_LIST,
  params,
});

export const test = pageId => ({
  type: constants.TEST,
  pageId,
});
