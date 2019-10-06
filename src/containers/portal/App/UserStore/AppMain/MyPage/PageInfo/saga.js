import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { intlObj } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import { Axios } from 'utils/AxiosFunc';
import * as constantsCommon from 'containers/common/constants';
import messages from '../messages';
import * as constants from './constants';

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
    const newWidgetList = JSON.parse(widgetList);
    const pageInfo = yield select(state => state.get('pageInfo'));
    const oldWidgetList = pageInfo.get('widgetList').toJS();
    if (oldWidgetList.length > 0) {
      const oldPageId = oldWidgetList[0].PAGE_ID;
      const newPageId = newWidgetList[0].PAGE_ID;

      if (oldPageId === newPageId) {
        yield put({ type: constants.SET_WIDGET_LIST, widgetList: fromJS(newWidgetList) });
      }
    }
  }
}

export function* deleteWidget(payload) {
  const { WIDGET_ID } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/mypage/deleteWidget', { WIDGET_ID });
  const { code } = response;

  if (code === 200) {
    const pageInfo = yield select(state => state.get('pageInfo'));
    const widgetList = pageInfo.get('widgetList');
    const nWidgetList = widgetList.filter(o => {
      if (Number(o.get('id')) === WIDGET_ID) {
        return false;
      }
      return true;
    });
    message.success(`${intlObj.get(messages.completeDelete)}`, 2);
    // feed.success(`${intlObj.get(messages.deleteWidgetSuccess)}`);

    yield put({ type: constants.SET_WIDGET_LIST, widgetList: fromJS(nWidgetList) });
  }
  // else {
  //   console.log('error?');
  // }
}

export function* addWidgets(payload) {
  const { PAGE_ID, APP_IDS } = payload;

  // const pageInfo = yield select(state => state.get('pageInfo'));
  // const widgetList = pageInfo.get('widgetList');
  // const oldAppIds = widgetList.map(m => Number(m.get('APP_ID')));
  // const appIds = APP_IDS.filter(n => !oldAppIds.includes(n));

  if (APP_IDS.length > 0) {
    const response = yield call(Axios.post, '/api/bizstore/v1/mypage/insertWidgets', { PAGE_ID, APP_IDS });
    const { code, newWidgetList } = response;

    if (code === 200) {
      yield put({ type: constants.SET_WIDGET_LIST, widgetList: fromJS(newWidgetList) });
    }
    // else {
    //   console.log('error?');
    // }
  }
}

export function* moveMyWidget(payload) {
  const { PAGE_ID, layout } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/mypage/moveMyWidget', { PAGE_ID, layout });
  const { code, newWidgetList } = response;

  if (code === 200) {
    yield put({ type: constants.SET_WIDGET_LIST, widgetList: fromJS(newWidgetList) });
  }
  // else {
  //   console.log('error?');
  // }
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

export default function* rootSaga() {
  yield takeLatest(constants.GET_WIDGET_LIST, getWidgetList);
  yield takeLatest(constants.DELETE_WIDGET, deleteWidget);
  yield takeLatest(constants.ADD_WIDGETS, addWidgets);
  yield takeLatest(constants.MOVE_MYWIDGET, moveMyWidget);
  yield takeLatest(constants.UPDATE_WIDGET, updateWidget);
  yield takeLatest(constantsCommon.RESET_MYMENU_WIDGET_LIST, resetWidgetList);
}
