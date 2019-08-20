import { createSelector } from 'reselect';

const selectNewsFeedData = state => state.get('NewsFeed');

// 게시물 - 전체(array)
const selectTotalList = () =>
  createSelector(
    selectNewsFeedData,
    NewsFeedState => NewsFeedState.get('totalList'),
  );

// 게시물 - 변경(array)
const selectUpdateList = () =>
  createSelector(
    selectNewsFeedData,
    NewsFeedState => NewsFeedState.get('updateList'),
  );

// 게시물 - 신규(array)
const selectNewList = () =>
  createSelector(
    selectNewsFeedData,
    NewsFeedState => NewsFeedState.get('newList'),
  );

// 세팅 - 위젯명
const selectWidgetTitle = () =>
  createSelector(
    selectNewsFeedData,
    NewsFeedState => NewsFeedState.get('title'),
  );

// 세팅 - 제목표시 여부(bool)
const selectUseTitle = () =>
  createSelector(
    selectNewsFeedData,
    NewsFeedState => NewsFeedState.get('isTitle'),
  );

// 세팅 - 위젯 사이즈(string)
const selectWidgetSize = () =>
  createSelector(
    selectNewsFeedData,
    NewsFeedState => NewsFeedState.get('widgetSize'),
  );

// 세팅 - 위젯 스킨(number)
const selectWidgetcolor = () =>
  createSelector(
    selectNewsFeedData,
    NewsFeedState => NewsFeedState.get('skin'),
  );

// 세팅 - 전체 카테고리 목록
const selectWidgetTotalCategory = () =>
  createSelector(
    selectNewsFeedData,
    NewsFeedState => NewsFeedState.get('totalCategory'),
  );

// 세팅 - 선택된 카테고리
const selectWidgetCategory = () =>
  createSelector(
    selectNewsFeedData,
    NewsFeedState => NewsFeedState.get('selectedCategory'),
  );

// 모달 - visible(bool)
const selectModalView = () =>
  createSelector(
    selectNewsFeedData,
    NewsFeedState => NewsFeedState.get('modalView'),
  );

export {
  selectNewsFeedData,
  selectTotalList,
  selectUpdateList,
  selectNewList,
  selectUseTitle,
  selectWidgetSize,
  selectWidgetcolor,
  selectWidgetCategory,
  selectWidgetTotalCategory,
  selectModalView,
  selectWidgetTitle,
};
