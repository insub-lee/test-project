import React from 'react';
import { takeLatest, call, put } from 'redux-saga/effects';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as feed from 'components/Feedback/functions';
import { fromJS } from 'immutable';

import { intlObj } from 'utils/commonUtils';
import messages from '../messages';

import { Axios } from '../../../../../utils/AxiosFunc';
import * as constants from './constants';

export function* appExamine(payload) {
  const { history } = payload.payload;
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/appExamine/', payload.payload);
  const { code } = response;
  if (code === 200) {
    message.success(
      <MessageContent>
        {intlObj.get(messages.appExaInsert)}
      </MessageContent>,
      3,
    );
    history.push('/admin/adminmain/app');
    // yield put({ type: constants.APP_EXAMINE_OK, payload: true });
  } else if (code === 201) {
    feed.error(`${intlObj.get(messages.appExaInsertFail2)}`);
  } else if (code === 510) {
    feed.error(`${intlObj.get(messages.reqValFail)}`);
  } else {
    feed.error(`${intlObj.get(messages.appExaInsertFail)}`);
  }
}

export function* getMyAppExaDetail(payload) {
  const { EXA_MODE } = payload.payload;

  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/myappexadetail/', payload.payload);

  if (response.managerChk !== 0) {
    if (response.appinfo != null) {
      yield put({ type: constants.APP_INFO, payload: response.appinfo });
    }

    if (EXA_MODE === 'D') {
      if (response.APPROVALREQ_COMMENT != null) {
        yield put({
          type: constants.APPROVALREQ_COMMENT,
          payload: fromJS(response.APPROVALREQ_COMMENT),
        });
      }
      if (response.APPROVALPROC_COMNT != null) {
        yield put({
          type: constants.APPROVALPROC_COMNT,
          payload: fromJS(response.APPROVALPROC_COMNT),
        });
      }
      if (response.APPROVALPROC_LIST != null && response.APPROVALPROC_LIST.length > 0) {
        yield put({
          type: constants.APPROVALPROC_LIST,
          payload: fromJS(response.APPROVALPROC_LIST),
        });
        yield put({
          type: constants.SVC_REQ_DT,
          payload: fromJS(response.APPROVALPROC_LIST[0].SVC_REQ_DT),
        });
      } else {
        yield put({
          type: constants.APPROVALPROC_LIST,
          payload: fromJS([]),
        });
        yield put({
          type: constants.SVC_REQ_DT,
          payload: fromJS(''),
        });
      }
    } else {
      yield put({
        type: constants.APPROVALREQ_COMMENT,
        payload: fromJS([]),
      });
      yield put({
        type: constants.APPROVALPROC_COMNT,
        payload: fromJS([]),
      });
      yield put({
        type: constants.APPROVALPROC_LIST,
        payload: fromJS([]),
      });
    }
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.APP_EXAMINE, appExamine);
  yield takeLatest(constants.GET_MYAPP_EXADETAIL, getMyAppExaDetail);
}
