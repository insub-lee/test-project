import { createSelector } from 'reselect';

const selectApps = state => state.get('weatherSetting');

const makeGetWeatherList = () => createSelector(
  selectApps,
  messageState => messageState.get('itemWeatherList'),
);

const makeGetWidgetId = () => createSelector(
  selectApps,
  messageState => messageState.get('widgetId'),
);

const makeGetPageId = () => createSelector(
  selectApps,
  messageState => messageState.get('pageId'),
);

export {
  selectApps,
  makeGetWeatherList,
  makeGetWidgetId,
  makeGetPageId,
};