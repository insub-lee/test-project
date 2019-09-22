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

export function* getCodeAdminList(payload) {
  const { codeAdminList: prevList } = payload;
  const param = payload;
  delete param.codeAdminList;
  delete param.type;

  const response = yield call(Axios.post, '/api/admin/v1/common/codeadminlist', param);
  const codeAdminList = prevList.length > 0 ? prevList.concat(response.codeAdminList) : response.codeAdminList;

  yield put({
    type: constants.SET_CODE_ADMIN_LIST,
    payload: fromJS(codeAdminList),
  });
}

export function* getDelList(payload2) {
  // console.log('saga_delData', payload2);
  const response = yield call(Axios.post, '/api/admin/v1/common/deletecodeadmin', payload2);
  const { code } = response;
  const { sNum, eNum, sortColumn, sortDirection, keywordType, keyword } = payload2;

  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.delComplete)}</MessageContent>, 3);
    yield put({
      type: constants.GET_CODE_ADMIN_LIST,
      sNum,
      eNum,
      codeAdminList: [],
      sortColumn,
      sortDirection,
      keywordType,
      keyword,
    });
  } else if (code === 500) {
    // console.log('실패');
    feed.error(`${intlObj.get(messages.delError)}`);
  }
}

export default function* codeAdminSaga() {
  yield takeLatest(constants.GET_CODE_ADMIN_LIST, getCodeAdminList);
  yield takeLatest(constants.GET_DEL_CODEID, getDelList);
}
