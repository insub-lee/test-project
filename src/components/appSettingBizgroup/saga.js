import { call, put, takeLatest, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
// import * as constantsTopMenu from 'containers/store/AppMain/BizManage/BizMenuReg/TopMenu/constants';
// import * as constantsBizManage from 'containers/store/AppMain/BizManage/constants';
import * as adminBizManageTopMenuActionTypes from 'containers/admin/AdminMain/Menu/BizMenuReg/TopMenu/constants'
import * as adminBizManageActionTypes from 'containers/admin/AdminMain/Menu/constants'
import * as constants from './constants';
import { Axios } from '../../utils/AxiosFunc';

export function* initWidgetSetting(payload) {
  const { BIZGRP_ID, PAGE_ID, WIDGET_ID } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/widget', { WIDGET_ID });
  const { widget } = response;

  const response2 = yield call(Axios.post, '/api/bizstore/v1/bizgroup/widgetList', { PAGE_ID });
  const { widgetList } = response2;
  
  yield put({
    type: constants.SET_WIDGET_SETTING,
    widget: fromJS(JSON.parse(widget)),
    widgetList: fromJS(JSON.parse(widgetList)),
    BIZGRP_ID,
  });
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

export function* getWidget(payload) {
  const { WIDGET_ID } = payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/widget', { WIDGET_ID });
  const { widget } = response;
  if (widget) {
    yield put({ type: constants.SET_WIDGET, widget: fromJS(JSON.parse(widget)) });
  }
}

export function* updateWidget(payload) {
  const { WIDGET_ID, data } = payload;
  const pageInfo = yield select(state => state.get('appsettingbizgroup'));
  const BIZGRP_ID = pageInfo.get('BIZGRP_ID');

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/updateWidget', { BIZGRP_ID, WIDGET_ID, data });
  const { code, widget } = response;
  if (code === 200) {
    yield put({ type: constants.GET_WIDGET_LIST, PAGE_ID: widget.PAGE_ID });

    // yield put({
    //   type: constantsTopMenu.GET_BIZ_INFO,
    //   BIZGRP_ID,
    // });

    yield put({
      type: adminBizManageTopMenuActionTypes.GET_BIZ_INFO,
      BIZGRP_ID,
    });

    
    yield put({
      type: adminBizManageActionTypes.UPDATE_TREENODE,
      key: BIZGRP_ID,
      newNode: { CHG_YN: 'Y' },
    });
  }
}

export function* updateBizGroupChgYn() {
  const pageInfo = yield select(state => state.get('appsettingbizgroup'));
  const BIZGRP_ID = pageInfo.get('BIZGRP_ID');

  const response = yield call(Axios.post, '/api/bizstore/v1/bizgroup/updateChgyn', { data: { BIZGRP_ID } });
  const { code } = response;
  if (code === 200) {
    yield put({
      type: adminBizManageTopMenuActionTypes.GET_BIZ_INFO,
      BIZGRP_ID,
    });

    yield put({
      type: adminBizManageActionTypes.UPDATE_TREENODE,
      key: BIZGRP_ID,
      newNode: { CHG_YN: 'Y' },
    });
  }
}

export default function* quickmenuSettingSaga() {
  yield takeLatest(constants.INIT_WIDGET_SETTING, initWidgetSetting);
  yield takeLatest(constants.GET_WIDGET_LIST, getWidgetList);
  yield takeLatest(constants.GET_WIDGET, getWidget);
  yield takeLatest(constants.UPDATE_WIDGET, updateWidget);
  yield takeLatest(constants.UPDATE_BIZGROUP_CHGYN, updateBizGroupChgYn);
}
