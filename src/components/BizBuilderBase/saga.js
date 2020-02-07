import { takeEvery, call, put, select, takeLatest } from 'redux-saga/effects';
import React from 'react';

import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { TOTAL_DATA_OPT_SEQ } from 'components/BizBuilder/Common/Constants';

import * as actionTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

// BuilderBase 에서 API 호출시 HEADER 에 값을 추가하여 별도로 로그관리를 함 (필요할 경우 workSeq, taskSeq 추가)

function* getBuilderData({ id, workSeq, taskSeq, viewType, changeWorkflowFormData }) {
  if (taskSeq === -1) yield put(actions.removeReduxState(id));
  const response = yield call(Axios.get, `/api/builder/v1/work/workBuilder/${workSeq}`, {}, { BUILDER: 'getBuilderData' });
  const { work, metaList, formData, validationData, apiList } = response;
  const workFlow = metaList.find(meta => meta.COMP_TYPE === 'WORKFLOW');

  if (taskSeq === -1) {
    // yield put(actions.initFormData(id, workSeq, formData));
    yield put(actions.setBuilderData(id, response, work, metaList, workFlow, apiList, formData, validationData));
    if (typeof changeWorkflowFormData === 'function') changeWorkflowFormData(formData);
  } else {
    yield put(actions.setBuilderData(id, response, work, metaList, workFlow, apiList));
  }
  if (viewType === 'LIST') {
    const responseList = yield call(Axios.get, `/api/builder/v1/work/taskList/${workSeq}`, {}, { BUILDER: 'getBuilderData' });
    if (responseList) {
      const { list } = responseList;
      yield put(actions.setListDataByReducer(id, list));
    }
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

function* getDetailData({ id, workSeq, taskSeq, viewType, changeWorkflowFormData }) {
  /* Enable Data Loading */
  yield put(actions.enableDataLoading());
  /* Redux Reset By Id */
  yield put(actions.removeReduxState(id));
  let formData = {};
  if (viewType === 'MODIFY') {
    const response = yield call(Axios.post, `/api/builder/v1/work/taskEdit/${workSeq}/${taskSeq}`, {}, { BUILDER: 'getDetailData' });
    formData = response.data;
  } else {
    const response = yield call(Axios.get, `/api/builder/v1/work/task/${workSeq}/${taskSeq}`, {}, { BUILDER: 'getDetailData' });
    formData = response.result;
  }
  if (formData) {
    yield put(actions.setDetailData(id, formData));
    if (typeof changeWorkflowFormData === 'function') changeWorkflowFormData(formData);
    yield put(actions.getBuilderData(id, workSeq, taskSeq));
  }
  /* Disable Data Loading */
  yield put(actions.disableDataLoading());
}

// processRule  조회
function* getProcessRule({ id, payload }) {
  const response = yield call(Axios.post, `/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder`, { PARAM: { ...payload } });
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
  const workInfo = yield select(selectors.makeSelectWorkInfoById(id));
  const extraApiList = yield select(selectors.makeSelectApiListById(id));

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

  // const formDataKeys = Object.keys(formData);

  // const paramData = {};
  // formDataKeys.forEach(key => {
  //   if (typeof formData[key] === 'object') {
  //     paramData[key] = JSON.stringify(formData[key]);
  //   } else {
  //     paramData[key] = formData[key];
  //   }
  // });

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

  if (nextResponse && nextResponse.data) {
    const { data: returnData } = nextResponse;
    const keyset = Object.keys(formData);
    if (keyset.length > 0) {
      keyset.forEach(key => {
        if (returnData[key]) formData[key] = returnData[key];
      });
    }
  }

  const isTotalDataUsed = !!(
    workInfo &&
    workInfo.OPT_INFO &&
    workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === TOTAL_DATA_OPT_SEQ && opt.ISUSED === 'Y') !== -1
  );
  if (isTotalDataUsed) {
    const totalDataResponse = yield call(
      Axios.post,
      `/api/builder/v1/work/totalBuilderHandler`,
      {
        PARAM: {
          ...formData,
          TASK_SEQ: taskSeq,
          WORK_SEQ: workSeq,
        },
      },
      { BUILDER: 'saveTotalData' },
    );
  }

  if (extraApiList.length > 0) {
    for (let i = 0; i < extraApiList.length; i += 1) {
      const item = extraApiList[i];
      yield call(
        Axios[item.METHOD_TYPE],
        item.API_SRC,
        {
          PARAM: {
            ...formData,
            TASK_SEQ: taskSeq,
            WORK_SEQ: workSeq,
          },
        },
        { BUILDER: 'callApiBysaveBuilder' },
      );
    }
  }

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
  // const apiArr = yield select(selectors.makeSelectApiArrById(reloadId || id));
  // yield put(actions.getExtraApiData(reloadId || id, apiArr));

  if (typeof callbackFunc === 'function') {
    callbackFunc(id, workSeq, taskSeq, formData);
  } else {
    yield put(actions.getBuilderData(reloadId || id, workSeq, -1));
  }
}

function* modifyTaskBySeq({ id, workSeq, taskSeq, callbackFunc }) {
  const modifyWorkSeq = workSeq && workSeq > 0 ? workSeq : yield select(selectors.makeSelectWorkSeqById(id));
  const modifyTaskSeq = taskSeq && taskSeq > 0 ? taskSeq : yield select(selectors.makeSelectTaskSeqById(id));
  const formData = yield select(selectors.makeSelectFormDataById(id));
  const validationData = yield select(selectors.makeSelectValidationDataById(id));
  const workInfo = yield select(selectors.makeSelectWorkInfoById(id));
  const extraApiList = yield select(selectors.makeSelectApiListById(id));
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

  if (nextResponse && nextResponse.data) {
    const { data: returnData } = nextResponse;
    const keyset = Object.keys(formData);
    if (keyset.length > 0) {
      keyset.forEach(key => {
        if (returnData[key]) formData[key] = returnData[key];
      });
    }
  }

  const isTotalDataUsed = !!(
    workInfo &&
    workInfo.OPT_INFO &&
    workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === TOTAL_DATA_OPT_SEQ && opt.ISUSED === 'Y') !== -1
  );
  if (isTotalDataUsed) {
    const totalDataResponse = yield call(
      Axios.post,
      `/api/builder/v1/work/totalBuilderHandler`,
      {
        PARAM: {
          ...formData,
          TASK_SEQ: taskSeq,
          WORK_SEQ: workSeq,
        },
      },
      { BUILDER: 'saveTotalData' },
    );
  }

  if (extraApiList.length > 0) {
    for (let i = 0; i < extraApiList.length; i += 1) {
      const item = extraApiList[i];
      yield call(
        Axios[item.METHOD_TYPE],
        item.API_SRC,
        {
          PARAM: {
            ...formData,
            TASK_SEQ: taskSeq,
            WORK_SEQ: workSeq,
          },
        },
        { BUILDER: 'callApiBysaveBuilder' },
      );
    }
  }

  yield put(actions.getBuilderData(id, modifyWorkSeq, modifyTaskSeq));
  if (typeof callbackFunc === 'function') {
    callbackFunc(id, modifyWorkSeq, modifyTaskSeq, formData);
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

function* revisionTask({ id, workSeq, taskSeq, viewType, revisionType, callbackFunc }) {
  const response = yield call(Axios.post, `/api/builder/v1/work/revision/${workSeq}/${taskSeq}`, { PARAM: { revisionType } }, { BUILDER: 'revisionTask' });
  const newTaskSeq = response.data.TASK_SEQ;
  yield put(actions.setTaskSeq(id, newTaskSeq));
  yield put(actions.setDetailData(id, response.data));
  yield put(actions.getBuilderData(id, workSeq, newTaskSeq));
  if (typeof callbackFunc === 'function') {
    callbackFunc(id, workSeq, newTaskSeq, viewType);
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

export default function* watcher(arg) {
  yield takeEvery(`${actionTypes.GET_BUILDER_DATA}_${arg.sagaKey}`, getBuilderData);
  yield takeEvery(`${actionTypes.GET_EXTRA_API_DATA}_${arg.sagaKey}`, getExtraApiData);
  yield takeEvery(`${actionTypes.GET_DETAIL_DATA}_${arg.sagaKey}`, getDetailData);
  yield takeEvery(`${actionTypes.GET_PROCESS_RULE}_${arg.sagaKey}`, getProcessRule);
  yield takeEvery(`${actionTypes.GET_TASK_SEQ}_${arg.sagaKey}`, getTaskSeq);
  // yield takeEvery(`${actionTypes.SAVE_TEMP_CONTENTS}_${arg.id}`, saveTempContents);
  yield takeLatest(`${actionTypes.TEMP_SAVE_TASK}_${arg.sagaKey}`, tempSaveTask);
  yield takeLatest(`${actionTypes.SAVE_TASK}_${arg.sagaKey}`, saveTask);
  yield takeLatest(`${actionTypes.MODIFY_TASK}_${arg.sagaKey}`, modifyTask);
  yield takeLatest(`${actionTypes.MODIFY_TASK_BY_SEQ}_${arg.sagaKey}`, modifyTaskBySeq);
  yield takeLatest(`${actionTypes.DELETE_TASK}_${arg.sagaKey}`, deleteTask);
  yield takeLatest(`${actionTypes.DELETE_EXTRA_TASK}_${arg.sagaKey}`, deleteExtraTask);
  yield takeLatest(`${actionTypes.DELETE_FAV}_${arg.sagaKey}`, deleteFav);
  yield takeLatest(`${actionTypes.ADD_NOTIFY_BUILDER}_${arg.sagaKey}`, addNotifyBuilder);
  yield takeEvery(`${actionTypes.REVISION_TASK}_${arg.sagaKey}`, revisionTask);
  yield takeEvery(`${actionTypes.GET_REVISION_HISTORY}_${arg.sagaKey}`, getRevisionHistory);
  yield takeEvery(`${actionTypes.GET_DRAFT_PROCESS}_${arg.sagaKey}`, getDraftProcess);
  // yield takeLatest(actionTypes.POST_DATA, postData);
  // yield takeLatest(actionTypes.OPEN_EDIT_MODAL, getEditData);
  // yield takeLatest(actionTypes.SAVE_TASK_CONTENTS, saveTaskContents);
  // yield takeLatest(actionTypes.DELETE_TASK, deleteTask);
}
