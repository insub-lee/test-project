import * as action from './constants';

export const saveWidgetInfo = categorie => ({
  type: action.SAVE_WIDGET_INFO,
  categorie,
});
export const getWidgetInfo = categorie => ({
  type: action.GET_WIDGET_INFO,
  categorie,
});
