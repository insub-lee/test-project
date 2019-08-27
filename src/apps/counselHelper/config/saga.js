import { Axios } from 'utils/AxiosFunc';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as action from './constants';

function* getWidget() {
  const response = yield call(Axios.get, '/api/bizstore/v1/bizgroup/AWidgetHandler');
  const { bizgroup } = response;

  yield put({ type: action.SAVE_WIDGET_INFO, categorie: bizgroup });
}
function* deleteConfig(payload) {
  const { item } = payload;
  const itemValue = {
    size: item.size,
    user: item.user,
    data: item.data,
  };

  yield call(Axios.post, `/api/bizstore/v1/bizgroup/AConfigHandler`, {
    PARAM: item,
    itemValue: JSON.stringify(itemValue),
  });
}

export default function* watcher() {
  yield takeLatest(action.GET_WIDGET_INFO, getWidget);
  yield takeLatest(action.DELETE_CONFIG, deleteConfig);
}
