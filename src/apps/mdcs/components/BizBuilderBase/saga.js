import { takeEvery, call, put, select } from 'redux-saga/effects';

import { Axios } from 'utils/AxiosFunc';

import * as actionTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

function* getBuilderData({ id, workSeq, taskSeq }) {
  const response = yield call(Axios.get, `/api/builder/v1/work/taskList/${workSeq}`);
  const { metaList } = response;
  const workFlow = metaList.find(meta => meta.COMP_TYPE === 'WORKFLOW');

  yield put(actions.setBuilderData(id, response, metaList, workFlow));
  if (taskSeq === -1) {
    yield put(actions.initFormData(id, workSeq, metaList));
  }
}

function* getExtraApiData({ id, apiArr }) {
  if (apiArr && apiArr.length > 0) {
    for (let i = 0; i < apiArr.length; i += 1) {
      let response = {};
      const apiInfo = apiArr[i];
      if (apiInfo && apiInfo.url && apiInfo.url !== '') {
        if (apiInfo.type === 'GET') {
          response = yield call(Axios.get, apiInfo.url);
        } else if (apiInfo.type === 'POST') {
          response = yield call(Axios.post, apiInfo.url, apiInfo.params);
        }
      }
      yield put(actions.setExtraApiData(id, apiInfo.key, response));
    }
  }
}

function* getDetailData({ id, workSeq, taskSeq }) {
  const response = yield call(Axios.post, `/api/builder/v1/work/taskEdit/${workSeq}/${taskSeq}`);
  yield put(actions.setDetailData(id, response.data));
}

function* getTaskSeq({ id, workSeq }) {
  const response = yield call(Axios.post, `/api/builder/v1/work/taskCreate/${workSeq}`, {});
  const {
    data: { TASK_SEQ },
  } = response;
  yield put(actions.setTaskSeq(id, TASK_SEQ));
}

// editor, file-upload, work-selector등 실시간 저장을 위한 함수
// function* saveTempContents({ id, detail, fieldName, compType, contSeq }) {
//   const workSeq = yield select(selectors.makeSelectWorkSeqById(id));
//   const taskSeq = yield select(selectors.makeSelectTaskSeqById(id));
//   const payload = {
//     WORK_SEQ: workSeq,
//     TASK_SEQ: taskSeq,
//     CONT_SEQ: contSeq,
//     FIELD_NM: fieldName,
//     ORD: 0,
//     TYPE: compType,
//     DETAIL: detail,
//   };
//   const response = yield call(Axios.post, `/api/builder/v1/work/contents/${workSeq}/${taskSeq}`, { PARAM: payload });
//   const {
//     data: { CONT_SEQ, FIELD_NM },
//   } = response;
//   yield put(actions.successSaveTempContents(id, CONT_SEQ, FIELD_NM));
// }

function* tempSaveTask({ id, callbackFunc }) {
  const workSeq = yield select(selectors.makeSelectWorkSeqById(id));
  const formData = yield select(selectors.makeSelectFormDataById(id));
  let taskSeq = yield select(selectors.makeSelectTaskSeqById(id));
  // taskSeq 생성
  if (taskSeq === -1) {
    const firstResponse = yield call(Axios.post, `/api/builder/v1/work/taskCreate/${workSeq}`, {});
    const {
      data: { TASK_SEQ },
    } = firstResponse;
    taskSeq = TASK_SEQ;
  }
  // temp저장
  const tempResponse = yield call(Axios.post, `/api/builder/v1/work/task/${workSeq}/${taskSeq}`, { PARAM: formData });
  yield put(actions.successTempSaveTask(id));
  if (typeof callbackFunc === 'function') {
    callbackFunc(id);
  }
}

