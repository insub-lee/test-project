import * as constants from './constants';

// 게시물 가져오기
export const getNewsfeedDataList = (widget_id, selectedCategory) => ({
  type: constants.GET_NEWSFEED_DATA_LIST,
  widget_id,
  selectedCategory,
});

// 게시물 store 저장
export const setNewsfeedDataList = ({ newDataList, widget_id }) => ({
  type: constants.SET_NEWSFEED_DATA_LIST,
  widget_id,
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
export const selectCategoryList = (selectedCategoryList, item, settingType) => ({
  type: constants.CHANGE_SELECTED_CATEGORY,
  selectedCategoryList,
  item,
  settingType,
});

export const saveSelectedCategory = () => ({
  type: constants.SAVE_SELECTED_CATEGORY,
});

// 모달 - 게시물선택시
export const setModalView = (modalView, widget_id) => ({
  type: constants.SET_MODAL_VIEW,
  modalView,
  widget_id,
});

// 모달 - 모달내 카테고리 클릭이벤트
export const setModalIdx = (mualIdx, widget_id) => ({
  type: constants.SET_MODAL_IDX,
  mualIdx,
  widget_id,
});
