/* eslint-disable import/no-unresolved */
import { createSelector } from 'reselect';

const selectApps = state => state.get('appsetting');

const makeWidgetList = () => createSelector(selectApps, appState => appState.get('widgetList').toJS());

const makeWidget = () => createSelector(selectApps, appState => appState.get('widget').toJS());

const selectCommon = state => state.get('common');

const makeMenuFixedYn = () => createSelector(selectCommon, viewState => viewState.get('menuFixedYn'));

export { makeWidgetList, makeWidget, makeMenuFixedYn };
