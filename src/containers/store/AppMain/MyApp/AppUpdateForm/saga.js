import React from 'react';
import { takeLatest, call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import { intlObj } from 'utils/commonUtils';
import messages from '../messages';
import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';

export function* insertAppInfo(payload) {
  const { history } = payload.payload;
  const params = { ...payload.payload, SITE_ID: -1 };
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/updatemyapp/', params);
  const { code, appId, ver, SVC_YN } = response;

  if (code === 200) {
    // history.push('/store/appMain/MyApp');
    message.success(<MessageContent>{intlObj.get(messages.appUpdateOk)}</MessageContent>, 3);
    // history.push(`/store/appMain/MyApp/MyAppDetail/${appId}/${ver}`);
    if (SVC_YN === 'N') {
      history.push(`/store/appMain/MyApp/MyAppUpdate/U/${appId}/${ver}/2/N`);
    }
  } else if (code === 510) {
    feed.error(`${intlObj.get(messages.reqValFail)}`);
  } else if (code === 520) {
    feed.error(`${intlObj.get(messages.appIdFail)}`);
  } else if (code === 530) {
    feed.error(`${intlObj.get(messages.appStatus)}`);
  } else if (code === 540) {
    feed.error(`${intlObj.get(messages.serviceFormErorr)}`);
  } else if (code === 550) {
    feed.error(`${intlObj.get(messages.verUpdateFail)}`);
  } else if (code === 560) {
    feed.error(`${intlObj.get(messages.highVerPlease)}`);
  } else if (code === 570) {
    feed.error(`${intlObj.get(messages.lowVerNo)}`);
  } else if (code === 580) {
    feed.error(`${intlObj.get(messages.noSec)}`);
  } else {
    feed.error(`${intlObj.get(messages.appUpdateFail)}`);
  }
}

export function* getInitInfo() {
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/initInfo');
  yield put({ type: constants.SET_LINKTYPE, payload: fromJS(response.linkTypeList) });
  yield put({ type: constants.SET_METHOD, payload: fromJS(response.methodList) });
  // yield put({ type: constants.SET_WEDGET_COLOR, payload: fromJS(response.wedgetColorList) });
}

export function* getMyAppDetail(payload) {
  const { history } = payload.payload;
  const params = { ...payload.payload, SITE_ID: -1 };
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/appDetail/', params);

  if (response.managerChk === 0) {
    feed.error(`${intlObj.get(messages.authChk)}`);
    history.push('/store/appMain/MyApp');
  } else {
    const { appinfo } = response;

    const clientType = appinfo.CLIENT_TYPE;
    const clientTypeArr = clientType.split('|');
    appinfo.CLIENT_TYPE = clientTypeArr;

    const langList = appinfo.LANG_LIST;
    const langListArr = langList.split('|');
    appinfo.LANG_LIST = langListArr;

    const serviceForm = [];
    if (appinfo.WIDGET_SVC_YN === 'Y') {
      serviceForm.push('WY');
    }
    if (appinfo.MENU_SVC_YN === 'Y') {
      serviceForm.push('MY');
    }

    appinfo.SERVICE_FORM = serviceForm;

    const ver = appinfo.VER;
    const verArr = ver.split('.');
    appinfo.VER_1 = verArr[0].toString();
    appinfo.VER_2 = verArr[1].toString();
    appinfo.VER_3 = verArr[2].toString();

    yield put({ type: constants.SET_MY_APP_DETAIL, payload: appinfo });

    const appIconArr = [];
    if (appinfo.ICON !== null && appinfo.ICON !== '' && appinfo.ICON !== undefined) {
      appIconArr.push({ seq: appinfo.ICON });
    }
    yield put({ type: constants.APP_ICON_ARR, payload: fromJS(appIconArr) });

    if (response.process.length > 0) {
      const appWorkArr = [];
      appWorkArr.push({
        fileName: response.process[0].FILE_PATH,
        down: response.process[0].FILE_PATH,
      });
      yield put({ type: constants.APP_PROCESS_ARR, payload: fromJS(appWorkArr) });
      yield put({ type: constants.APP_PROCESS, payload: response.process[0] });
    }

    if (response.manual.length > 0) {
      const appManualArr = [];
      appManualArr.push({
        fileName: response.manual[0].FILE_PATH,
        down: response.manual[0].FILE_PATH,
      });
      yield put({ type: constants.APP_MANUAL_ARR, payload: fromJS(appManualArr) });
      yield put({ type: constants.APP_MANUAL, payload: response.manual[0] });
    }

    const screenshotList = [];
    response.screenshotList.map(item => screenshotList.push({ seq: item.FILE_PATH }));

    yield put({ type: constants.SCREENSHOT_LIST, payload: fromJS(screenshotList) });
    yield put({ type: constants.RES_APP_LIST, payload: fromJS(response.reqAppList) });
    yield put({ type: constants.RECOM_APP_LIST, payload: fromJS(response.recomAppList) });

    if (response.systemLink !== null) {
      yield put({ type: constants.SYSTEM_LINK, payload: response.systemLink });
    }
  }
}

export default function* orgSage() {
  yield takeLatest(constants.INSERT_APP_INFO, insertAppInfo);
  yield takeLatest(constants.GET_MY_APP_DETAIL, getMyAppDetail);
  yield takeLatest(constants.GET_INIT_INFO, getInitInfo);
}
