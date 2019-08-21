import { createSelector } from 'reselect';

const selectAppsWidgetState = state => state.get('test-Widget');

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

export default { selectAppsWidgetState, makeSelectWidget, makeSelectDetail };
