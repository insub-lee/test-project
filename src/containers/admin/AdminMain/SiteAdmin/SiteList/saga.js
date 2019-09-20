import React from 'react';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { intlObj } from 'utils/commonUtils';
import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
// import * as feed from 'components/Feedback/functions';
// import { intlObj } from 'utils/commonUtils';
import messages from '../messages';

import * as constants from './constants';
import { Axios } from '../../../../../utils/AxiosFunc';

export function* getList(payload) {
  // const { pageingNum, pageingStandard } = payload.payload;
  const { siteList: prevList } = payload;
  const param = payload;
  delete param.siteList;
  delete param.type;


  const response = yield call(Axios.post, '/api/admin/v1/common/siteadminlist', payload);
  const siteList = prevList.length > 0 ? prevList.concat(response.siteList) : response.siteList;

  if (response.siteList !== null) {
    yield put({
      type: constants.SET_SITE_LIST,
      payload: fromJS(siteList),
    });
  } else {
    yield put({
      type: constants.SET_SITE_LIST,
      payload: fromJS([]),
    });
  }
}

export function* delRow(payload) {
  // const { history } = payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/deletesite', payload);
  const { sNum, eNum, sortColumn, sortDirection, keywordType, keyword } = payload;

  if (response.code === 200) {
    // 성공
    message.success(
      <MessageContent>
        {intlObj.get(messages.delComplete)}
      </MessageContent>,
      3,
    );
    yield put({
      type: constants.GET_SITE_LIST,
      sNum,
      eNum,
      sortColumn,
      sortDirection,
      keywordType,
      keyword,
      siteList: [],
    });
  }
}

export default function* orgSage() {
  yield takeLatest(constants.GET_SITE_LIST, getList);
  yield takeLatest(constants.GET_DEL_ROW, delRow);
}
