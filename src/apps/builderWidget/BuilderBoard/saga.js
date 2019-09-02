import { delay } from 'redux-saga';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

function* getView({ widgetId, id }) {
  const response = yield call(Axios.get, `/api/builder/v1/work/taskList/${id}`);
  const { list, fieldList, metaList } = response;
  const columns = fieldList
    .map(({ NAME_KOR, COMP_FIELD }) => ({
      headerName: NAME_KOR,
      field: COMP_FIELD.toUpperCase(),
    }))
    .concat([{ headerName: '등록날짜', field: 'REG_DTTM' }, { headerName: '수정날짜', field: 'UPD_DTTM' }]);
  const boxes = metaList
    .filter(meta => meta.COMP_TYPE === 'BOX')
    .map(box => ({
      ...JSON.parse(box.CONFIG).property,
    }));
  const formStuffs = metaList
    .filter(meta => meta.COMP_TYPE === 'FIELD')
    .map(formStuff => {
      const { property: configProperty } = JSON.parse(formStuff.CONFIG);
      return {
        ...configProperty,
        property: {
          ...configProperty.property,
          maxLength: configProperty.property.maxLength === 0 ? undefined : configProperty.property.maxLength,
        },
      };
    });
  const workFlow = metaList.find(meta => meta.COMP_TYPE === 'WORKFLOW');
  // yield put(actions.successGetView(boxes, formStuffs));
  yield put(actions.successGetView(widgetId, columns, list));
  yield put(actions.successGetFormData(widgetId, boxes, formStuffs, workFlow));
}

function* postData({ widgetId, payload, prcId, processStep }) {
  const workSeq = yield select(selectors.makeSelectWorkSeqByWidgetId(widgetId));
  const taskSeq = yield select(selectors.makeSelectTaskSeqByWidgetId(widgetId));
  const response = yield call(Axios.post, `/api/builder/v1/work/task/${workSeq}/${taskSeq}`, { PARAM: payload });
  if (prcId && processStep && processStep.some(process => !process.STEP_USERS || process.STEP_USERS.length === 0)) {
    window.alert('결재선의 각 단계는 필수값입니다.');
  } else {
    const nextResponse = yield call(Axios.post, '/api/builder/v1/work/taskComplete', {
      PARAM: {
        ...payload,
        TASK_SEQ: taskSeq,
        WORK_SEQ: workSeq,
        prcId,
        processStep,
      },
    });
    yield put(actions.toggleFormModal(widgetId, false));
    yield put(actions.closeEditModal(widgetId));
    yield put(actions.getView(widgetId, workSeq));
  }
}

function* getTaskSeq({ widgetId, workSeq }) {
  // const workSeq = yield select(selectors.makeSelectWorkSeq());
  const response = yield call(Axios.post, `/api/builder/v1/work/taskCreate/${workSeq}`, {});
  const {
    data: { TASK_SEQ },
  } = response;
  yield put(actions.successGetTaskSeq(widgetId, TASK_SEQ));
}

function* getEditData({ widgetId, workSeq, taskSeq }) {
  yield put(actions.enableModalLoading(widgetId, 'modify'));
  yield put(actions.successGetTaskSeq(widgetId, taskSeq));
  const response = yield call(Axios.post, `/api/builder/v1/work/taskEdit/${workSeq}/${taskSeq}`);
  const { data } = response;
  yield put(actions.successGetEditData(widgetId, data));
  yield put(actions.disableModalLoading(widgetId, 'modify'));
}

function* saveTaskContents({ widgetId, data }) {
  const { detail, fieldNm, type, contSeq } = data;
  yield delay(800);
  // const workSeq = yield select(selectors.makeSelectWorkSeq());
  // const taskSeq = yield select(selectors.makeSelectTaskSeq());
  const workSeq = yield select(selectors.makeSelectWorkSeqByWidgetId(widgetId));
  const taskSeq = yield select(selectors.makeSelectTaskSeqByWidgetId(widgetId));
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
  const {
    data: { CONT_SEQ, FIELD_NM },
  } = response;
  yield put(actions.successSaveTaskContents(widgetId, { taskSeq, fieldNm: FIELD_NM, contSeq: CONT_SEQ }));
}

function* deleteTask({ widgetId, workSeq, taskSeq }) {
  const response = yield call(Axios.delete, `/api/builder/v1/work/contents/${workSeq}/${taskSeq}`);
  yield put(actions.toggleFormModal(widgetId, false));
  yield put(actions.closeEditModal(widgetId));
  yield put(actions.getView(widgetId, workSeq));
}

export default function* watcher() {
  yield takeLatest(actionTypes.GET_VIEW, getView);
  yield takeLatest(actionTypes.POST_DATA, postData);
  yield takeLatest(actionTypes.GET_TASK_SEQ, getTaskSeq);
  yield takeLatest(actionTypes.OPEN_EDIT_MODAL, getEditData);
  yield takeLatest(actionTypes.SAVE_TASK_CONTENTS, saveTaskContents);
  yield takeLatest(actionTypes.DELETE_TASK, deleteTask);
}
