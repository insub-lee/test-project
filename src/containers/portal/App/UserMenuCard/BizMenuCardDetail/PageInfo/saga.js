import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import { fromJS } from 'immutable';

import * as constants from './constants';

export function* getWidgetList(payload) {
  const { params } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/store/bizpageinfo', params);

  const { widgetList, pageInfoData } = response;
  if (widgetList) {
    yield put({
      type: constants.SET_WIDGET_LIST,
      widgetList: fromJS(JSON.parse(widgetList)),
      pageInfoData,
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_WIDGET_LIST, getWidgetList);
}
