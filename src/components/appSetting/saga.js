import { call, put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as constantsCommon from 'containers/common/constants';
import * as constants from './constants';
import { Axios } from '../../utils/AxiosFunc';

export function* getWidgetList(payload) {
  const { PAGE_ID } = payload;
  const response = yield call(Axios.post, '/api/bizstore/v1/mypage/widgetList', { PAGE_ID });
  const { widgetList } = response;
  if (widgetList) {
    yield put({ type: constants.SET_WIDGET_LIST, widgetList: fromJS(JSON.parse(widgetList)) });
  }
}
export function* resetWidgetList(payload) {
  const { widgetList } = payload;
  if (widgetList) {
    yield put({ type: constants.SET_WIDGET_LIST, widgetList: fromJS(JSON.parse(widgetList)) });
  }
}

export function* resetWidget(payload) {
  const { widget } = payload;
  if (widget) {
    yield put({ type: constants.SET_WIDGET, widget: fromJS(JSON.parse(widget)) });
  }
}

export function* getWidget(payload) {
  const { WIDGET_ID } = payload;
  const response = yield call(Axios.post, '/api/bizstore/v1/mypage/widget', { WIDGET_ID });
  const { widget } = response;
  if (widget) {
    yield put({ type: constants.SET_WIDGET, widget: fromJS(JSON.parse(widget)) });
  }
}

export function* updateWidget(payload) {
  const { WIDGET_ID, data } = payload;
  yield call(Axios.post, '/api/bizstore/v1/mypage/updateWidget', { WIDGET_ID, data });
  // const response = yield call(Axios.post, '/api/bizstore/v1/mypage/updateWidget', { WIDGET_ID, data });
  // const { code } = response;
  // if (code === 200) {
  //   console.log('수정돼따');
  //   // yield put({ type: constants.SET_WIDGET_LIST, widgetList: fromJS(widgetList) });
  // }
}


export default function* quickmenuSettingSaga() {
  yield takeLatest(constants.GET_WIDGET_LIST, getWidgetList);
  yield takeLatest(constants.GET_WIDGET, getWidget);
  yield takeLatest(constants.UPDATE_WIDGET, updateWidget);
  yield takeLatest(constantsCommon.RESET_MYMENU_WIDGET_LIST, resetWidgetList);
  yield takeLatest(constantsCommon.RESET_MYMENU_WIDGET, resetWidget);
}
