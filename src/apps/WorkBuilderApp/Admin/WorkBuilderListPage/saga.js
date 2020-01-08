import { takeLatest, put, call } from 'redux-saga/effects';
import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as actions from './actions';

// import { dummyFormBuilderList } from './dummyData';

function* postWorkBuilder({ payload }) {
  // Todo - add POST API
  console.debug('actionTypes.POST_WORK_BUILDER', { PARAM: payload });
  const response = yield call(Axios.post, '/api/builder/v1/work/main', { PARAM: payload });
  console.debug('# post', response);
  yield put(actions.toggleModalVisible({ key: 'formModal', status: false }));
  yield put(actions.getList());
}

function* getWorkBuilderList() {
  // Todo - add GET API
  const response = yield call(Axios.get, '/api/builder/v1/work/main');
  const { list } = response;
  // console.debug(response);
  yield put(actions.successGetList(list));
}

function* removeWorkBuilder({rowData}) {
  const response = yield call(Axios.delete, `/api/builder/v1/work/main?WORK_SEQ=${rowData.WORK_SEQ}`);
  const { list } = response;
  console.debug(response);
  yield put(actions.successGetList(list));
}

export default function* watcher() {
  yield takeLatest(actionTypes.GET_LIST, getWorkBuilderList);
  yield takeLatest(actionTypes.POST_WORK_BUILDER, postWorkBuilder);
  yield takeLatest(actionTypes.REMOVE_WORK_BUILDER_SAGA, removeWorkBuilder)
}
