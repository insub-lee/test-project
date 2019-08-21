import React from 'react';
import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { intlObj } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import * as feed from 'components/Feedback/functions';
import * as actionType from './constants';
import { Axios } from '../../../../utils/AxiosFunc';
import messages from './messages';

export function* getRankComboList(payload) {
  const { RANK_ID } = payload;
  const response = yield call(Axios.get, '/api/common/v1/account/organizationRankList', {});
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  const selectedDept = RANK_ID !== 0 ? RANK_ID : fromJS(response.list[0].RANK_ID);
  yield put({
    type: actionType.SET_RANK_COMBO_LIST,
    rankComboData: fromJS(response.list),
    selectedDept,
  });
  yield put({
    type: actionType.GET_CHANGE_RANK_DATA,
    RANK_ID: selectedDept,
  });
}

export function* getRankTreeData() {
  const response = yield call(Axios.get, '/api/common/v1/account/rankTree', {});
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_RANK_DATA,
    rankTreeData: fromJS(list),
  });
}

export function* getChangeRankTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/rankChangeTree/${payload.RANK_ID}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_CHANGE_RANK_DATA,
    rankTreeData: fromJS(list),
    selectedDept: payload.RANK_ID,
  });
}

export function* insertRank(payload) {
  const { PRNT_ID, selectedDept } = payload.payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/registRank', payload.payload);
  const { code, rankId } = response;
  if (code === 200) {
    message.success(
      <MessageContent>
        {intlObj.get(messages.rankInsert)}
      </MessageContent>,
      3,
    );
    const RANK_ID = PRNT_ID === 0 ? rankId : selectedDept;
    if (PRNT_ID === 0) {
      yield put({
        type: actionType.GET_RANK_COMBO_LIST,
        RANK_ID,
      });
    } else {
      yield put({
        type: actionType.GET_CHANGE_RANK_DATA,
        RANK_ID,
      });
    }
    yield put({
      type: actionType.ROOT_SELECTED_INDEX,
      RANK_ID: rankId,
    });
  } else {
    feed.error(`${intlObj.get(messages.rankInsertFail)}`);
    yield put({
      type: actionType.GET_RANK_COMBO_LIST,
      RANK_ID: selectedDept,
    });
  }
}

export function* updateRank(payload) {
  const { selectedDept, PRNT_ID, RANK_ID } = payload.payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/updateRank', payload.payload);
  const { code } = response;
  if (code === 200) {
    message.success(
      <MessageContent>
        {intlObj.get(messages.rankUpdate)}
      </MessageContent>,
      3,
    );
    if (PRNT_ID < 1) {
      yield put({
        type: actionType.GET_RANK_COMBO_LIST,
        RANK_ID: selectedDept,
      });
    } else {
      yield put({
        type: actionType.GET_CHANGE_RANK_DATA,
        RANK_ID: selectedDept,
      });
    }
    yield put({
      type: actionType.ROOT_SELECTED_INDEX,
      RANK_ID,
    });
  } else {
    feed.error(`${intlObj.get(messages.rankUpdateFail)}`);
    yield put({
      type: actionType.GET_RANK_COMBO_LIST,
      RANK_ID: selectedDept,
    });
  }
}

export function* deleteRank(payload) {
  const { selectedDept, PRNT_ID } = payload.payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/deleteRank/', payload.payload);
  const { code } = response;
  if (code === 200) {
    message.success(
      <MessageContent>
        {intlObj.get(messages.rankDelete)}
      </MessageContent>,
      3,
    );
    if (PRNT_ID < 1) {
      yield put({
        type: actionType.GET_RANK_COMBO_LIST,
        RANK_ID: 0,
      });
    } else {
      yield put({
        type: actionType.GET_CHANGE_RANK_DATA,
        RANK_ID: selectedDept,
      });
    }
  } else if (code === 210) {
    feed.error(`${intlObj.get(messages.rankDeleteFail1)}`);
  } else {
    feed.error(`${intlObj.get(messages.rankDeleteFail2)}`);
  }
}


export function* moveRank(payload) {
  const { PRNT_ID, treeData } = payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/moveRank', { RANK_ID: PRNT_ID, treeData });
  const { code } = response;

  if (code === 200) {
    message.success(
      <MessageContent>
        {intlObj.get(messages.rankUpdate)}
      </MessageContent>,
      3,
    );
    yield put({
      type: actionType.GET_CHANGE_RANK_DATA,
      RANK_ID: PRNT_ID,
    });
  } else {
    feed.error(`${intlObj.get(messages.rankUpdateFail)}`);
  }
}

export default function* positionSaga() {
  yield takeLatest(actionType.GET_RANK_COMBO_LIST, getRankComboList);
  yield takeLatest(actionType.GET_RANK_DATA, getRankTreeData);
  yield takeLatest(actionType.GET_CHANGE_RANK_DATA, getChangeRankTreeData);
  yield takeLatest(actionType.INSERT_RANK, insertRank);
  yield takeLatest(actionType.UPDATE_RANK, updateRank);
  yield takeLatest(actionType.DELETE_RANK, deleteRank);
  yield takeLatest(actionType.MOVE_RANK, moveRank);
}
