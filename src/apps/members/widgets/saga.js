import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constants from './constants';
import * as constantsCommon from '../../../containers/common/constants';

export function* loadingMembers() {
  const data = yield call(Axios.post, '/api/portal/v1/page/loadingMembers/');

  yield put({
    type: constants.LOADING_MEMBERS,
    members: data.list,
  });
}

export function* loadingSettingMembers() {
  const data = yield call(Axios.post, '/api/portal/v1/page/loadingSettingMembers/');

  yield put({
    type: constants.LOADING_SETTING_MEMBERS,
    userSetMembers: data.list,
  });
}

export function* saveSettingMembers(payload) {
  const {
    srchUserIdArr,
    userSetMembers,
  } = payload;

  let data = yield call(Axios.post, '/api/portal/v1/page/removeMember/', { srchUserIdArr: srchUserIdArr });

  let result = data.result;
  if (result === 'success') {
    data = yield call(Axios.post, '/api/portal/v1/page/saveSettingMembers/', { userSetMembers: userSetMembers });

    result = data.result;

    if (result === 'success') {
      const loadingMembersData = yield call(Axios.post, '/api/portal/v1/page/loadingMembers/');

      yield put({
        type: constants.LOADING_MEMBERS,
        members: loadingMembersData.list,
      });
      
      const loadingSettingMembersData = yield call(Axios.post, '/api/portal/v1/page/loadingSettingMembers/');

      yield put({
        type: constants.LOADING_SETTING_MEMBERS,
        userSetMembers: loadingSettingMembersData.list,
      });
    } else {
      // ?
    }
  } else {
    // ?
  }
}

export function* addMember(payload) {
  const {
    users,
    item,
  } = payload;

  let data = yield call(Axios.post, '/api/portal/v1/page/addMember/', { users, item });

  const result = data.result;

  if (result === 'success') {
    // data = yield call(Axios.post, '/api/portal/v1/page/loadingMembers/');
  
    // yield put({
    //   type: constants.LOADING_MEMBERS,
    //   members: data.list,
    // });
  }
}

export function* deleteMember(payload) {
  const {
    user,
    item,
  } = payload;

  let data = yield call(Axios.post, '/api/portal/v1/page/deleteMember/', { user, item });

  const result = data.result;

  if (result === 'success') {
    // data = yield call(Axios.post, '/api/portal/v1/page/loadingMembers/');
  
    // yield put({
    //   type: constants.LOADING_MEMBERS,
    //   members: data.list,
    // });
  }
}

export function* dndChangePositionMember(payload) {
  const {
    users,
    item,
  } = payload;

  let data = yield call(Axios.post, '/api/portal/v1/page/dndChangePositionMember/', { users, item });

  const result = data.result;

  if (result === 'success') {
    // data = yield call(Axios.post, '/api/portal/v1/page/loadingMembers/');
  
    // yield put({
    //   type: constants.LOADING_MEMBERS,
    //   members: data.list,
    // });
  }
}

export function* deleteAllMember(payload) {
  const {
    item,
  } = payload;
  let data = yield call(Axios.post, '/api/portal/v1/page/deleteAllMember/', { item });

  if (data.result === 'success') {
    // data = yield call(Axios.post, '/api/portal/v1/page/loadingMembers/');

    // yield put({
    //   type: constants.DELETE_ALL_MEMBER,
    // });
  
    // yield put({
    //   type: constants.LOADING_MEMBERS,
    //   members: data.list,
    // });
  }
}

export function* resetWidget() {
  const data = yield call(Axios.post, '/api/portal/v1/page/loadingMembers/');

  yield put({
    type: constants.LOADING_MEMBERS,
    members: data.list,
  });
}

export default function* membersSaga() {
  yield takeLatest(constants.LOADING_MEMBERS_SAGA, loadingMembers);
  yield takeLatest(constants.LOADING_SETTING_MEMBERS_SAGA, loadingSettingMembers);
  yield takeLatest(constants.SAVE_SETTING_MEMBERS_SAGA, saveSettingMembers);
  yield takeLatest(constants.ADD_MEMBER, addMember);
  yield takeLatest(constants.DELETE_MEMBER, deleteMember);
  yield takeLatest(constants.DND_CHANGE_POSITION_MEMBER, dndChangePositionMember);
  yield takeLatest(constants.DELETE_ALL_MEMBER_SAGA, deleteAllMember);
  yield takeLatest(constantsCommon.RESET_MYMENU_WIDGET, resetWidget);
}
