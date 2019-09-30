import * as constants from './constants';

// USER의 북마크 데이터 가져오기
export const getBookmarkBySaga = widgetId => ({
  type: constants.GET_BOOKMARK_DATA,
  widgetId,
});

// USER의 북마크 데이터 리덕스 저장
export const setBookmarkByReducer = (widgetId, bookmarkList) => ({
  type: constants.SET_BOOKMARK_DATA,
  widgetId,
  bookmarkList,
});

// USER의 WIDGET 설정을 DB 저장
export const updateBookmarkBySaga = (item, selectedMual, settingType) => ({
  type: constants.UPT_BOOKMARK_DATA,
  settingType,
  item,
  selectedMual,
});

// WIDGET INIT 데이터 설정
export const setWidgetInitDataByReducer = item => ({
  type: constants.SET_WIDGET_INIT_DATA,
  item,
});

// WIDGET 내부 페이지 이동
export const setWidgetMualIdxByReducer = (widgetId, selectedMual) => ({
  type: constants.SET_WIDGET_MUALIDX,
  widgetId,
  selectedMual,
});
