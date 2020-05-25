import { takeEvery, call, put, select, takeLatest } from 'redux-saga/effects';
import React from 'react';

import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import * as actionTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

// BuilderBase 에서 API 호출시 HEADER 에 값을 추가하여 별도로 로그관리를 함 (필요할 경우 workSeq, taskSeq 추가)

function* getBuilderData({ id, workSeq, taskSeq }) {
  const response = yield call(Axios.get, `/api/builder/v1/work/taskList/${workSeq}`, {}, { BUILDER: 'getBuilderData' });
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
          response = yield call(Axios.get, apiInfo.url, {}, { BUILDER: 'getExtraApiData' });
        } else if (apiInfo.type === 'POST') {
          response = yield call(Axios.post, apiInfo.url, apiInfo.params, { BUILDER: 'getExtraApiData' });
        }
      }
      yield put(actions.setExtraApiData(id, apiInfo.key, response));
    }
  }
}

function* getDetailData({ id, workSeq, taskSeq }) {
  const response = yield call(Axios.post, `/api/builder/v1/work/taskEdit/${workSeq}/${taskSeq}`, {}, { BUILDER: 'getDetailData' });
  yield put(actions.setDetailData(id, response.data));
}

// processRule  조회
function* getProcessRule({ id, payload }) {
  const response = yield call(Axios.post, `/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder`, { PARAM: { ...payload } });
  const { DRAFT_PROCESS } = response;
  yield put(actions.setProcessRule(id, DRAFT_PROCESS));
}

function* getProcessRuleByModify({ id, payload }) {
  const response = yield call(Axios.post, `/api/workflow/v1/common/workprocess/defaultPrcRuleModifyHanlder`, { PARAM: { ...payload } });
  const { DRAFT_PROCESS } = response;
  yield put(actions.setProcessRule(id, DRAFT_PROCESS));
}

function* getTaskSeq({ id, workSeq }) {
  const response = yield call(Axios.post, `/api/builder/v1/work/taskCreate/${workSeq}`, {}, { BUILDER: 'getTaskSeq' });
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
    const firstResponse = yield call(Axios.post, `/api/builder/v1/work/taskCreate/${workSeq}`, {}, { BUILDER: 'tempSaveTaskCreate' });
    const {
      data: { TASK_SEQ },
    } = firstResponse;
    taskSeq = TASK_SEQ;
  }
  // temp저장
  const tempResponse = yield call(Axios.post, `/api/builder/v1/work/task/${workSeq}/${taskSeq}`, { PARAM: formData }, { BUILDER: 'tempSaveTask' });
  yield put(actions.successTempSaveTask(id));
  if (typeof callbackFunc === 'function') {
    callbackFunc(id, taskSeq, formData);
  }
}

function* saveTask({ id, reloadId, callbackFunc }) {
  const workSeq = yield select(selectors.makeSelectWorkSeqById(id));
  const formData = yield select(selectors.makeSelectFormDataById(id));
  let taskSeq = yield select(selectors.makeSelectTaskSeqById(id));
  const validationData = yield select(selectors.makeSelectValidationDataById(id));
  const processRule = yield select(selectors.makeSelectProcessRuleById(id));

  if (validationData) {
    const validKeyList = Object.keys(validationData);
    if (validKeyList && validKeyList.length > 0) {
      let validFlag = true;
      let validMsg = '';

      validKeyList.forEach(node => {
        if (!validationData[node].flag) {
          validFlag = validationData[node].flag;
          validMsg = validationData[node].msg;
        }
      });

      if (!validFlag) {
        message.error(<MessageContent>{validMsg || '에러가 발생하였습니다. 관리자에게 문의하세요.'}</MessageContent>);
        return;
      }
    }
  }

  // taskSeq 생성
  if (taskSeq === -1) {
    const firstResponse = yield call(Axios.post, `/api/builder/v1/work/taskCreate/${workSeq}`, {}, { BUILDER: 'saveTaskCreate' });
    const {
      data: { TASK_SEQ },
    } = firstResponse;
    taskSeq = TASK_SEQ;
  }

  // temp저장
  const secondResponse = yield call(Axios.post, `/api/builder/v1/work/task/${workSeq}/${taskSeq}`, { PARAM: formData }, { BUILDER: 'saveTask' });
  // temp -> origin
  const nextResponse = yield call(
    Axios.post,
    `/api/builder/v1/work/taskComplete`,
    {
      PARAM: {
        ...formData,
        TASK_SEQ: taskSeq,
        WORK_SEQ: workSeq,
      },
    },
    { BUILDER: 'saveTaskComplete' },
  );

  if (Object.keys(processRule).length !== 0) {
    // 결재 저장
    const forthResponse = yield call(Axios.post, `/api/workflow/v1/common/workprocess/draft`, {
      DRAFT_PROCESS: {
        ...processRule,
        DRAFT_TITLE: formData.TITLE,
        WORK_SEQ: workSeq,
        TASK_SEQ: taskSeq,
        REL_TYPE: 1, // 고정(사용안하게 되면 삭제필요)
      },
    });
  }

  yield put(actions.successSaveTask(id));
  yield put(actions.getBuilderData(reloadId || id, workSeq, -1));
  // const apiArr = yield select(selectors.makeSelectApiArrById(reloadId || id));
  // yield put(actions.getExtraApiData(reloadId || id, apiArr));

  if (typeof callbackFunc === 'function') {
    callbackFunc(id, taskSeq, formData);
  }
}

