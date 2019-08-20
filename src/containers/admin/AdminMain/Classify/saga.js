import { takeLatest, call, put } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';
import * as actions from './actions';

import * as constantTypes from './constants';

function* getClassifyList({ gubun }) {
  const response = yield call(Axios.get, `/api/admin/v1/common/classifyList?gubun=${gubun}`);
  const { classifyList } = response;
  yield put(actions.setClassifyList(classifyList.map(item => ({ ...item, expanded: item.LVL <= 1, key: item.NODE_ID }))));
}

function* addClassifyInfo({ classifyInfo }) {
  const response = yield call(Axios.post, `/api/admin/v1/common/classify`, classifyInfo);
  const { code } = response;
  if (code === 200) {
    yield put(actions.getClassifyList(classifyInfo.GUBUN));
  }
}

function* updateClassifyInfo({ classifyInfo }) {
  const response = yield call(Axios.put, `/api/admin/v1/common/classify`, classifyInfo);
  const { code } = response;
  if (code === 200) {
    yield put(actions.getClassifyList(classifyInfo.GUBUN));
  }
}

function* deleteClassifyInfo({ classifyInfo }) {
  const response = yield call(Axios.delete, `/api/admin/v1/common/classify`, classifyInfo);
  const { code } = response;
  if (code === 200) {
    yield put(actions.getClassifyList(classifyInfo.GUBUN));
  }
}

function* updateClassifyList({ updateData }) {
  const response = yield call(Axios.post, `/api/admin/v1/common/classifyList`, updateData);
  const { code } = response;
  if (code === 200) {
    yield put(actions.getClassifyList(updateData.parentNode.GUBUN));
  }
}

export default function* watcher() {
  yield takeLatest(constantTypes.GET_CLASSIFY_LIST, getClassifyList);
  yield takeLatest(constantTypes.ADD_CLASSIFY_INFO, addClassifyInfo);
  yield takeLatest(constantTypes.UPDATE_CLASSIFY_INFO, updateClassifyInfo);
  yield takeLatest(constantTypes.DELETE_CLASSIFY_INFO, deleteClassifyInfo);
  yield takeLatest(constantTypes.UPDATE_CLASSIFY_LIST, updateClassifyList);
}
