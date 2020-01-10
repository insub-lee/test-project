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

export function* getDeptComboList(payload) {
  const { DEPT_ID } = payload;
  const response = yield call(Axios.get, '/api/common/v1/account/organizationList', {});
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  const selectedDept = DEPT_ID !== 0 ? DEPT_ID : fromJS(response.list[0].DEPT_ID);
  yield put({
    type: actionType.SET_DEPT_COMBO_LIST,
    deptComboData: fromJS(response.list),
    selectedDept,
  });
  yield put({
    type: actionType.GET_CHANGE_DEPT_DATA,
    DEPT_ID: selectedDept,
  });
}

export function* getDeptTreeData() {
  const response = yield call(Axios.get, '/api/common/v1/account/deptTree', {});
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionType.SET_DEPT_DATA,
    deptTreeData: fromJS(list),
  });
}

export function* getChangeDeptTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/deptChangeTree/${payload.DEPT_ID}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  const selectedDept = payload.selectedDept ? payload.selectedDept : payload.DEPT_ID;
  yield put({
    type: actionType.SET_CHANGE_DEPT_DATA,
    deptTreeData: fromJS(list),
    selectedDept,
  });
}

export function* insertDept(payload) {
  const { PRNT_ID, selectedDept } = payload.payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/registDept', payload.payload);
  const { code, deptId } = response;
  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.deptInsert)}</MessageContent>, 3);
    const DEPT_ID = PRNT_ID === 0 ? deptId : selectedDept;
    if (PRNT_ID === 0) {
      yield put({
        type: actionType.GET_DEPT_COMBO_LIST,
        DEPT_ID,
      });
    } else {
      yield put({
        type: actionType.GET_CHANGE_DEPT_DATA,
        DEPT_ID,
      });
    }
    yield put({
      type: actionType.ROOT_SELECTED_INDEX,
      DEPT_ID: deptId,
    });
  } else {
    feed.error(`${intlObj.get(messages.deptInsertFail)}`);
    yield put({
      type: actionType.GET_DEPT_COMBO_LIST,
      DEPT_ID: selectedDept,
    });
  }
}

export function* updateDept(payload) {
  const { selectedDept, PRNT_ID, DEPT_ID } = payload.payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/updateDept', payload.payload);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.deptUpdate)}</MessageContent>, 3);
    if (PRNT_ID < 1) {
      yield put({
        type: actionType.GET_DEPT_COMBO_LIST,
        DEPT_ID: selectedDept,
      });
    } else {
      yield put({
        type: actionType.GET_CHANGE_DEPT_DATA,
        DEPT_ID: selectedDept,
      });
    }
    yield put({
      type: actionType.ROOT_SELECTED_INDEX,
      DEPT_ID,
    });
  } else {
    feed.error(`${intlObj.get(messages.deptUpdateFail)}`);
    yield put({
      type: actionType.GET_DEPT_COMBO_LIST,
      DEPT_ID: selectedDept,
    });
  }
}

export function* deleteDept(payload) {
  const { selectedDept, PRNT_ID } = payload.payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/deleteDept/', payload.payload);
  const { code } = response;
  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.deptDelete)}</MessageContent>, 3);
    if (PRNT_ID < 1) {
      yield put({
        type: actionType.GET_DEPT_COMBO_LIST,
        DEPT_ID: 0,
      });
    } else {
      yield put({
        type: actionType.GET_CHANGE_DEPT_DATA,
        DEPT_ID: selectedDept,
      });
    }
  } else if (code === 210) {
    feed.error(`${intlObj.get(messages.deptDeleteFail1)}`);
  } else {
    feed.error(`${intlObj.get(messages.deptDeleteFail2)}`);
  }
}

export function* moveDept(payload) {
  const { PRNT_ID, treeData } = payload;
  const response = yield call(Axios.post, '/api/admin/v1/common/moveDept', { DEPT_ID: PRNT_ID, treeData });
  const { code } = response;

  if (code === 200) {
    message.success(<MessageContent>{intlObj.get(messages.deptUpdate)}</MessageContent>, 3);
    yield put({
      type: actionType.GET_CHANGE_DEPT_DATA,
      DEPT_ID: PRNT_ID,
    });
  } else {
    feed.error(`${intlObj.get(messages.deptUpdateFail)}`);
  }
}

export default function* deptSaga() {
  yield takeLatest(actionType.GET_DEPT_COMBO_LIST, getDeptComboList);
  yield takeLatest(actionType.GET_DEPT_DATA, getDeptTreeData);
  yield takeLatest(actionType.GET_CHANGE_DEPT_DATA, getChangeDeptTreeData);
  yield takeLatest(actionType.INSERT_DEPT, insertDept);
  yield takeLatest(actionType.UPDATE_DEPT, updateDept);
  yield takeLatest(actionType.DELETE_DEPT, deleteDept);
  yield takeLatest(actionType.MOVE_DEPT, moveDept);
}
