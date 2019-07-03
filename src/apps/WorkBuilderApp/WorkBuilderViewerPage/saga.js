import { takeLatest, call, put, select } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

function* getView({ id }) {
  const response = yield call(Axios.get, `/api/builder/v1/work/taskList/${id}`);
  const { list, fieldList, metaList } = response;
  const columns = fieldList.map(({ NAME_KOR, COMP_FIELD }) => ({
    headerName: NAME_KOR,
    field: COMP_FIELD.toUpperCase(),
  }));
  // console.debug('...dummyReponse', dummyResponse);
  // const { metas } = dummyResponse;
  // This Part is Temporary
  // let formStuffs = [];
  const boxes = metaList.filter(meta => meta.COMP_TYPE === 'BOX').map(box => ({
    ...JSON.parse(box.CONFIG).property,
  }));
  const formStuffs = metaList.filter(meta => meta.COMP_TYPE !== 'BOX').map(formStuff => ({
    ...JSON.parse(formStuff.CONFIG).property,
  }));
  // yield put(actions.successGetView(boxes, formStuffs));

  console.debug(list, columns);
  yield put(actions.successGetView(columns, list));
  yield put(actions.successGetFormData(boxes, formStuffs));
}

function* postData({ payload }) {
  const workSeq = yield select(selectors.makeSelectWorkSeq());
  const taskSeq = yield select(selectors.makeSelectTaskSeq());
  const response = yield call(Axios.post, `/api/builder/v1/work/task/${workSeq}/${taskSeq}`, { PARAM: payload });
  console.debug('@Temp', response);
  const nextResponse = yield call(Axios.post, '/api/builder/v1/work/taskComplete', { PARAM: { TASK_SEQ: taskSeq, WORK_SEQ: workSeq } });
  console.debug('@Complete', nextResponse);
  yield put(actions.toggleFormModal(false));
  yield put(actions.closeEditModal());
  yield put(actions.getView(workSeq));
}

function* getTaskSeq() {
  const workSeq = yield select(selectors.makeSelectWorkSeq());
  const response = yield call(Axios.post, `/api/builder/v1/work/taskCreate/${workSeq}`, { });
  const { data: { TASK_SEQ } } = response;
  yield put(actions.successGetTaskSeq(TASK_SEQ));
}

function* getEditData({ workSeq, taskSeq }) {
  yield put(actions.successGetTaskSeq(taskSeq));
  const response = yield call(Axios.post, `/api/builder/v1/work/taskEdit/${workSeq}/${taskSeq}`);
  const { data } = response;
  yield put(actions.successGetEditData(data));
  console.debug(data);
}

export default function* watcher() {
  yield takeLatest(actionTypes.GET_VIEW, getView);
  yield takeLatest(actionTypes.POST_DATA, postData);
  yield takeLatest(actionTypes.GET_TASK_SEQ, getTaskSeq);
  yield takeLatest(actionTypes.OPEN_EDIT_MODAL, getEditData);
}
