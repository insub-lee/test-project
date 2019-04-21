import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { intlObj } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import * as constants from './constants';
import { Axios } from '../../../../utils/AxiosFunc';
import messages from './messages';

export function* getVgroupTreeList(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/vgroupAdminTreeList/', payload);
  let tStr = response.vgroupTreeList.join('').replace('}{', '},{');
  if (tStr.length > 0 && (tStr.charAt(tStr.length - 1) !== '}')) {
    tStr = tStr.concat('}');
  }
  const result = fromJS(JSON.parse(`[${tStr}]`));
  // if (result.size > 0) {
  //   yield put({ type: constants.SET_VGROUP_TREE_LIST, result });
  // }
  yield put({ type: constants.SET_VGROUP_TREE_LIST, result });
}

export function* getVgroupComboList() {
  const response = yield call(Axios.get, '/api/common/v1/account/organizationGrpList', { data: 'temp' });
  if (response.list.length > 0) {
    yield put({ type: constants.SET_VGROUP_COMBO_LIST, payload: fromJS(response.list) });
  }
}

export function* getVgroupDtlInfo(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/vgroupAdminDtlInfo/', payload);
  if (response.managerList !== null) {
    yield put({ type: constants.SET_VGROUP_MANAGER_LIST, payload: fromJS(response.managerList) });
  }
  if (response.memberUList.size !== null) {
    yield put({ type: constants.SET_VGROUP_MEMBER_U_LIST, payload: fromJS(response.memberUList) });
  }
  if (response.memberDList.size !== null) {
    yield put({ type: constants.SET_VGROUP_MEMBER_D_LIST, payload: fromJS(response.memberDList) });
  }
}

export function* vgroupInfoInsert(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/vgroupInfoInsert/', payload);
  const { code } = response;
  if (code === 200) {
    message.success(`${intlObj.get(messages.regComplete)}`, 2);
    yield put({ type: constants.GET_VGROUP_TREE_LIST, searchKeyword: '', SITE_ID: payload.SITE_ID });
  } else {
    message.success(`${intlObj.get(messages.regFail)}`, 2);
  }
}

export function* vgroupInfoDelete(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/vgroupInfoDelete/', payload);
  const { code } = response;
  if (code === 200) {
    message.success(`${intlObj.get(messages.delComplete)}`, 2);
    yield put({ type: constants.GET_VGROUP_TREE_LIST, searchKeyword: '', SITE_ID: payload.SITE_ID });
  } else {
    message.success(`${intlObj.get(messages.delFail)}`, 2);
  }
}

export function* vgroupInfoUpdate(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/vgroupInfoUpdate/', payload);
  const { code } = response;
  if (code === 200) {
    message.success(`${intlObj.get(messages.udtComplete)}`, 2);
    yield put({ type: constants.GET_VGROUP_TREE_LIST, searchKeyword: '', SITE_ID: payload.SITE_ID });
  } else {
    message.success(`${intlObj.get(messages.udtFail)}`, 2);
  }
}

export function* vgroupManagerUpdate(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/vgroupUpdateManagerList/', payload);
  const { code } = response;
  if (code === 200) {
    message.success(`${intlObj.get(messages.udtComplete)}`, 2);
  } else {
    message.success(`${intlObj.get(messages.udtFail)}`, 2);
  }
}

export function* vgroupMemberUpdate(payload) {
  const responseM = yield call(Axios.post, '/api/admin/v1/common/vgroupUpdateManagerList/', payload);
  const { codeM } = responseM;
  const response = yield call(Axios.post, '/api/admin/v1/common/vgroupUpdateMemberList/', payload);
  const { code } = response;
  if (codeM === 200 && code === 200) {
    message.success(`${intlObj.get(messages.udtComplete)}`, 2);
  } else {
    message.success(`${intlObj.get(messages.udtFail)}`, 2);
  }
}

export default function* orgSage() {
  yield takeLatest(constants.GET_VGROUP_TREE_LIST, getVgroupTreeList);
  yield takeLatest(constants.GET_VGROUP_COMBO_LIST, getVgroupComboList);
  yield takeLatest(constants.GET_VGROUP_DTL_INFO, getVgroupDtlInfo);
  yield takeLatest(constants.INSERT_VGROUP_INFO, vgroupInfoInsert);
  yield takeLatest(constants.DELETE_VGROUP_INFO, vgroupInfoDelete);
  yield takeLatest(constants.UPDATE_VGROUP_INFO, vgroupInfoUpdate);
  yield takeLatest(constants.UPDATE_VGROUP_MANAGER, vgroupManagerUpdate);
  yield takeLatest(constants.UPDATE_VGROUP_MEMBER, vgroupMemberUpdate);
}
