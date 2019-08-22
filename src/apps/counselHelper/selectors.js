import { createSelector } from 'reselect';

const selectAppsWidgetState = state => state.get('apps-Widget');

const makeSelectDetail = () =>
  createSelector(
    selectAppsWidgetState,
    widgetstate => widgetstate.get('detail'),
  );

const makeSearchWord = () =>
  createSelector(
    selectAppsWidgetState,
    widgetstate => widgetstate.get('searchWord'),
  );
export default { selectAppsWidgetState, makeSelectDetail, makeSearchWord };
