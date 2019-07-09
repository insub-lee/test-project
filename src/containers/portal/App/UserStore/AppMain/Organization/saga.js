import { takeLatest, put, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { SET_TREE_DATA, GET_TREE_DATA, SET_USERS, GET_USERS, SET_USER, GET_USER } from './constants';

import { Axios } from 'utils/AxiosFunc';

export function* getTreeData() {
  const response = yield call(Axios.get, '/api/portal/v1/account/deptTree', { data: 'temp' });
  const list = JSON.parse(`[${response.result.join('')}]`);

  yield put({ type: SET_TREE_DATA, treeData: fromJS(list) });
}

export function* getUsers(payload) {
  const DEPT_ID = payload.data.node.key;

  const response = yield call(Axios.get, `/api/portal/v1/account/deptUser/${DEPT_ID}`, { data: 'temp' });

  console.log(response);

  yield put({
    type: SET_USERS,
    users: fromJS(response.list),
    selectedIndexes: fromJS([]),
  });
}

export function* getUser(payload) {
  console.log('NAME REQUEST!! - 01', payload.empno);

  const response = yield call(Axios.post, `/api/portal/v1/account/userInfo/${payload.empno}`);

  const data = response;
  console.log('NAME REQUEST!! - 02', data.uuid);
  if (data != null) {
    console.log(data);
    const user = data.data;
    yield put({ type: SET_USER, user });
  } else {
    // yield put({ type: AUTH_REQUEST_ERROR });
  }
}

export default function* rootSaga() {
  yield takeLatest(GET_TREE_DATA, getTreeData);
  yield takeLatest(GET_USERS, getUsers);
  yield takeLatest(GET_USER, getUser);
}
