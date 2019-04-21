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
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/regismyapp/', payload.payload);

  const { code, appId, ver } = response;
  if (code === 200) {
    message.success(
      <MessageContent>
        {intlObj.get(messages.appRegisOk)}
      </MessageContent>,
      3,
    );
    history.push(`/store/appMain/MyApp/MyAppUpdate/U/${appId}/${ver}/2/N`);
  } else if (code === 510) {
    feed.error(`${intlObj.get(messages.reqValFail)}`);
  } else if (code === 520) {
    feed.error(`${intlObj.get(messages.appIdFail)}`);
  } else if (code === 540) {
    feed.error(`${intlObj.get(messages.serviceFormErorr)}`);
  } else if (code === 550) {
    feed.error(`${intlObj.get(messages.serviceGubunErorrY)}`);
  } else if (code === 560) {
    feed.error(`${intlObj.get(messages.serviceGubunErorrN)}`);
  } else if (code === 580) {
    feed.error(`${intlObj.get(messages.noSec)}`);
  } else {
    feed.error(`${intlObj.get(messages.appRegisFail)}`);
  }
}

export function* getInitInfo() {
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/initInfo');
  yield put({ type: constants.SET_LINKTYPE, payload: fromJS(response.linkTypeList) });
  yield put({ type: constants.SET_METHOD, payload: fromJS(response.methodList) });
}

export default function* orgSage() {
  yield takeLatest(constants.INSERT_APP_INFO, insertAppInfo);
  yield takeLatest(constants.GET_INIT_INFO, getInitInfo);
}
