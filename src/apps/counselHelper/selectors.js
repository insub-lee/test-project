import { createSelector } from 'reselect';

const selectAppsWidgetState = state => state.get('apps-Widget');

const makeSelectDetail = () =>
  createSelector(
    selectAppsWidgetState,
    (widgetstate, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : 11052),
    (widgetstate, WIDGET_ID) => widgetstate.getIn(['detailMap', WIDGET_ID, 'detail']),
  );

export default { selectAppsWidgetState, makeSelectDetail };
