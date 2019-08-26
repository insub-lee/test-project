import { createSelector } from 'reselect';

const selectAppsWidgetState = state => state.get('test-Widget');

const makeSelectWidget = () =>
  createSelector(
    selectAppsWidgetState,
    widgetstate => widgetstate.get('categorie'),
  );

export default { selectAppsWidgetState, makeSelectWidget };
