import { takeLatest, delay, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';

function* getUsers({ payload }) {
  const response = yield call(Axios.post, `/api/common/v1/account/organizationSearch/${payload.PARAM.KEYWORD}`, payload);
  const { list, PARAM } = response;
  const pagination = {
    currentPage: PARAM.PAGE,
    pageSize: PARAM.PAGE_CNT,
  };
  yield put(actions.setUsers(list, pagination.currentPage));
  yield put(actions.setPagination(pagination));
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_USERS, getUsers);
}
