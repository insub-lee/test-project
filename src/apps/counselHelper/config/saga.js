import { Axios } from 'utils/AxiosFunc';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as action from './constants';

function* getWidget() {
  const response = yield call(Axios.get, '/api/bizgroup/v1/widget/AWidgetHandler');
  const { bizgroup } = response;
  // const { bizmenu } = response;
  // yield put({ type: action.SAVE_MENU_INFO, menu: bizmenu });
  yield put({ type: action.SAVE_WIDGET_INFO, categorie: bizgroup });
}
function* getDetail(PRNT_ID) {
  const BIZ_ID = PRNT_ID.detail;
  const response = yield call(Axios.post, `/api/bizgroup/v1/widget/ADetailHandler`, { BIZ_ID });
  const { detail } = response;
  yield put({ type: action.SAVE_DETAIL, detail });
}

export default function* watcher() {
  yield takeLatest(action.GET_WIDGET_INFO, getWidget);
  yield takeLatest(action.GET_DETAIL, getDetail);
}
