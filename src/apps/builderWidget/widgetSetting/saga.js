import { takeLatest, call, put } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as actionTypes from './constants';
import * as actions from './actions';

function* getWorkList() {
  const response = yield call(Axios.get, `/api/builder/v1/work/main`);
  const { list } = response;
  yield put(actions.setWorkList(list));
}

function* getBuilderWidgetConfig({ widgetId }) {
  const response = yield call(Axios.get, `/api/manual/v1/ManualWidgetConfigHandler?WIDGET_ID=${widgetId}`);
  const { result } = response;
  yield put(actions.setBuilderWidgetConfig(result.ITEM_VALUE));
}

function* saveBuilderWidgetConfig({ payload }) {
  const response = yield call(Axios.post, '/api/manual/v1/ManualWidgetConfigHandler', { PARAM: payload });
  console.debug('response', response);
}

export default function* watcher() {
  yield takeLatest(actionTypes.GET_WORK_LIST, getWorkList);
  yield takeLatest(actionTypes.SAVE_BUILDER_WIDGET_CONFIG, saveBuilderWidgetConfig);
  yield takeLatest(actionTypes.GET_BUILDER_WIDGET_CONFIG, getBuilderWidgetConfig);
}
