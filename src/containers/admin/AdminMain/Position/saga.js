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

export function* getPstnComboList(payload) {
  const { PSTN_ID } = payload;
  const response = yield call(Axios.get, '/api/common/v1/account/organizationPstnList', {});
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  const selectedDept = PSTN_ID !== 0 ? PSTN_ID : fromJS(response.list[0].PSTN_ID);
  yield put({
    type: actionType.SET_PSTN_COMBO_LIST,
    pstnComboData: fromJS(response.list),
    selectedDept,
  });
  yield put({
    type: actionType.GET_CHANGE_PSTN_DATA,
    PSTN_ID: selectedDept,
  });
}

export function* getPstnTreeData() {
  const response = yield call(Axios.get, '/api/common/v1/account/pstnTree', {});
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_PSTN_DATA,
    pstnTreeData: fromJS(list),
  });
}

export function* getChangePstnTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/pstnChangeTree/${payload.PSTN_ID}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_CHANGE_PSTN_DATA,
    pstnTreeData: fromJS(list),
    selectedDept: payload.PSTN_ID,
  });
}

export function* insertPstn(payload) {
  const { PRNT_ID, selectedDept } = payload.payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/registPosition', payload.payload);
  const { code, pstnId } = response;
  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.pstnInsert)}</MessageContent>, 3);
    const PSTN_ID = PRNT_ID === 0 ? pstnId : selectedDept;
    if (PRNT_ID === 0) {
      yield put({
        type: actionType.GET_PSTN_COMBO_LIST,
        PSTN_ID,
      });
    } else {
      yield put({
        type: actionType.GET_CHANGE_PSTN_DATA,
        PSTN_ID,
      });
    }
    yield put({
      type: actionType.ROOT_SELECTED_INDEX,
      PSTN_ID: pstnId,
    });
  } else {
    feed.error(`${intlObj.get(messages.pstnInsertFail)}`);
    yield put({
      type: actionType.GET_PSTN_COMBO_LIST,
      PSTN_ID: selectedDept,
    });
  }
}

export function* updatePstn(payload) {
  const { selectedDept, PRNT_ID, PSTN_ID } = payload.payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/updatePosition', payload.payload);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.pstnUpdate)}</MessageContent>, 3);
    if (PRNT_ID < 1) {
      yield put({
        type: actionType.GET_PSTN_COMBO_LIST,
        PSTN_ID: selectedDept,
      });
    } else {
      yield put({
        type: actionType.GET_CHANGE_PSTN_DATA,
        PSTN_ID: selectedDept,
      });
    }
    yield put({
      type: actionType.ROOT_SELECTED_INDEX,
      PSTN_ID,
    });
  } else {
    feed.error(`${intlObj.get(messages.pstnUpdateFail)}`);
    yield put({
      type: actionType.GET_PSTN_COMBO_LIST,
      PSTN_ID: selectedDept,
    });
  }
}

export function* deletePstn(payload) {
  const { selectedDept, PRNT_ID } = payload.payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/deletePosition/', payload.payload);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.pstnDelete)}</MessageContent>, 3);
    if (PRNT_ID < 1) {
      yield put({
        type: actionType.GET_PSTN_COMBO_LIST,
        PSTN_ID: 0,
      });
    } else {
      yield put({
        type: actionType.GET_CHANGE_PSTN_DATA,
        PSTN_ID: selectedDept,
      });
    }
  } else if (code === 210) {
    feed.error(`${intlObj.get(messages.pstnDeleteFail1)}`);
  } else {
    feed.error(`${intlObj.get(messages.pstnDeleteFail2)}`);
  }
}

export function* movePosition(payload) {
  const { PRNT_ID, treeData } = payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/movePosition', { PSTN_ID: PRNT_ID, treeData });
  const { code } = response;

  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.pstnUpdate)}</MessageContent>, 3);
    yield put({
      type: actionType.GET_CHANGE_PSTN_DATA,
      PSTN_ID: PRNT_ID,
    });
  } else {
    feed.error(`${intlObj.get(messages.pstnUpdateFail)}`);
  }
}

export default function* positionSaga() {
  yield takeLatest(actionType.GET_PSTN_COMBO_LIST, getPstnComboList);
  yield takeLatest(actionType.GET_PSTN_DATA, getPstnTreeData);
  yield takeLatest(actionType.GET_CHANGE_PSTN_DATA, getChangePstnTreeData);
  yield takeLatest(actionType.INSERT_PSTN, insertPstn);
  yield takeLatest(actionType.UPDATE_PSTN, updatePstn);
  yield takeLatest(actionType.DELETE_PSTN, deletePstn);
  yield takeLatest(actionType.MOVE_PSTN, movePosition);
}
