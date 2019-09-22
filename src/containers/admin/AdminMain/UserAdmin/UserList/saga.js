import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { Axios } from 'utils/AxiosFunc';

export function* getUserList(payload) {
  const { userList: oldUserList } = payload.payload;
  const param = payload.payload;
  delete param.userList;
  delete param.type;

  const response = yield call(Axios.post, '/api/admin/v1/common/getUserList', param);

  const userList = oldUserList.length > 0 ? oldUserList.concat(response.userList) : response.userList;
  yield put({ type: actionTypes.SET_USER_LIST, payload: userList });
}


export function* getDeptComboData() {
  yield put({
    type: actionTypes.IS_LOADING,
    isLoading: true,
  });
  const response = yield call(Axios.get, '/api/common/v1/account/organizationList', {});
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  const DEPT_ID = fromJS(response.list[0].DEPT_ID);
  yield put({
    type: actionTypes.SET_DEPT_COMBO_LIST,
    deptComboData: fromJS(response.list),
  });
  yield put({
    type: actionTypes.GET_CHANGE_DEPT_DATA,
    DEPT_ID,
  });
}

export function* getChangeDeptTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/deptChangeTree/${payload.DEPT_ID}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionTypes.SET_CHANGE_DEPT_DATA,
    deptTreeData: fromJS(list),
    selectedDept: payload.DEPT_ID,
  });
  yield put({
    type: actionTypes.IS_LOADING,
    isLoading: false,
  });
}

export function* getDutyComboData() {
  yield put({
    type: actionTypes.IS_LOADING,
    isLoading: true,
  });
  const response = yield call(Axios.get, '/api/common/v1/account/organizationDutyList', {});
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  const DUTY_ID = fromJS(response.list[0].DUTY_ID);
  yield put({
    type: actionTypes.SET_DUTY_COMBO_LIST,
    dutyComboData: fromJS(response.list),
  });
  yield put({
    type: actionTypes.GET_CHANGE_DUTY_DATA,
    DUTY_ID,
  });
}

export function* getChangeDutyTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/dutyChangeTree/${payload.DUTY_ID}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionTypes.SET_CHANGE_DUTY_DATA,
    dutyTreeData: fromJS(list),
    selectedDept: payload.DUTY_ID,
  });
  yield put({
    type: actionTypes.IS_LOADING,
    isLoading: false,
  });
}

export function* getPstnComboData() {
  yield put({
    type: actionTypes.IS_LOADING,
    isLoading: true,
  });
  const response = yield call(Axios.get, '/api/common/v1/account/organizationPstnList', {});
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  const PSTN_ID = fromJS(response.list[0].PSTN_ID);
  yield put({
    type: actionTypes.SET_PSTN_COMBO_LIST,
    pstnComboData: fromJS(response.list),
  });
  yield put({
    type: actionTypes.GET_CHANGE_PSTN_DATA,
    PSTN_ID,
  });
}

export function* getChangePstnTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/pstnChangeTree/${payload.PSTN_ID}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionTypes.SET_CHANGE_PSTN_DATA,
    pstnTreeData: fromJS(list),
    selectedDept: payload.PSTN_ID,
  });
  yield put({
    type: actionTypes.IS_LOADING,
    isLoading: false,
  });
}

export function* getRankComboData() {
  yield put({
    type: actionTypes.IS_LOADING,
    isLoading: true,
  });
  const response = yield call(Axios.get, '/api/common/v1/account/organizationRankList', {});
  let data = fromJS(response.list);
  if (data === undefined || data.size === 0) {
    data = fromJS([]);
  }
  const RANK_ID = fromJS(response.list[0].RANK_ID);
  yield put({
    type: actionTypes.SET_RANK_COMBO_LIST,
    rankComboData: fromJS(response.list),
  });
  yield put({
    type: actionTypes.GET_CHANGE_RANK_DATA,
    RANK_ID,
  });
}

export function* getChangeRankTreeData(payload) {
  const response = yield call(Axios.get, `/api/common/v1/account/rankChangeTree/${payload.RANK_ID}`);
  const list = JSON.parse(`[${response.result.join('')}]`);
  yield put({
    type: actionTypes.SET_CHANGE_RANK_DATA,
    rankTreeData: fromJS(list),
    selectedDept: payload.RANK_ID,
  });
  yield put({
    type: actionTypes.IS_LOADING,
    isLoading: false,
  });
}

export default function* UserListSaga() {
  yield takeLatest(actionTypes.GET_USER_LIST, getUserList);
  yield takeLatest(actionTypes.GET_DEPT_COMBO_LIST, getDeptComboData);
  yield takeLatest(actionTypes.GET_CHANGE_DEPT_DATA, getChangeDeptTreeData);
  yield takeLatest(actionTypes.GET_DUTY_COMBO_LIST, getDutyComboData);
  yield takeLatest(actionTypes.GET_CHANGE_DUTY_DATA, getChangeDutyTreeData);
  yield takeLatest(actionTypes.GET_PSTN_COMBO_LIST, getPstnComboData);
  yield takeLatest(actionTypes.GET_CHANGE_PSTN_DATA, getChangePstnTreeData);
  yield takeLatest(actionTypes.GET_RANK_COMBO_LIST, getRankComboData);
  yield takeLatest(actionTypes.GET_CHANGE_RANK_DATA, getChangeRankTreeData);
}
