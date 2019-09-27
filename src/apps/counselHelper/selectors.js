import { createSelector } from 'reselect';

const selectAppsWidgetState = state => state.get('apps-counselHelper');

const makeSelectCardList = () =>
  createSelector(
    selectAppsWidgetState,
    (widgetstate, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : 11052),
    (widgetstate, WIDGET_ID) => widgetstate.getIn(['cardMap', WIDGET_ID, 'cardList']),
  );
const makeSelectKeyword = () =>
  createSelector(
    selectAppsWidgetState,
    (widgetstate, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : 11052),
    (widgetstate, WIDGET_ID) => widgetstate.getIn(['cardMap', WIDGET_ID, 'keyword']),
  );

export default { makeSelectCardList, makeSelectKeyword };
