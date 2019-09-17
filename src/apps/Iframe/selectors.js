import { createSelector } from 'reselect';

const selectAppsWidgetState = state => state.get('iframe-Widget');

const SelectUrl = () =>
  createSelector(
    selectAppsWidgetState,
    (widgetstate, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : 11052),
    (widgetstate, WIDGET_ID) => widgetstate.getIn(['urlMap', WIDGET_ID, 'url']),
  );

export default { selectAppsWidgetState, SelectUrl };
