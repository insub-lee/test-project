import React from 'react';
import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { intlObj } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as feed from 'components/Feedback/functions';
import * as constants from './constants';
import { Axios } from '../../../../utils/AxiosFunc';
import messages from './messages';

export function* getCategoryComboList() {
  const response = yield call(Axios.get, '/api/common/v1/account/organizationGrpList', { data: 'temp' });
  if (response.list.length > 0) {
    yield put({ type: constants.SET_CATEGORY_COMBO_LIST, payload: fromJS(response.list) });
  }
}

export function* getTreeData(payload) {
  const response = yield call(Axios.post, '/api/bizstore/v1/appmanage/myappcategory/', payload.payload);
  const result = fromJS(JSON.parse(`[${response.result.join('')}]`));
  // const { rootSelectedIndex } = response;
  if (result.size > 0) {
    // const categoryData = result.get(0).get('children');
    const categoryData = result;

    yield put({ type: constants.SET_CATEGORY_DATA, categoryData });
    // yield put({ type: constants.ROOT_SELECTED_INDEX, payload: rootSelectedIndex });
  }
}

export function* cateinsert(payload) {
  const PARAM = { SITE_ID: payload.payload.SITE_ID, IS_INIT: 'REG', PRNT_ID: payload.payload.PRNT_ID };
  const response = yield call(Axios.post, '/api/admin/v1/common/regiscategory/', payload.payload);
  const { code, catgId } = response;
  if (code === 200) {
    message.success(
      <MessageContent>
        {intlObj.get(messages.cateInsert)}
      </MessageContent>,
      3,
    );
    yield put({
      type: constants.INIT_CATEGORY_DATA,
      payload: PARAM,
    });
    yield put({
      type: constants.ROOT_SELECTED_INDEX,
      payload: catgId,
    });
  } else {
    feed.error(`${intlObj.get(messages.cateInsertFail)}`);
  }
}

export function* cateUpdate(payload) {
  // const SITE_ID = { SITE_ID: payload.payload.SITE_ID };
  const PARAM = { SITE_ID: payload.payload.SITE_ID, IS_INIT: 'UPDATE', CATG_ID: payload.payload.CATG_ID };
  const response = yield call(Axios.post, '/api/admin/v1/common/updatecategory/', payload.payload);
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
      // payload: SITE_ID,
      payload: PARAM,
    });
  } else {
    feed.error(`${intlObj.get(messages.cateUpdateFail)}`);
  }
}

export function* cateDelete(payload) {
  const SITE_ID = { SITE_ID: payload.payload.SITE_ID };
  const response = yield call(Axios.post, '/api/admin/v1/common/deletecategory/', payload.payload);
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
      payload: SITE_ID,
    });
  } else if (code === 210) {
    feed.error(`${intlObj.get(messages.cateDeleteFail1)}`);
  } else {
    feed.error(`${intlObj.get(messages.cateDeleteFail2)}`);
  }
}


export function* moveMymenu(payload) {
  const { SITE_ID, treeData } = payload;
  const siteId = { SITE_ID: payload.SITE_ID };
  const response = yield call(Axios.post, '/api/admin/v1/common/movemyappcategory', { SITE_ID, treeData });
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
      payload: siteId,
    });
  } else {
    feed.error(`${intlObj.get(messages.cateInsertFail)}`);
  }
}

export default function* categorySaga() {
  yield takeLatest(constants.GET_CATEGORY_COMBO_LIST, getCategoryComboList);
  yield takeLatest(constants.INIT_CATEGORY_DATA, getTreeData);
  yield takeLatest(constants.INSERT_CATE, cateinsert);
  yield takeLatest(constants.UPDATE_CATE, cateUpdate);
  yield takeLatest(constants.DELETE_CATE, cateDelete);
  yield takeLatest(constants.MOVE_MYMENU, moveMymenu);
}
