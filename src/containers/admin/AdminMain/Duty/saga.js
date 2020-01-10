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

export function* getDutyComboList(payload) {
  const { DUTY_ID } = payload;
  const response = yield call(Axios.get, '/api/common/v1/account/organizationDutyList', {});
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  const selectedDept = DUTY_ID !== 0 ? DUTY_ID : fromJS(response.list[0].DUTY_ID);
  yield put({
    type: actionType.SET_DUTY_COMBO_LIST,
    dutyComboData: fromJS(response.list),
    selectedDept,
  });
  yield put({
    type: actionType.GET_CHANGE_DUTY_DATA,
    DUTY_ID: selectedDept,
  });
}

export function* getDutyTreeData() {
  const response = yield call(Axios.get, '/api/common/v1/account/dutyTree', {});
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_DUTY_DATA,
    dutyTreeData: fromJS(list),
  });
}

export function* getChangeDutyTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/dutyChangeTree/${payload.DUTY_ID}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_CHANGE_DUTY_DATA,
    dutyTreeData: fromJS(list),
    selectedDept: payload.DUTY_ID,
  });
}

export function* insertDuty(payload) {
  const { PRNT_ID, selectedDept } = payload.payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/registDuty', payload.payload);
  const { code, dutyId } = response;
  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.dutyInsert)}</MessageContent>, 3);
    const DUTY_ID = PRNT_ID === 0 ? dutyId : selectedDept;
    if (PRNT_ID === 0) {
      yield put({
        type: actionType.GET_DUTY_COMBO_LIST,
        DUTY_ID,
      });
    } else {
      yield put({
        type: actionType.GET_CHANGE_DUTY_DATA,
        DUTY_ID,
      });
    }
    yield put({
      type: actionType.ROOT_SELECTED_INDEX,
      DUTY_ID: dutyId,
    });
  } else {
    feed.error(`${intlObj.get(messages.dutyInsertFail)}`);
    yield put({
      type: actionType.GET_DUTY_COMBO_LIST,
      DUTY_ID: selectedDept,
    });
  }
}

export function* updateDuty(payload) {
  const { selectedDept, PRNT_ID, DUTY_ID } = payload.payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/updateDuty', payload.payload);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.dutyUpdate)}</MessageContent>, 3);
    if (PRNT_ID < 1) {
      yield put({
        type: actionType.GET_DUTY_COMBO_LIST,
        DUTY_ID: selectedDept,
      });
    } else {
      yield put({
        type: actionType.GET_CHANGE_DUTY_DATA,
        DUTY_ID: selectedDept,
      });
    }
    yield put({
      type: actionType.ROOT_SELECTED_INDEX,
      DUTY_ID,
    });
  } else {
    feed.error(`${intlObj.get(messages.dutyUpdateFail)}`);
    yield put({
      type: actionType.GET_DUTY_COMBO_LIST,
      DUTY_ID: selectedDept,
    });
  }
}

export function* deleteDuty(payload) {
  const { selectedDept, PRNT_ID } = payload.payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/deleteDuty/', payload.payload);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.dutyDelete)}</MessageContent>, 3);
    if (PRNT_ID < 1) {
      yield put({
        type: actionType.GET_DUTY_COMBO_LIST,
        DUTY_ID: 0,
      });
    } else {
      yield put({
        type: actionType.GET_CHANGE_DUTY_DATA,
        DUTY_ID: selectedDept,
      });
    }
  } else if (code === 210) {
    feed.error(`${intlObj.get(messages.dutyDeleteFail1)}`);
  } else {
    feed.error(`${intlObj.get(messages.dutyDeleteFail2)}`);
  }
}

export function* moveDuty(payload) {
  const { PRNT_ID, treeData } = payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/moveDuty', { DUTY_ID: PRNT_ID, treeData });
  const { code } = response;

  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.dutyUpdate)}</MessageContent>, 3);
    yield put({
      type: actionType.GET_CHANGE_DUTY_DATA,
      DUTY_ID: PRNT_ID,
    });
  } else {
    feed.error(`${intlObj.get(messages.dutyUpdateFail)}`);
  }
}

export default function* dutySaga() {
  yield takeLatest(actionType.GET_DUTY_COMBO_LIST, getDutyComboList);
  yield takeLatest(actionType.GET_DUTY_DATA, getDutyTreeData);
  yield takeLatest(actionType.GET_CHANGE_DUTY_DATA, getChangeDutyTreeData);
  yield takeLatest(actionType.INSERT_DUTY, insertDuty);
  yield takeLatest(actionType.UPDATE_DUTY, updateDuty);
  yield takeLatest(actionType.DELETE_DUTY, deleteDuty);
  yield takeLatest(actionType.MOVE_DUTY, moveDuty);
}
