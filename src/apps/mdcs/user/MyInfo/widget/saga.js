import React from 'react';
import { call, takeLatest } from 'redux-saga/effects';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';

export function* updateUserInfoSaga(payload) {
  const { settingData } = payload;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const mobileRegex = /^\d{3}-\d{3,4}-\d{4}$/;

  if (settingData.size !== 0) {
    if (settingData.get('MOBILE_TEL_NO') !== undefined && !mobileRegex.test(settingData.get('MOBILE_TEL_NO'))) {
      message.warning(<MessageContent>잘못된 연락처 형식입니다.</MessageContent>, 1);
    } else if (settingData.get('EMAIL') !== undefined && !emailRegex.test(settingData.get('EMAIL'))) {
      message.warning(<MessageContent>잘못된 이메일 형식입니다.</MessageContent>, 1);
    } else {
      const response = yield call(Axios.post, '/api/mdcs/v1/common/MyInfoWidget', payload);
      if (response.result === 'success') {
        message.success(<MessageContent>정보가 변경되었습니다.</MessageContent>, 1);
      }
    }
  } else {
    message.error(<MessageContent>변경된 사항이 없습니다.</MessageContent>, 1);
  }
}

export default function* watcher() {
  yield takeLatest(constants.UPDATE_USER_INFO, updateUserInfoSaga);
}