function* modifyTaskBySeq({ id, workSeq, taskSeq, callbackFunc }) {
  const modifyWorkSeq = workSeq && workSeq > 0 ? workSeq : yield select(selectors.makeSelectWorkSeqById(id));
  const modifyTaskSeq = taskSeq && taskSeq > 0 ? taskSeq : yield select(selectors.makeSelectTaskSeqById(id));
  const formData = yield select(selectors.makeSelectFormDataById(id));
  const validationData = yield select(selectors.makeSelectValidationDataById(id));

  if (validationData) {
    const validKeyList = Object.keys(validationData);
    if (validKeyList && validKeyList.length > 0) {
      let validFlag = true;
      let validMsg = '';

      validKeyList.forEach(node => {
        if (!validationData[node].flag) {
          validFlag = validationData[node].flag;
          validMsg = validationData[node].msg;
        }
      });

      if (!validFlag) {
        message.error(<MessageContent>{validMsg || '에러가 발생하였습니다. 관리자에게 문의하세요.'}</MessageContent>);
        return;
      }
    }
  }

  // temp저장
  const secondResponse = yield call(Axios.post, `/api/builder/v1/work/task/${modifyWorkSeq}/${modifyTaskSeq}`, { PARAM: formData }, { BUILDER: 'modifyTask' });
  // temp -> origin
  const nextResponse = yield call(
    Axios.post,
    `/api/builder/v1/work/taskComplete`,
    {
      PARAM: {
        ...formData,
        TASK_SEQ: modifyTaskSeq,
        WORK_SEQ: modifyWorkSeq,
        // prcId,
        // processStep,
      },
    },
    { BUILDER: 'modifyTaskComplete' },
  );

  yield put(actions.getBuilderData(id, modifyWorkSeq, modifyTaskSeq));
  if (typeof callbackFunc === 'function') {
    callbackFunc(id, modifyTaskSeq, formData);
  }
  yield put(actions.successSaveTask(id));
}

function* modifyTask({ id, callbackFunc }) {
  const workSeq = yield select(selectors.makeSelectWorkSeqById(id));
  const taskSeq = yield select(selectors.makeSelectTaskSeqById(id));
  yield put(actions.modifyTaskBySeq(id, workSeq, taskSeq, callbackFunc));
}

function* deleteTask({ id, reloadId, workSeq, taskSeq, callbackFunc }) {
  // 삭제도 saveTask처럼 reloadId 필요한지 확인
  const response = yield call(Axios.delete, `/api/builder/v1/work/contents/${workSeq}/${taskSeq}`, {}, { BUILDER: 'deleteTask' });

  yield put(actions.getBuilderData(reloadId || id, workSeq, -1));

  // const apiArr = yield select(selectors.makeSelectApiArrById(id));
  // yield put(actions.getExtraApiData(id, apiArr));

  if (typeof callbackFunc === 'function') {
    callbackFunc(id, taskSeq);
  }
}

function* addNotifyBuilder({ id, workSeq, taskSeq, titleKey, contentKey }) {
  const response = yield call(
    Axios.post,
    `/api/builder/v1/work/builderNotifyAdd`,
    { WORK_SEQ: workSeq, TASK_SEQ: taskSeq, titleKey, contentKey },
    { BUILDER: 'addNotifyBuilder' },
  );
}

