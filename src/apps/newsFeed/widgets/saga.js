import { put, call, select, takeLatest } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';
import * as actions from './action';
import * as selectors from './selector';

// 게시물 리스트 가져오기
export function* getDataList(payload) {
  const widget_id = payload.widget_id;
  const data = {
    widget_id: widget_id,
    category: payload.selectedCategory,
  };

  const result = yield call(Axios.post, `/api/manual/v1/ManualWidgetHandler`, data);
  console.log('리스폰확인', result.widgetData);
  const widgetData = result.widgetData
  const oldWidgetDataList = yield select(selectors.selectWidgetDataList())

  if(oldWidgetDataList.size !== 0){
    const oldDataList = oldWidgetDataList.filter(item => item.widget_id !== widget_id);
    const newDataList = oldDataList.concat(widgetData);
    yield put(actions.setNewsfeedDataList({ newDataList}));
  } else {
    const oldDataList = oldWidgetDataList;
    const newDataList = oldDataList.concat(widgetData);
    yield put(actions.setNewsfeedDataList({ newDataList}));
  }
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
      const result ={
          widget_id: payload.item.WIDGET_ID,
          item_value:JSON.stringify({
          size: payload.item.size,
          user: payload.item.user,
          data: {selectedCategory: []
          },
      })
      };
    yield call(Axios.put, '/api/manual/v1/ManualWidgetSettingHandler', result)
  } else {
    const data = {
      category: payload.selectedCategoryList, 
    };    
    const response = yield call(Axios.post, '/api/manual/v1/ManualWidgetSettingHandler', data)
    const result ={
        widget_id: payload.item.WIDGET_ID,
        item_value:JSON.stringify({
        size: payload.item.size,
        user: payload.item.user,
        data: {selectedCategory: response.selectedCategory
        },
      })
    };
    yield call(Axios.put, '/api/manual/v1/ManualWidgetSettingHandler', result)
  }
}

export default function* watcher() {
  yield takeLatest(constants.GET_NEWSFEED_DATA_LIST, getDataList);
  yield takeLatest(constants.GET_INIT_CATEGORY, getInitCategoryList);
  yield takeLatest(constants.CHANGE_SELECTED_CATEGORY, changeCategoryList);
}
