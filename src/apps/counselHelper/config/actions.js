import * as action from './constants';

export const saveWidgetInfo = categorie => ({
  type: action.SAVE_WIDGET_INFO,
  categorie,
});

export const getWidgetInfo = categorie => ({
  type: action.GET_WIDGET_INFO,
  categorie,
});

export const saveDetail = detail => ({
  type: action.SAVE_DETAIL,
  detail,
});

export const getDetail = detail => ({
  type: action.GET_DETAIL,
  detail,
});