function* saveTask({ id, reloadId, callbackFunc }) {
  const workSeq = yield select(selectors.makeSelectWorkSeqById(id));
  const formData = yield select(selectors.makeSelectFormDataById(id));
  let taskSeq = yield select(selectors.makeSelectTaskSeqById(id));
  // taskSeq 생성
  if (taskSeq === -1) {
    const firstResponse = yield call(Axios.post, `/api/builder/v1/work/taskCreate/${workSeq}`, {});
    const {
      data: { TASK_SEQ },
    } = firstResponse;
    taskSeq = TASK_SEQ;
  }
  // temp저장
  // const secondResponse = yield call(Axios.post, `/api/builder/v1/work/bizbuilderSave/${workSeq}/${taskSeq}`, { PARAM: formData });
  const secondResponse = yield call(Axios.post, `/api/builder/v1/work/task/${workSeq}/${taskSeq}`, { PARAM: formData });
  // temp -> origin
  // const nextResponse = yield call(Axios.put, `/api/builder/v1/work/bizbuilderSave/${workSeq}/${taskSeq}`, {
  const nextResponse = yield call(Axios.post, `/api/builder/v1/work/taskComplete`, {
    PARAM: {
      ...formData,
      TASK_SEQ: taskSeq,
      WORK_SEQ: workSeq,
      // prcId,
      // processStep,
    },
  });
  yield put(actions.successSaveTask(id));
  yield put(actions.getBuilderData(reloadId || id, workSeq, -1));
  // const apiArr = yield select(selectors.makeSelectApiArrById(reloadId || id));
  // yield put(actions.getExtraApiData(reloadId || id, apiArr));

  if (typeof callbackFunc === 'function') {
    callbackFunc(id);
  }
}

function* modifyTask({ id, callbackFunc }) {
  const workSeq = yield select(selectors.makeSelectWorkSeqById(id));
  const taskSeq = yield select(selectors.makeSelectTaskSeqById(id));
  const formData = yield select(selectors.makeSelectFormDataById(id));

  // temp저장
  const secondResponse = yield call(Axios.post, `/api/builder/v1/work/task/${workSeq}/${taskSeq}`, { PARAM: formData });
  // temp -> origin
  const nextResponse = yield call(Axios.post, `/api/builder/v1/work/taskComplete`, {
    PARAM: {
      ...formData,
      TASK_SEQ: taskSeq,
      WORK_SEQ: workSeq,
      // prcId,
      // processStep,
    },
  });

  // yield put(actions.successSaveTask(id));
  yield put(actions.getBuilderData(id, workSeq, taskSeq));
  if (typeof callbackFunc === 'function') {
    callbackFunc(id);
  }
}

function* deleteTask({ id, workSeq, taskSeq, callbackFunc }) {
  // 삭제도 saveTask처럼 reloadId 필요한지 확인
  const response = yield call(Axios.delete, `/api/builder/v1/work/contents/${workSeq}/${taskSeq}`);
  yield put(actions.getBuilderData(id, workSeq, -1));

  if (typeof callbackFunc === 'function') {
    callbackFunc(id);
  }
  // const apiArr = yield select(selectors.makeSelectApiArrById(id));
  // yield put(actions.getExtraApiData(id, apiArr));
}

function* addNotifyBuilder({ id, workSeq, taskSeq, titleKey, contentKey }) {
  const response = yield call(Axios.post, `/api/builder/v1/work/builderNotifyAdd`, { WORK_SEQ: workSeq, TASK_SEQ: taskSeq, titleKey, contentKey });
}

export default function* watcher() {
  const arg = arguments[0];
  yield takeEvery(`${actionTypes.GET_BUILDER_DATA}_${arg.id}`, getBuilderData);
  yield takeEvery(`${actionTypes.GET_EXTRA_API_DATA}_${arg.id}`, getExtraApiData);
  yield takeEvery(`${actionTypes.GET_DETAIL_DATA}_${arg.id}`, getDetailData);
  yield takeEvery(`${actionTypes.GET_TASK_SEQ}_${arg.id}`, getTaskSeq);
  // yield takeEvery(`${actionTypes.SAVE_TEMP_CONTENTS}_${arg.id}`, saveTempContents);
  yield takeEvery(`${actionTypes.TEMP_SAVE_TASK}_${arg.id}`, tempSaveTask);
  yield takeEvery(`${actionTypes.SAVE_TASK}_${arg.id}`, saveTask);
  yield takeEvery(`${actionTypes.MODIFY_TASK}_${arg.id}`, modifyTask);
  yield takeEvery(`${actionTypes.DELETE_TASK}_${arg.id}`, deleteTask);
  yield takeEvery(`${actionTypes.ADD_NOTIFY_BUILDER}_${arg.id}`, addNotifyBuilder);
  // yield takeLatest(actionTypes.POST_DATA, postData);
  // yield takeLatest(actionTypes.OPEN_EDIT_MODAL, getEditData);
  // yield takeLatest(actionTypes.SAVE_TASK_CONTENTS, saveTaskContents);
  // yield takeLatest(actionTypes.DELETE_TASK, deleteTask);
}
