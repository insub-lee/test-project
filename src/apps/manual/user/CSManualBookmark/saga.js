import React from 'react';
import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as constants from './constants';
import * as actions from './action';

// 유저의 북마크 데이터 가져오기
function* getBookmarkBySaga(payload) {
  const { widgetId } = payload;
  const response = yield call(Axios.get, '/api/manual/v1/ManualBookmarkWidgetHandler');
  if (response.result === 'success') {
    const { bookMarkList } = response;
    yield put(actions.setBookmarkByReducer(widgetId, bookMarkList));
  } else {
    yield put(actions.setBookmarkByReducer(widgetId, []));
  }
}

function* updateBookmarkBySaga(payload) {
  const { item, selectedMual, settingType } = payload;
  const params = {
    settingType,
    widgetId: item.WIDGET_ID,
    itemValue: JSON.stringify({
      size: item.size,
      user: item.user,
      data: { selectedBookmark: selectedMual },
    }),
  };

  const response = yield call(Axios.put, '/api/manual/v1/ManualBookmarkWidgetHandler', params);
  if (response.result === 'success' && settingType !== 'bizgroup') {
    console.debug(response.result);
  }
}

export default function* watcher() {
  yield takeEvery(constants.GET_BOOKMARK_DATA, getBookmarkBySaga);
  yield takeEvery(constants.UPT_BOOKMARK_DATA, updateBookmarkBySaga);
}
