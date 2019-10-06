import { takeLatest, call, put, select } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as actions from './actions';

import * as constantTypes from './constants';

function* getClassifyList() {
  const response = yield call(Axios.get, `/api/manual/v1/classifyList`);
  const { classifyList } = response;
  yield put(actions.setClassifyList(classifyList));
}

function* addClassifyInfo({ classifyInfo }) {
  const response = yield call(Axios.post, `/api/manual/v1/classify`, classifyInfo);
  const { code } = response;
  if (code === 200) {
    yield put(actions.getClassifyList());
  }
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_CLASSIFY_LIST, getClassifyList);
  yield takeLatest(constantTypes.ADD_CLASSIFY_INFO, addClassifyInfo);
}
