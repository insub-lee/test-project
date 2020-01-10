import { takeLatest, put, call, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import { intlObj } from 'utils/commonUtils';
import * as constants from './constants';
import * as constantsTopMenu from '../TopMenu/constants';
import * as constantsBizManage from '../../constants';
import messages from '../messages';

export function* getBizInfo(payload) {
  const { BIZGRP_ID, PAGE_ID } = payload;
  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/info', { BIZGRP_ID: Number(BIZGRP_ID) });

  if (response.result !== undefined) {
    yield put({
      type: constants.SET_BIZ_INFO,
      bizGroupInfo: response.result,
    });
  }

  const response2 = yield call(Axios.post, '/api/bizstore/v1/bizgroup/widgetList', { PAGE_ID });
  const { widgetList } = response2;
  if (widgetList) {
    yield put({
      type: constants.SET_WIDGET_LIST,
      widgetList: fromJS(JSON.parse(widgetList)),
      BIZGRP_ID,
    });
  }
}

export function* getWidgetList(payload) {
  const { BIZGRP_ID, PAGE_ID } = payload;
  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/widgetList', { PAGE_ID });
  const { widgetList } = response;
  if (widgetList) {
    yield put({
      type: constants.SET_WIDGET_LIST,
      widgetList: fromJS(JSON.parse(widgetList)),
      BIZGRP_ID,
    });
  }
}

export function* deleteWidget(payload) {
  const { WIDGET_ID } = payload;

  const pageInfo = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg/PageInfo'));
  const widgetList = pageInfo.get('widgetList');
  const BIZGRP_ID = pageInfo.get('BIZGRP_ID');

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/deleteWidget', { WIDGET_ID, BIZGRP_ID });
  const { code } = response;

  if (code === 200) {
    const nWidgetList = widgetList.filter(o => {
      if (Number(o.get('id')) === WIDGET_ID) {
        return false;
      }
      return true;
    });
    yield put({ type: constants.SET_WIDGET_LIST, widgetList: fromJS(nWidgetList) });

    yield put({
      type: constantsTopMenu.GET_BIZ_INFO,
      BIZGRP_ID,
    });

    yield put({
      type: constantsBizManage.UPDATE_TREENODE,
      key: BIZGRP_ID,
      newNode: { CHG_YN: 'Y' },
    });

    message.success(`${intlObj.get(messages.completeDelete)}`, 2);
  }
  // else {
  //   console.log('error?');
  // }
}

export function* addWidgets(payload) {
  const { PAGE_ID, APP_IDS } = payload;
  if (APP_IDS.length > 0) {
    const pageInfo = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg/PageInfo'));
    const BIZGRP_ID = pageInfo.get('BIZGRP_ID');

    const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/insertWidget', { BIZGRP_ID, PAGE_ID, APP_IDS });
    const { code, newWidgetList } = response;

    if (code === 200) {
      yield put({ type: constants.SET_WIDGET_LIST, widgetList: fromJS(newWidgetList) });

      yield put({
        type: constantsTopMenu.GET_BIZ_INFO,
        BIZGRP_ID,
      });

      yield put({
        type: constantsBizManage.UPDATE_TREENODE,
        key: BIZGRP_ID,
        newNode: { CHG_YN: 'Y' },
      });
    }
    // else {
    //   console.log('error?');
    // }
  }
}

export function* moveMyWidget(payload) {
  const { PAGE_ID, layout } = payload;

  const pageInfo = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg/PageInfo'));
  const BIZGRP_ID = pageInfo.get('BIZGRP_ID');

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/moveWidget', { BIZGRP_ID, PAGE_ID, layout });
  const { code, newWidgetList } = response;

  if (code === 200) {
    yield put({ type: constants.SET_WIDGET_LIST, widgetList: fromJS(newWidgetList) });

    yield put({
      type: constantsTopMenu.GET_BIZ_INFO,
      BIZGRP_ID,
    });

    yield put({
      type: constantsBizManage.UPDATE_TREENODE,
      key: BIZGRP_ID,
      newNode: { CHG_YN: 'Y' },
    });
  }
  // else {
  //   console.log('error?');
  // }
}

export function* updateWidget(payload) {
  const { WIDGET_ID, data } = payload;

  const pageInfo = yield select(state => state.get('admin/AdminMain/Menu/BizMenuReg/PageInfo'));
  const BIZGRP_ID = pageInfo.get('BIZGRP_ID');

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/updateWidget', { BIZGRP_ID, WIDGET_ID, data });
  const { code } = response;
  if (code === 200) {
    yield put({ type: constants.GET_WIDGET_LIST, PAGE_ID: data.PAGE_ID });

    yield put({
      type: constantsTopMenu.GET_BIZ_INFO,
      BIZGRP_ID,
    });

    yield put({
      type: constantsBizManage.UPDATE_TREENODE,
      key: BIZGRP_ID,
      newNode: { CHG_YN: 'Y' },
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_BIZ_INFO, getBizInfo);
  yield takeLatest(constants.GET_WIDGET_LIST, getWidgetList);
  yield takeLatest(constants.DELETE_WIDGET, deleteWidget);
  yield takeLatest(constants.ADD_WIDGETS, addWidgets);
  yield takeLatest(constants.MOVE_MYWIDGET, moveMyWidget);
  yield takeLatest(constants.UPDATE_WIDGET, updateWidget);
}
