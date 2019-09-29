import * as action from './constants';

export const saveWidgetInfo = categorie => ({
  type: action.SAVE_WIDGET_INFO,
  categorie,
});
export const getWidgetInfo = BIZGRP_ID => ({
  type: action.GET_WIDGET_INFO,
  BIZGRP_ID,
});

export const deleteConfig = payload => ({
  type: action.DELETE_CONFIG,
  payload,
});
