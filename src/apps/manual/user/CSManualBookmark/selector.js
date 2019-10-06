import { createSelector } from 'reselect';

const CSManualWidgetData = state => state.get('CSManual-Bookmark-Widget');
const auth = state => state.get('auth');
const common = state => state.get('common');

const selectUserProfile = () =>
  createSelector(
    auth,
    state => state.get('profile'),
  );

const selectBookmarkList = () =>
  createSelector(
    CSManualWidgetData,
    state => state.getIn(['bookmarkWidget', 'bookmarkList']),
  );

// 위젯 페이지 이동에 필요한 MUAL_IDX
const selectViewMualIdx = () =>
  createSelector(
    CSManualWidgetData,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : 11437),
    (state, widgetId) => state.getIn(['bookmarkWidget', widgetId, 'viewMualIdx']),
  );

// 화면에 그려질 앱 갯수
const selectedApp = () =>
  createSelector(
    common,
    state => state.get('selectedApp'),
  );

export { selectUserProfile, selectBookmarkList, selectViewMualIdx, selectedApp };
