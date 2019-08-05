import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import { fromJS } from 'immutable';
import * as feed from 'components/Feedback/functions';
import { intlObj, lang } from 'utils/commonUtils';
import messages from '../messages';

import * as constants from './constants';

export function* getBizInfo(payload) {
  console.debug('@@@@@@ payload: ', payload);
  const { BIZGRP_ID, TYPE } = payload;
  if (TYPE) {
    const response = yield call(Axios.post, '/api/bizstore/v1/store/bizgroupinfo', { BIZGRP_ID: Number(BIZGRP_ID), pageType: TYPE });

    if (response.result) {
      yield put({
        type: constants.SET_BIZ_INFO,
        bizInfo: response.result,
      });
    }

    const bizManagerList = response.bizManagerList ? response.bizManagerList : [];

    yield put({ type: constants.BIZ_MANAGER_LIST, bizManagerList: fromJS(bizManagerList) });
  }
}

export function* registBiz(payload) {
  const { BIZGRP_ID } = payload;
  const langGubun = lang.getLocale();

  const response = yield call(Axios.post, '/api/bizstore/v1/mypage/registbiz', { BIZGRP_ID: Number(BIZGRP_ID), langGubun });

  const { code } = response;

  if (code === 200) {
    feed.success(`${intlObj.get(messages.bizRegistOk)}`);
    yield put({
      type: constants.GET_BIZ_INFO,
      BIZGRP_ID,
    });
  } else if (code === 201) {
    feed.error(`${intlObj.get(messages.bizRegistfail)}`);
  } else {
    feed.error(`${intlObj.get(messages.bizRegistErr)}`);
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.GET_BIZ_INFO, getBizInfo);
  yield takeLatest(constants.REGIST_BIZ, registBiz);
}
