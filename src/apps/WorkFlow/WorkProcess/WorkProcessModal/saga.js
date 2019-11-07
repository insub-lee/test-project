import { takeEvery, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as actionTypes from './constants';
import * as actions from './actions';

function* getDeptList({ payload }) {
  const response = yield call(Axios.post, `/api/common/v1/account/deptListByMyDeptId`, {});
  const { list } = response;
  yield put(actions.setDeptList(list));
}

function* getDeptUserList({ deptId }) {
  const response = yield call(Axios.post, `/api/common/v1/account/deptUser/${deptId}`, {});
  const { list } = response;
  yield put(actions.setDeptUserList(list));
}

export default function* watcher() {
  yield takeEvery(actionTypes.GET_DEPT_LIST, getDeptList);
  yield takeEvery(actionTypes.GET_DEPT_USER_LIST, getDeptUserList);
}
