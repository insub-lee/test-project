import { Axios } from 'utils/AxiosFunc';
import { takeEvery, call, put } from 'redux-saga/effects';
import * as action from './constants';

function* deleteUrl(payload) {
  console.log(payload);
  const { item, WIDGET_ID } = payload;
  yield call(Axios.post, `/api/portal/v1/page/deleteIframe`, {
    PARAM: item,
    itemValue: JSON.stringify(itemValue),
  });
  yield put({ type: action.SET_URL, url: item.data, WIDGET_ID });
}

export default function* watcher() {
  yield takeEvery(action.DELETE_URL, deleteUrl);
}
