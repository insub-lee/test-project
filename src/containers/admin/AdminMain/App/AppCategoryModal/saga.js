import React from 'react';
import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as feed from 'components/Feedback/functions';

import { intlObj } from 'utils/commonUtils';
import messages from '../messages';

import { Axios } from '../../../../../utils/AxiosFunc';
import * as constants from './constants';

// 시스템 앱 (SITE_ID -1) 고정
export function* getTreeData() {
  const params = { SITE_ID: -1 };
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/myappcategory/', params);
  const result = fromJS(JSON.parse(`[${response.result.join('')}]`));
  const { rootSelectedIndex } = response;
  if (result.size > 0) {
    // const categoryData = result.get(0).get('children');
    const categoryData = result;

    yield put({ type: constants.SET_CATEGORY_DATA, categoryData });
    yield put({ type: constants.ROOT_SELECTED_INDEX, payload: rootSelectedIndex });
  }
}

export function* cateinsert(payload) {
  const params = { ...payload.payload, SITE_ID: -1 };
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/regiscategory/', params);
  const { code } = response;
  if (code === 200) {
    message.success(
      <MessageContent>
        {intlObj.get(messages.cateInsert)}
      </MessageContent>,
      3,
    );
    yield put({
      type: constants.INIT_CATEGORY_DATA,
    });
  } else {
    feed.error(`${intlObj.get(messages.cateInsertFail)}`);
  }
}

export function* cateUpdate(payload) {
  const params = { ...payload.payload, SITE_ID: -1 };
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/updatecategory/', params);
  const { code } = response;
  if (code === 200) {
    message.success(
      <MessageContent>
        {intlObj.get(messages.cateUpdate)}
      </MessageContent>,
      3,
    );
    yield put({
      type: constants.INIT_CATEGORY_DATA,
    });
  } else {
    feed.error(`${intlObj.get(messages.cateUpdateFail)}`);
  }
}

export function* cateDelete(payload) {
  const params = { ...payload.payload, SITE_ID: -1 };
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/deletecategory/', params);
  const { code } = response;
  if (code === 200) {
    message.success(
      <MessageContent>
        {intlObj.get(messages.cateDelete)}
      </MessageContent>,
      3,
    );
    yield put({
      type: constants.INIT_CATEGORY_DATA,
    });
  } else if (code === 210) {
    feed.error(`${intlObj.get(messages.cateDeleteFail1)}`);
  } else {
    feed.error(`${intlObj.get(messages.cateDeleteFail2)}`);
  }
}


export function* moveMymenu(payload) {
  const { treeData } = payload;
  const params = { treeData, SITE_ID: -1 };
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/movemyappcategory', params);
  const { code } = response;

  if (code === 200) {
    message.success(
      <MessageContent>
        {intlObj.get(messages.cateUpdate)}
      </MessageContent>,
      3,
    );
    yield put({
      type: constants.INIT_CATEGORY_DATA,
    });
  } else {
    feed.error(`${intlObj.get(messages.cateInsertFail)}`);
  }
}

export default function* rootSaga() {
  yield takeLatest(constants.INIT_CATEGORY_DATA, getTreeData);
  yield takeLatest(constants.INSERT_CATE, cateinsert);
  yield takeLatest(constants.UPDATE_CATE, cateUpdate);
  yield takeLatest(constants.DELETE_CATE, cateDelete);
  yield takeLatest(constants.MOVE_MYMENU, moveMymenu);
}
