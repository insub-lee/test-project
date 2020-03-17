import { takeEvery, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as actionTypes from './constants';
import * as actions from './actions';

function* getDeptList({ callbackFunc }) {
  const response = yield call(Axios.post, `/api/common/v1/account/deptListByMyDeptId`, {});
  const { list } = response;

  if (typeof callbackFunc === 'function') {
    callbackFunc(list);
  }
}

function* getDeptUserList({ deptId, callbackFunc }) {
  // const response = yield call(Axios.get, `/api/common/v1/account/deptUserIncludeAllRestVerticle/${deptId}`, {});
  const response = yield call(Axios.post, `/api/common/v1/account/deptUser/${deptId}`, {});
  const { list } = response;

  if (typeof callbackFunc === 'function') {
    callbackFunc(list);
  }
}

function* submitHandlerBySaga({ id, httpMethod, apiUrl, submitData, callbackFunc }) {
  let httpMethodInfo = Axios.put;
  switch (httpMethod.toUpperCase()) {
    case 'POST':
      httpMethodInfo = Axios.post;
      break;
    case 'PUT':
      httpMethodInfo = Axios.put;
      break;
    case 'DELETE':
      httpMethodInfo = Axios.delete;
      break;
    default:
      httpMethodInfo = Axios.get;
      break;
  }
  const response = yield call(httpMethodInfo, apiUrl, submitData);
  if (typeof callbackFunc === 'function') {
    callbackFunc(id, response);
  }
}

export default function* watcher() {
  yield takeEvery(actionTypes.PUBLIC_ACTIONMETHOD_SAGA, submitHandlerBySaga);
  yield takeEvery(actionTypes.GET_DEPT_LIST, getDeptList);
  yield takeEvery(actionTypes.GET_DEPT_USER_LIST, getDeptUserList);
}
