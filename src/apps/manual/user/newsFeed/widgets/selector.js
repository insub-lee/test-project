import { createSelector } from 'reselect';

const selectNewsFeedData = state => state.get('NewsFeed');

// 게시물 데이터
const selectWidgetDataList = () =>
  createSelector(
    selectNewsFeedData,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : 11079),
    (state, widgetId) => state.getIn(['widgetDataList', widgetId]),
  );

// 세팅 - 전체 카테고리 목록
const selectWidgetTotalCategory = () => createSelector(selectNewsFeedData, state => state.get('totalCategory'));

// 세팅 - 선택된 카테고리
const selectWidgetCategory = () =>
  createSelector(
    selectNewsFeedData,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : 11079),
    (state, widgetId) => state.getIn(['selectedCategory', widgetId]),
  );

// 모달 - visible(bool)
const selectModalView = () =>
  createSelector(
    selectNewsFeedData,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : 11079),
    (state, widgetId) => state.getIn(['modalView', widgetId]),
  );

// 모달 - IDX
const selectModalIdx = () =>
  createSelector(
    selectNewsFeedData,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : 11079),
    (state, widgetId) => state.getIn(['modalIdx', widgetId]),
  );

export { selectNewsFeedData, selectWidgetDataList, selectWidgetCategory, selectWidgetTotalCategory, selectModalView, selectModalIdx };
