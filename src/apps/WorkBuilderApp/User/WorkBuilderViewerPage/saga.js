import { delay } from 'redux-saga';
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
  const formStuffs = metaList.filter(meta => meta.COMP_TYPE === 'FIELD').map(formStuff => ({
    ...JSON.parse(formStuff.CONFIG).property,
  }));
  const workFlow = metaList.find(meta => meta.COMP_TYPE === 'WORKFLOW');
  // yield put(actions.successGetView(boxes, formStuffs));

  console.debug(list, columns);
  yield put(actions.successGetView(columns, list));
  yield put(actions.successGetFormData(boxes, formStuffs, workFlow));
}

function* postData({ payload, prcId, processStep }) {
  const workSeq = yield select(selectors.makeSelectWorkSeq());
  const taskSeq = yield select(selectors.makeSelectTaskSeq());
  console.debug('@@ PARAM', JSON.stringify(payload));
  const response = yield call(Axios.post, `/api/builder/v1/work/task/${workSeq}/${taskSeq}`, { PARAM: payload });
  console.debug('@Temp', response);
  if (prcId && processStep && processStep.some(process => !process.STEP_USERS || process.STEP_USERS.length === 0)) {
    window.alert('결재선의 각 단계는 필수값입니다.');
  } else {
    const nextResponse = yield call(Axios.post, '/api/builder/v1/work/taskComplete', {
      PARAM: {
        TASK_SEQ: taskSeq, WORK_SEQ: workSeq, prcId, processStep,
      },
    });
    console.debug('@Complete', nextResponse);
    yield put(actions.toggleFormModal(false));
    yield put(actions.closeEditModal());
    yield put(actions.getView(workSeq));
  }
}

function* getTaskSeq() {
  const workSeq = yield select(selectors.makeSelectWorkSeq());
  const response = yield call(Axios.post, `/api/builder/v1/work/taskCreate/${workSeq}`, { });
  const { data: { TASK_SEQ } } = response;
  yield put(actions.successGetTaskSeq(TASK_SEQ));
}

function* getEditData({ workSeq, taskSeq }) {
  yield put(actions.enableModalLoading('modify'));
  yield put(actions.successGetTaskSeq(taskSeq));
  const response = yield call(Axios.post, `/api/builder/v1/work/taskEdit/${workSeq}/${taskSeq}`);
  const { data } = response;
  yield put(actions.successGetEditData(data));
  yield put(actions.disableModalLoading('modify'));
}

function* saveTaskContents({ data }) {
  const {
    detail,
    fieldNm,
    type,
    contSeq,
  } = data;
  yield delay(800);
  const workSeq = yield select(selectors.makeSelectWorkSeq());
  const taskSeq = yield select(selectors.makeSelectTaskSeq());
  const payload = {
    // CONT_SEQ: ,
    WORK_SEQ: workSeq,
    TASK_SEQ: taskSeq,
    CONT_SEQ: contSeq,
    FIELD_NM: fieldNm,
    ORD: 0,
    TYPE: type,
    DETAIL: detail,
  };
  const response = yield call(Axios.post, `/api/builder/v1/work/contents/${workSeq}/${taskSeq}`, { PARAM: payload });
  const { data: { CONT_SEQ, FIELD_NM } } = response;
  yield put(actions.successSaveTaskContents({ taskSeq, fieldNm: FIELD_NM, contSeq: CONT_SEQ }));
}

export default function* watcher() {
  yield takeLatest(actionTypes.GET_VIEW, getView);
  yield takeLatest(actionTypes.POST_DATA, postData);
  yield takeLatest(actionTypes.GET_TASK_SEQ, getTaskSeq);
  yield takeLatest(actionTypes.OPEN_EDIT_MODAL, getEditData);
  yield takeLatest(actionTypes.SAVE_TASK_CONTENTS, saveTaskContents);
}
