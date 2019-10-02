import { takeEvery, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as constantTypes from './constants';
import * as actions from './actions';

function* getNotifyList() {
  const response = yield call(Axios.post, `/api/common/v1/account/loadAllAlarm`);
  const { list } = response;
  yield put(actions.setNotifyList(list));
}

export default function* watcher() {
  yield takeEvery(constantTypes.GET_NOTIFY_LIST, getNotifyList);
}
