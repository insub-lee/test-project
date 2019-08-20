import * as constants from './constants';

// 게시물 가져오는거
export const getNewsfeedDataList = (widgetSize, selectedCategory) => ({
  type: constants.GET_NEWSFEED_DATA_LIST,
  widgetSize,
  selectedCategory,
});

export const setNewsfeedDataList = ({ newList, totalList, updateList }) => ({
  type: constants.SET_NEWSFEED_DATA_LIST,
  newList,
  totalList,
  updateList,
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
export const selectCategoryList = selectedCategoryList => ({
  type: constants.CHANGE_SELECTED_CATEGORY,
  selectedCategoryList,
});

export const setSelectedCategoryList = selectedCategoryList => ({
  type: constants.SET_SELECTED_CATEGORY,
  selectedCategoryList,
});

export const saveSelectedCategory = () => ({
  type: constants.SAVE_SELECTED_CATEGORY,
});

// 모달 On / Off
export const setModalView = modalView => ({
  type: constants.SET_MODAL_VIEW,
  modalView,
});
