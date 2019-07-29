import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { Axios } from 'utils/AxiosFunc';

export function* getUserList(payload) {
  const response = yield call(Axios.post, '/api/admin/v1/common/getUserList', payload.payload);
  const oldUserList = payload.payload.userList;
  const userList = oldUserList.length > 0 ? oldUserList.concat(response.userList) : response.userList;
  yield put({ type: actionTypes.SET_USER_LIST, payload: userList });
}

export default function* UserListSaga() {
  yield takeLatest(actionTypes.GET_USER_LIST, getUserList);
}