function* deleteExtraTask({ id, url, params, apiArr }) {
  const response = yield call(Axios.delete, url, params, { BUILDER: 'deleteExtraTask' });
  yield put(actions.getExtraApiData(id, apiArr));
}

function* revisionTask({ id, workSeq, taskSeq, callbackFunc }) {
  const response = yield call(Axios.post, `/api/builder/v1/work/revision/${workSeq}/${taskSeq}`, {}, { BUILDER: 'revisionTask' });

  const newTaskSeq = response.data.TASK_SEQ;
  yield put(actions.setDetailData(id, response.data));
  yield put(actions.setTaskSeq(id, newTaskSeq));
  if (typeof callbackFunc === 'function') {
    callbackFunc(id, workSeq, newTaskSeq);
  }
}

function* getRevisionHistory({ id, workSeq, taskSeq, callbackFunc }) {
  const response = yield call(Axios.get, `/api/builder/v1/work/revision/${workSeq}/${taskSeq}`, {}, { BUILDER: 'getRevisionHistory' });

  yield put(actions.setRevisionHistory(id, response.list));
  if (typeof callbackFunc === 'function') {
    callbackFunc(id, workSeq, taskSeq);
  }
}

function* deleteFav({ id, apiArr, callbackFunc }) {
  // param WORK_SEQ, TASK_SEQ
  const response = yield call(Axios.delete, `/api/mdcs/v1/common/FavoriteDeleteOne`, apiArr);

  if (typeof callbackFunc === 'function') {
    callbackFunc(id);
  }
}

function* getDraftProcess({ id, draftId }) {
  const response = yield call(Axios.post, `/api/workflow/v1/common/workprocess/draftprocess`, { PARAM: { DRAFT_ID: draftId } });
  const { draftProcess } = response;
  yield put(actions.setDraftProcess(id, draftProcess));
}

export default function* watcher() {
  const arg = arguments[0];
  yield takeEvery(`${actionTypes.GET_BUILDER_DATA}_${arg.id}`, getBuilderData);
  yield takeEvery(`${actionTypes.GET_EXTRA_API_DATA}_${arg.id}`, getExtraApiData);
  yield takeEvery(`${actionTypes.GET_DETAIL_DATA}_${arg.id}`, getDetailData);
  yield takeEvery(`${actionTypes.GET_PROCESS_RULE}_${arg.id}`, getProcessRule);
  yield takeEvery(`${actionTypes.GET_PROCESS_RULE_MODIFY}_${arg.id}`, getProcessRuleByModify);
  yield takeEvery(`${actionTypes.GET_TASK_SEQ}_${arg.id}`, getTaskSeq);
  // yield takeEvery(`${actionTypes.SAVE_TEMP_CONTENTS}_${arg.id}`, saveTempContents);
  yield takeLatest(`${actionTypes.TEMP_SAVE_TASK}_${arg.id}`, tempSaveTask);
  yield takeLatest(`${actionTypes.SAVE_TASK}_${arg.id}`, saveTask);
  yield takeLatest(`${actionTypes.MODIFY_TASK}_${arg.id}`, modifyTask);
  yield takeLatest(`${actionTypes.MODIFY_TASK_BY_SEQ}_${arg.id}`, modifyTaskBySeq);
  yield takeLatest(`${actionTypes.DELETE_TASK}_${arg.id}`, deleteTask);
  yield takeLatest(`${actionTypes.DELETE_EXTRA_TASK}_${arg.id}`, deleteExtraTask);
  yield takeLatest(`${actionTypes.DELETE_FAV}_${arg.id}`, deleteFav);
  yield takeLatest(`${actionTypes.ADD_NOTIFY_BUILDER}_${arg.id}`, addNotifyBuilder);
  yield takeEvery(`${actionTypes.REVISION_TASK}_${arg.id}`, revisionTask);
  yield takeEvery(`${actionTypes.GET_REVISION_HISTORY}_${arg.id}`, getRevisionHistory);
  yield takeEvery(`${actionTypes.GET_DRAFT_PROCESS}_${arg.id}`, getDraftProcess);
  // yield takeLatest(actionTypes.POST_DATA, postData);
  // yield takeLatest(actionTypes.OPEN_EDIT_MODAL, getEditData);
  // yield takeLatest(actionTypes.SAVE_TASK_CONTENTS, saveTaskContents);
  // yield takeLatest(actionTypes.DELETE_TASK, deleteTask);
}
