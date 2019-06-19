import { lang } from 'utils/commonUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as actionType from './constants';

export function* getSkinList() {
  const response = yield call(Axios.post, '/api/common/v1/account/appSettingTheme/');
  const resultValue = response;

  // 이 조건은 왜 들어감?
  if (resultValue.theme.length > 0) {
    yield put({ type: actionType.LOAD_SKIN_REDUCER, resultValue });
  }
}

export function* execApps(payload) {
  const { pageID } = payload;
  const PAGE_ID = Number(pageID);
  const { node } = payload;

  const response = yield call(Axios.post, '/api/portal/v1/page/executeAppsPreview/', { PAGE_ID });
  if (response.list === 'fail') {
    yield put({ type: actionType.EXEC_APPS_FAIL });
  } else {
    const resultValue = JSON.parse(response.list);

    yield put({ type: actionType.EXEC_APPS_SUCCESS, resultValue, node });
  }
}

export function* getInitialPortalPage(payload) {
  const data = {
    PARAM: {
      PAGEID: payload.PAGE_ID,
    },
  };

  const response = yield call(Axios.post, '/api/portal/v1/dock/dockSetMyMenuData/', data);
  const dataList = response.list;

  const { managerInfo } = response;
  const selectedIndex = dataList.MENU_ID;
  const menuName = lang.get('NAME', dataList);

  if (response.list !== 'fail') {
    yield put({
      type: actionType.RECEIVE_MYMENU_DATA_SUCCESS,
      payload: dataList,
      selectedIndex,
      menuName,
      managerInfo,
    });
  } else {
    yield put({ type: actionType.RECEIVE_MYMENU_DATA_FAIL });
  }
}

export function* getNotify() {
  const response = yield call(Axios.post, '/api/common/v1/notifyhandler');
  const isNoti = response.result;
  yield put({ type: actionType.SET_ISNOTIFY, isNoti });
}

export default function* appSaga() {
  yield takeLatest(actionType.LOAD_SKIN_SAGA, getSkinList);
  yield takeLatest(actionType.EXEC_APPS_SAGA, execApps);

  // Dock Data
  yield takeLatest(actionType.GET_INITIAL_PORTALPAGE, getInitialPortalPage);
  // Notify Dot
  yield takeLatest(actionType.GET_ISNOTIFY, getNotify);
}
