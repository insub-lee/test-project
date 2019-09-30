import { createSelector } from 'reselect';

const CSManualWidgetData = state => state.get('CSManual-Bookmark-Widget');
const auth = state => state.get('auth');

const selectUserProfile = () =>
  createSelector(
    auth,
    state => state.get('profile'),
  );

const selectBookmarkList = () =>
  createSelector(
    CSManualWidgetData,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : 11437),
    (state, widgetId) => state.getIn(['bookmarkWidget', widgetId, 'bookmarkList']),
  );

// 위젯 페이지 이동에 필요한 MUAL_IDX
const selectViewMualIdx = () =>
  createSelector(
    CSManualWidgetData,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : 11437),
    (state, widgetId) => state.getIn(['bookmarkWidget', widgetId, 'viewMualIdx']),
  );

export { selectUserProfile, selectBookmarkList, selectViewMualIdx };
