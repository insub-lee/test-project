import { Axios } from 'utils/AxiosFunc';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as action from './constants';

function* getWidget(payload) {
  const { BIZGRP_ID } = payload;
  const response = yield call(Axios.get, `/api/bizstore/v1/bizgroup/counselCategorie?param=${BIZGRP_ID}`);
  const { categorie } = response;
  yield put({ type: action.SAVE_WIDGET_INFO, categorie });
}
function* deleteConfig(payload) {
  const { item, type } = payload.payload;

  const { size, user, data } = item;
  const itemValue = {
    size,
    user,
    data,
  };
  const { WIDGET_ID } = item;

  yield call(Axios.post, `/api/bizstore/v1/bizgroup/counselconfig`, {
    WIDGET_ID,
    itemValue: JSON.stringify(itemValue),
    type,
  });
}

export default function* watcher() {
  yield takeLatest(action.GET_WIDGET_INFO, getWidget);
  yield takeLatest(action.DELETE_CONFIG, deleteConfig);
}
