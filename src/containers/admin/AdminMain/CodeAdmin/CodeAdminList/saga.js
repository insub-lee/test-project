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
  // console.log('payload', payload);
  // const { codeAdminList } = payload;
  // console.log('codeAdminList', codeAdminList);
  const response = yield call(Axios.post, '/api/admin/v1/common/codeadminlist', payload);
  // console.log('reponse', response);
  // if (response.codeadminlist.length > 0) {
  //   response.codeadminlist.map(item => (
  //     codeAdminList.push({
  //       RNUM: item.RNUM,
  //       CODE_GRP_CD: item.CODE_GRP_CD,
  //       CODE_NAME_KOR: item.CODE_NAME_KOR,
  //       CODE_NAME_ENG: item.CODE_NAME_ENG,
  //       CODE_NAME_CHN: item.CODE_NAME_CHN,
  //       CODE_NAME_JPN: item.CODE_NAME_JPN,
  //       CODE_NAME_ETC: item.CODE_NAME_ETC,
  //       SYS_YN: item.SYS_YN,
  //       USER_ID: item.USER_ID,
  //       EMP_NO: item.EMP_NO,
  //       NAME_KOR: item.NAME_KOR,
  //       NAME_ENG: item.NAME_ENG,
  //       NAME_CHN: item.NAME_CHN,
  //       NAME_JPN: item.NAME_JPN,
  //       NAME_ETC: item.NAME_ETC,
  //       REG_DTTM: item.REG_DTTM,
  //     })
  //   ));
  // }

  yield put({
    type: constants.SET_CODE_ADMIN_LIST,
    // payload: fromJS(response.codeadminlist),
    payload: fromJS(response.codeadminlist),
  });
}

export function* getDelList(payload2) {
  // console.log('saga_delData', payload2);
  const response = yield call(Axios.post, '/api/admin/v1/common/deletecodeadmin', payload2);
  const { code } = response;
  const {
    sNum,
    eNum,
    codeAdminList,
    sortColumn,
    sortDirection,
    keywordType,
    keyword,
  } = payload2;

  if (code === 200) {
    message.success(
      <MessageContent>
        {intlObj.get(messages.delComplete)}
      </MessageContent>,
      3,
    );
    yield put({
      type: constants.GET_CODE_ADMIN_LIST,
      sNum,
      eNum,
      codeAdminList,
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
