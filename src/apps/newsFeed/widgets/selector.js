import { createSelector } from 'reselect';

const selectNewsFeedData = state => state.get('NewsFeed');

const selectWidgetDataList = () =>
  createSelector(
    selectNewsFeedData,
    state => state.get('widgetDataList'),
  );

// 세팅 - 위젯명
const selectWidgetTitle = () =>
  createSelector(
    selectNewsFeedData,
    state => state.get('title'),
  );

// 세팅 - 제목표시 여부(bool)
const selectUseTitle = () =>
  createSelector(
    selectNewsFeedData,
    state => state.get('isTitle'),
  );

// 세팅 - 위젯 사이즈(string)
const selectWidgetSize = () =>
  createSelector(
    selectNewsFeedData,
    state => state.get('widgetSize'),
  );

// 세팅 - 위젯 스킨(number)
const selectWidgetcolor = () =>
  createSelector(
    selectNewsFeedData,
    state => state.get('skin'),
  );

// 세팅 - 전체 카테고리 목록
const selectWidgetTotalCategory = () =>
  createSelector(
    selectNewsFeedData,
    state => state.get('totalCategory'),
  );

// 세팅 - 선택된 카테고리
const selectWidgetCategory = () =>
  createSelector(
    selectNewsFeedData,
    state => state.get('selectedCategory'),
  );

// 모달 - visible(bool)
const selectModalView = () =>
  createSelector(
    selectNewsFeedData,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : undefined ), 
    (state, widgetId) => state.getIn(['modalView', widgetId]),
  );

  // 모달 - IDX
const selectModalIdx = () =>
createSelector(
  selectNewsFeedData,
  state => state.get('modalIdx'),
);


export {
  selectNewsFeedData,
  selectWidgetDataList,
  selectUseTitle,
  selectWidgetSize,
  selectWidgetcolor,
  selectWidgetCategory,
  selectWidgetTotalCategory,
  selectModalView,
  selectModalIdx,
  selectWidgetTitle,
};
