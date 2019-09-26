import { createSelector } from 'reselect';

const selectAppsWidgetState = state => state.get('counsel-config');

const makeSelectWidget = () =>
  createSelector(
    selectAppsWidgetState,
    widgetstate => widgetstate.get('categorie'),
  );

export default { selectAppsWidgetState, makeSelectWidget };
