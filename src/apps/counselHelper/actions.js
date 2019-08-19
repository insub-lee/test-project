import * as action from './constants';

export const saveWidgetInfo = title => ({
  type: action.SAVE_WIDGET_INFO,
  title,
});

export const getWidgetInfo = title => ({
  type: action.GET_WIDGET_INFO,
  title,
});

export const saveDetail = detail => ({
  type: action.SAVE_DETAIL,
  detail,
});

export const getDetail = detail => ({
  type: action.GET_DETAIL,
  detail,
});
export const saveMenuInfo = menu => ({
  type: action.SAVE_MENU_INFO,
  menu,
});

export const getSearch = detail => ({
  type: action.GET_SEARCH,
  detail,
});

export const removeDetail = () => ({
  type: action.REMOVE_DETAIL,
});
export const saveWidgetSize = widgetSize => ({
  type: action.SAVE_WIDGETSIZE,
  widgetSize,
});
export const saveSearchWord = text => ({
  type: action.SAVE_SEARCH_WORD,
  text,
});
