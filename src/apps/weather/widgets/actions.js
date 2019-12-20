import * as actionType from './constants';

export const deleteWeather = (item, widgetId, pageId) => ({
  type: actionType.DELETE_WEATHER_SAGA,
  item,
  widgetId,
  pageId,
});

export const deleteBizWeather = (item, widgetId, pageId) => ({
  type: actionType.DELETE_BIZWHEATHER_SAGA,
  item,
  widgetId,
  pageId,
});
