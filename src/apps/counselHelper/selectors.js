import { createSelector } from 'reselect';

const selectAppsWidgetState = state => state.get('apps-Widget');

const makeSelectDetail = () =>
  createSelector(
    selectAppsWidgetState,
    widgetstate => widgetstate.get('detail'),
  );

export default { selectAppsWidgetState, makeSelectDetail };
