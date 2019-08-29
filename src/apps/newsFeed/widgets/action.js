import * as constants from './constants';

// 위젯 Config
export const setWidgetConfig = (app_id,  widget_id, selectedCategory) => ({
  type: constants.SET_NEWSFEED_CONFIG,
  app_id,  
  widget_id,
  selectedCategory,
});

// 게시물 가져오는거
export const getNewsfeedDataList = (widget_id, selectedCategory) => ({
  type: constants.GET_NEWSFEED_DATA_LIST,
  widget_id,
  selectedCategory,
});

export const setNewsfeedDataList = ({ newDataList }) => ({
  type: constants.SET_NEWSFEED_DATA_LIST,
  newDataList,
});

// 카테고리 목록
export const getInitCategoryList = () => ({
  type: constants.GET_INIT_CATEGORY,
});

export const setCategoryList = list => ({
  type: constants.SET_INIT_CATEGORY,
  list,
});

// 카테고리 선택
export const selectCategoryList = (selectedCategoryList, item) => ({
  type: constants.CHANGE_SELECTED_CATEGORY,
  selectedCategoryList,
  item,
});

export const setSelectedCategoryList = selectedCategoryList => ({
  type: constants.SET_SELECTED_CATEGORY,
  selectedCategoryList,
});

export const saveSelectedCategory = () => ({
  type: constants.SAVE_SELECTED_CATEGORY,
});

// 모달
export const setModalIdx = (modalIdx) => ({
  type: constants.SET_MODAL_IDX,
  modalIdx,
});

export const setModalView = (modalView, widget_id) => ({
  type: constants.SET_MODAL_VIEW,
  modalView,
  widget_id,
});
