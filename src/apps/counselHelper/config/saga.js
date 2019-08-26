import { Axios } from 'utils/AxiosFunc';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as action from './constants';

function* getWidget() {
  const response = yield call(Axios.get, '/api/bizgroup/v1/widget/AWidgetHandler');
  const { bizgroup } = response;

  yield put({ type: action.SAVE_WIDGET_INFO, categorie: bizgroup });
}

export default function* watcher() {
  yield takeLatest(action.GET_WIDGET_INFO, getWidget);
}
