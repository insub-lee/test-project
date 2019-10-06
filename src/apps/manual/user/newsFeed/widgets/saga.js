import { put, call, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';
import * as actions from './action';

// 게시물 리스트 가져오기
export function* getDataList(payload) {
  const { widget_id, selectedCategory } = payload;

  const categoryData = {
    category: selectedCategory,
  };
  const response = yield call(Axios.post, '/api/manual/v1/ManualWidgetSettingHandler', categoryData);

  let responseData = response.selectedCategory;
  if (responseData === undefined) {
    responseData = [];
  }

  const data = {
    widget_id,
    category: responseData,
  };
  const result = yield call(Axios.post, `/api/manual/v1/ManualWidgetHandler`, data);
  const newDataList = result.widgetData;
  yield put(actions.setNewsfeedDataList({ newDataList, widget_id }));
}

// (Tree) 전체 카테고리 리스트 불러오기
export function* getInitCategoryList() {
  const response = yield call(Axios.get, '/api/manual/v1/categoryhandler');
  const { list } = response;
  yield put(actions.setCategoryList(list));
}

// 선택된 카테고리 저장
export function* changeCategoryList(payload) {
  const check = payload.selectedCategoryList.length;
  console.log('뉴스피드 세팅타입', payload.settingType);
  if (check === 0) {
    const result = {
      settingType: payload.settingType,
      widgetId: payload.item.WIDGET_ID,
      itemValue: JSON.stringify({
        size: payload.item.size,
        user: payload.item.user,
        data: { selectedCategory: [] },
      }),
    };
    const response = yield call(Axios.put, '/api/manual/v1/ManualWidgetSettingHandler', result);
    if (response.result === 'success') {
      console.debug(response.result);
    }
  } else {
    const result = {
      settingType: payload.settingType,
      widgetId: payload.item.WIDGET_ID,
      itemValue: JSON.stringify({
        size: payload.item.size,
        user: payload.item.user,
        data: { selectedCategory: payload.selectedCategoryList },
      }),
    };
    const response = yield call(Axios.put, '/api/manual/v1/ManualWidgetSettingHandler', result);
    if (response.result === 'success') {
      console.debug(response.result);
    }
  }
}

export default function* watcher() {
  yield takeEvery(constants.GET_NEWSFEED_DATA_LIST, getDataList);
  yield takeLatest(constants.GET_INIT_CATEGORY, getInitCategoryList);
  yield takeLatest(constants.CHANGE_SELECTED_CATEGORY, changeCategoryList);
}
