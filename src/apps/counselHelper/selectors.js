import { createSelector } from 'reselect';

const selectAppsWidgetState = state => state.get('apps-Widget');

const makeSelectWidget = () =>
  createSelector(
    selectAppsWidgetState,
    widgetstate => widgetstate.get('categorie'),
  );

const makeSelectDetail = () =>
  createSelector(
    selectAppsWidgetState,
    widgetstate => widgetstate.get('detail'),
  );
const makeSelectMenu = () =>
  createSelector(
    selectAppsWidgetState,
    widgetstate => widgetstate.get('menu'),
  );
const makeSelectwidgetSize = () =>
  createSelector(
    selectAppsWidgetState,
    widgetstate => widgetstate.get('widgetSize'),
  );
const makeSearchWord = () =>
  createSelector(
    selectAppsWidgetState,
    widgetstate => widgetstate.get('searchWord'),
  );
export default {
 selectAppsWidgetState, makeSelectWidget, makeSelectDetail, makeSelectMenu, makeSelectwidgetSize, makeSearchWord 
};
