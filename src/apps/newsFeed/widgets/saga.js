import { put, call, select, takeLatest } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';
import * as actions from './action';

// 게시물 리스트 가져오기
export function* getDataList(payload) {
  const data = {
    widgetSize: payload.widgetSize,
    category: payload.selectedCategory,
  };
  const response = yield call(Axios.post, `/api/manual/v1/ManualWidgetHandler`, data);
  const newList = response.selectNewList;
  const totalList = response.selectTotalList;
  const updateList = response.selectUpdateList;
  yield put(actions.setNewsfeedDataList({ newList, totalList, updateList }));
}

// (Tree) 전체 카테고리 리스트 불러오기
export function* getInitCategoryList() {
  const response = yield call(Axios.get, '/api/manual/v1/categoryhandler');
  const { list } = response;
  yield put(actions.setCategoryList(list));
}

// 선택된 카테고리 store 저장
export function* changeCategoryList(payload) {
  const check = payload.selectedCategoryList.length;

  if (check === 0) {
    yield put(actions.setSelectedCategoryList(payload.selectedCategoryList));
    yield put(actions.saveSelectedCategory());
  } else {
    const data = {
      category: payload.selectedCategoryList,
    };
    const response = yield call(Axios.post, '/api/manual/v1/ManualWidgetSettingHandler', data);
    yield put(actions.setSelectedCategoryList(response.categoryList));
    yield put(actions.saveSelectedCategory());
  }
}

export function* saveCategoryConfig() {
  const widgetSize = yield select(state => state.get('NewsFeed').get('widgetSize'));
  const selectedCategory = yield select(state => state.get('NewsFeed').get('selectedCategory'));
  yield put(actions.getNewsfeedDataList(widgetSize, selectedCategory));
}

export default function* watcher() {
  yield takeLatest(constants.GET_NEWSFEED_DATA_LIST, getDataList);
  yield takeLatest(constants.GET_INIT_CATEGORY, getInitCategoryList);
  yield takeLatest(constants.CHANGE_SELECTED_CATEGORY, changeCategoryList);
  yield takeLatest(constants.SAVE_SELECTED_CATEGORY, saveCategoryConfig);
}
