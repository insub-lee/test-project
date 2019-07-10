import React from 'react';
import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as feed from 'components/Feedback/functions';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { intlObj } from 'utils/commonUtils';
import messages from '../messages';

import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';

export function* reqAppRatingInfo(payload) {
  const { page, pagePerNum, appRatingList } = payload.payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/store/apprating/', payload.payload);

  if (response.appRatingList.length > 0) {
    response.appRatingList.map(item => (
      appRatingList.push({
        RNUM: item.RNUM,
        APP_ID: item.APP_ID,
        VER: item.VER,
        USER_ID: item.USER_ID,
        POINT: item.POINT,
        COMNT: item.COMNT,
        REG_USER_ID: item.REG_USER_ID,
        REG_DTTM: item.REG_DTTM,
        UPD_USER_ID: item.UPD_USER_ID,
        UPD_DTTM: item.UPD_DTTM,
        NAME_KOR: item.NAME_KOR,
        NAME_ENG: item.NAME_ENG,
        NAME_CHN: item.NAME_CHN,
        NAME_JPN: item.NAME_JPN,
        NAME_ETC: item.NAME_ETC,
        EMP_NO: item.EMP_NO,
        DEPT_NAME_KOR: item.DEPT_NAME_KOR,
        DEPT_NAME_ENG: item.DEPT_NAME_ENG,
        DEPT_NAME_CHN: item.DEPT_NAME_CHN,
        DEPT_NAME_JPN: item.DEPT_NAME_JPN,
        DEPT_NAME_ETC: item.DEPT_NAME_ETC,
        PSTN_NAME_KOR: item.PSTN_NAME_KOR,
        PSTN_NAME_ENG: item.PSTN_NAME_ENG,
        PSTN_NAME_CHN: item.PSTN_NAME_CHN,
        PSTN_NAME_JPN: item.PSTN_NAME_JPN,
        PSTN_NAME_ETC: item.PSTN_NAME_ETC,
        PHOTO: item.PHOTO,
      })
    ));
  }

  yield put({
    type: constants.RES_APP_RATING_LIST,
    payload: fromJS(appRatingList),
  });

  if (response.appRatingInfo !== null) {
    yield put({
      type: constants.RES_APP_RATING_INFO,
      payload: response.appRatingInfo,
    });
  } else {
    yield put({
      type: constants.RES_APP_RATING_INFO,
      payload: fromJS([]),
    });
  }

  if (response.myAppRating !== null) {
    yield put({
      type: constants.MY_APP_RATING,
      payload: response.myAppRating,
    });
  } else {
    yield put({
      type: constants.MY_APP_RATING,
      payload: fromJS([]),
    });
  }

  if (page * pagePerNum >= response.appRatingListSize) {
    yield put({
      type: constants.RTHEI_FLOG,
      payload: false,
    });
  } else {
    yield put({
      type: constants.RTHEI_FLOG,
      payload: true,
    });
  }

  yield put({
    type: constants.APP_RATING_LIST_SIZE,
    payload: response.appRatingListSize,
  });
}

export function* registRating(payload) {
  const param = {
    appId: String(payload.payload.APP_ID),
    pageingNum: payload.payload.pageingNum,
    pageingStandard: payload.payload.pageingStandard,
    page: payload.payload.page,
    pagePerNum: payload.payload.pagePerNum,
    appRatingList: [],
  };
  const gubun = payload.payload.GUBUN;
  const response = yield call(Axios.post, '/api/bizstore/v1/store/registrating/', payload.payload);
  const { code } = response;

  if (code === 200 || code === 201) {
    if (code === 200) {
      if (gubun === 'INSERT') {
        message.success(
          <MessageContent>
            {intlObj.get(messages.reviewRegistOk)}
          </MessageContent>,
          3,
        );
      } else if (gubun === 'UPDATE') {
        message.success(
          <MessageContent>
            {intlObj.get(messages.reviewUpdateOk)}
          </MessageContent>,
          3,
        );
      } else if (gubun === 'DELETE') {
        message.success(
          <MessageContent>
            {intlObj.get(messages.reviewDeleteOk)}
          </MessageContent>,
          3,
        );
      }
    } else if (code === 201) {
      if (gubun === 'INSERT') {
        feed.error(`${intlObj.get(messages.reviewRegistErr)}`);
      } else if (gubun === 'UPDATE') {
        feed.error(`${intlObj.get(messages.reviewUpdateErr)}`);
      } else if (gubun === 'DELETE') {
        feed.error(`${intlObj.get(messages.reviewDeleteErr)}`);
      }
    }

    yield put({
      type: constants.REQ_APP_RATING_INFO,
      payload: param,
    });
  } else if (code === 500) {
    if (gubun === 'INSERT') {
      feed.error(`${intlObj.get(messages.reviewRegistErr)}`);
    } else if (gubun === 'UPDATE') {
      feed.error(`${intlObj.get(messages.reviewUpdateErr)}`);
    } else if (gubun === 'DELETE') {
      feed.error(`${intlObj.get(messages.reviewDeleteErr)}`);
    }
  }
}

export default function* orgSage() {
  yield takeLatest(constants.REQ_APP_RATING_INFO, reqAppRatingInfo);
  yield takeLatest(constants.REGIST_RATING, registRating);
}
