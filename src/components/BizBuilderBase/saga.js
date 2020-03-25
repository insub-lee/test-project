import { takeEvery, call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import React from 'react';

import { Axios } from 'utils/AxiosFunc';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { TOTAL_DATA_OPT_SEQ, BUILDER_MODAL_OPT_SEQ, CHANGE_VIEW_OPT_SEQ } from 'components/BizBuilder/Common/Constants';
import history from 'utils/history';
import { isJSON } from 'utils/helpers';

import * as actionTypes from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

// BuilderBase 에서 API 호출시 HEADER 에 값을 추가하여 별도로 로그관리를 함 (필요할 경우 workSeq, taskSeq 추가)

function* getBuilderData({ id, workSeq, taskSeq, viewType, extraProps, conditional, changeWorkflowFormData }) {
  if (taskSeq === -1) yield put(actions.removeReduxState(id));
  const response = yield call(Axios.get, `/api/builder/v1/work/workBuilder/${workSeq}`, {}, { BUILDER: 'getBuilderData' });
  const { work, metaList, formData, validationData, apiList, viewProcessList } = response;
  const workFlow = metaList.find(meta => meta.COMP_TYPE === 'WORKFLOW');
  const builderModalOptIdx = work && work.OPT_INFO && work.OPT_INFO.findIndex(opt => opt.OPT_SEQ === BUILDER_MODAL_OPT_SEQ && opt.ISUSED === 'Y');
  const isBuilderModal = !!(builderModalOptIdx > -1);
  let isSaveModalClose = false;
  let builderModalSetting;
  if (isBuilderModal) {
    const tempObj = isJSON(work.OPT_INFO[builderModalOptIdx].OPT_VALUE) ? JSON.parse(work.OPT_INFO[builderModalOptIdx].OPT_VALUE) : undefined;
    if (tempObj) {
      builderModalSetting = { bodyStyle: { padding: '20px 1px 1px 1px', overflow: 'auto' } };
      if (tempObj.width && tempObj.width > 0) {
        builderModalSetting.width = tempObj.width + tempObj.widthType;
      }
      if (tempObj.height && tempObj.height > 0) {
        builderModalSetting.bodyStyle.height = tempObj.height + tempObj.heightType;
      }
      isSaveModalClose = tempObj.saveModalClose || false;
    }
  }
  if (taskSeq === -1) {
    // yield put(actions.initFormData(id, workSeq, formData));
    yield put(
      actions.setBuilderData(
        id,
        workSeq,
        taskSeq,
        viewType,
        extraProps,
        response,
        work,
        metaList,
        workFlow,
        apiList,
        viewProcessList,
        formData,
        validationData,
      ),
    );
    if (typeof changeWorkflowFormData === 'function') changeWorkflowFormData(formData);
  } else {
    yield put(actions.setBuilderData(id, workSeq, taskSeq, viewType, extraProps, response, work, metaList, workFlow, apiList, viewProcessList));
  }
  yield put(actions.setBuilderModalByReducer(id, isBuilderModal, builderModalSetting, isSaveModalClose));
  if (viewType === 'LIST') {
    yield put(actions.getListDataBySaga(id, workSeq, conditional));
    // const responseList = yield call(Axios.get, `/api/builder/v1/work/taskList/${workSeq}`, {}, { BUILDER: 'getBuilderData' });
    // if (responseList) {
    //   const { list } = responseList;
    //   yield put(actions.setListDataByReducer(id, list));
    // }
  }
}

function* getExtraApiData({ id, apiArr, callback }) {
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

  if (typeof callback === 'function') {
    callback(id);
  }
}

function* submitExtraHandler({ id, httpMethod, apiUrl, submitData, callbackFunc, etcData }) {
  let httpMethodInfo = Axios.put;
  switch (httpMethod.toUpperCase()) {
    case 'POST':
      httpMethodInfo = Axios.post;
      break;
    case 'PUT':
      httpMethodInfo = Axios.put;
      break;
    case 'DELETE':
      httpMethodInfo = Axios.delete;
      break;
    default:
      httpMethodInfo = Axios.get;
      break;
  }
  const response = yield call(httpMethodInfo, apiUrl, submitData);
  if (typeof callbackFunc === 'function') {
    callbackFunc(id, response, etcData);
  }
}

function* getDetailData({ id, workSeq, taskSeq, viewType, extraProps, changeWorkflowFormData }) {
  /* Enable Data Loading */
  // yield put(actions.enableDataLoading());
  /* Redux Reset By Id */
  yield put(actions.removeReduxState(id));
  let formData = {};
  let validationData = {};
  if (viewType === 'MODIFY') {
    const response = yield call(Axios.post, `/api/builder/v1/work/taskEdit/${workSeq}/${taskSeq}`, {}, { BUILDER: 'getDetailData' });
    formData = response.data;
    validationData = response.validationData;
  } else {
    const response = yield call(Axios.get, `/api/builder/v1/work/task/${workSeq}/${taskSeq}`, {}, { BUILDER: 'getDetailData' });
    formData = response.result;
  }
  if (formData) {
    yield put(actions.setDetailData(id, formData, validationData));
    if (typeof changeWorkflowFormData === 'function') changeWorkflowFormData(formData);
    yield put(actions.getBuilderData(id, workSeq, taskSeq, viewType, extraProps));
  }
  /* Disable Data Loading */
  // yield put(actions.disableDataLoading());
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
        } else if (validationData[node].requiredFlag === false) {
          validFlag = validationData[node].requiredFlag;
          validMsg = `${validationData[node].requiredMsg}`;
        }
      });

      if (!validFlag) {
        message.error(<MessageContent>{validMsg || '에러가 발생하였습니다. 관리자에게 문의하세요.'}</MessageContent>);
        return;
      }
    }
  }

  const beforeApiList = extraApiList.filter(fNode => fNode.CALL_TYPE === 'B');
  if (beforeApiList.length > 0) {
    for (let i = 0; i < beforeApiList.length; i += 1) {
      const item = beforeApiList[i];
      const beforeResponse = yield call(
        Axios[item.METHOD_TYPE],
        item.API_SRC,
        {
          PARAM: {
            ...formData,
            TASK_SEQ: taskSeq,
            WORK_SEQ: workSeq,
            viewType: 'INPUT',
          },
        },
        { BUILDER: 'callApiBysaveBuilder' },
      );

      if (beforeResponse) {
        const { retFlag, retMsg } = beforeResponse;
        if (retFlag === false) {
          message.error(<MessageContent>{retMsg || '에러가 발생하였습니다. 관리자에게 문의하세요.'}</MessageContent>);
          return;
        }
      }
    }
  }

  // taskSeq 생성
  if (taskSeq === -1) {
    const firstResponse = yield call(Axios.post, `/api/builder/v1/work/taskCreate/${workSeq}`, {}, { BUILDER: 'saveTaskCreate' });
    const {
      data: { TASK_SEQ, TASK_ORIGIN_SEQ },
    } = firstResponse;
    taskSeq = TASK_SEQ;
    formData.TASK_ORIGIN_SEQ = TASK_ORIGIN_SEQ;
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
        viewType: 'INPUT',
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

  const afterApiList = extraApiList.filter(fNode => fNode.CALL_TYPE === 'A');
  if (afterApiList.length > 0) {
    for (let i = 0; i < afterApiList.length; i += 1) {
      const item = afterApiList[i];
      yield call(
        Axios[item.METHOD_TYPE],
        item.API_SRC,
        {
          PARAM: {
            ...formData,
            TASK_SEQ: taskSeq,
            WORK_SEQ: workSeq,
            viewType: 'INPUT',
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

  if (typeof callbackFunc === 'function') {
    callbackFunc(id, workSeq, taskSeq, formData);
  } else {
    yield put(actions.getBuilderData(reloadId || id, workSeq, -1));
  }
}

function* modifyTaskBySeq({ id, reloadId, workSeq, taskSeq, callbackFunc }) {
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
        } else if (validationData[node].requiredFlag === false) {
          validFlag = validationData[node].requiredFlag;
          validMsg = `${validationData[node].requiredMsg}`;
        }
      });

      if (!validFlag) {
        message.error(<MessageContent>{validMsg || '에러가 발생하였습니다. 관리자에게 문의하세요.'}</MessageContent>);
        return;
      }
    }
  }

  const beforeApiList = extraApiList.filter(fNode => fNode.CALL_TYPE === 'B');
  if (beforeApiList.length > 0) {
    for (let i = 0; i < beforeApiList.length; i += 1) {
      const item = beforeApiList[i];
      const beforeResponse = yield call(
        Axios[item.METHOD_TYPE],
        item.API_SRC,
        {
          PARAM: {
            ...formData,
            TASK_SEQ: taskSeq,
            WORK_SEQ: workSeq,
            viewType: 'INPUT',
          },
        },
        { BUILDER: 'callApiBysaveBuilder' },
      );

      if (beforeResponse) {
        const { retFlag, retMsg } = beforeResponse;
        if (retFlag === false) {
          message.error(<MessageContent>{retMsg || '에러가 발생하였습니다. 관리자에게 문의하세요.'}</MessageContent>);
          return;
        }
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
        viewType: 'MODIFY',
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

  const afterApiList = extraApiList.filter(fNode => fNode.CALL_TYPE === 'A');
  if (afterApiList.length > 0) {
    for (let i = 0; i < afterApiList.length; i += 1) {
      const item = afterApiList[i];
      yield call(
        Axios[item.METHOD_TYPE],
        item.API_SRC,
        {
          PARAM: {
            ...formData,
            TASK_SEQ: taskSeq,
            WORK_SEQ: workSeq,
            viewType: 'INPUT',
          },
        },
        { BUILDER: 'callApiBysaveBuilder' },
      );
    }
  }

  yield put(actions.successSaveTask(id));

  if (typeof callbackFunc === 'function') {
    callbackFunc(id, modifyWorkSeq, modifyTaskSeq, formData);
    // 이런 형태로도 가능 함수, 파라미터...
    // yield call(callbackFunc, id, modifyWorkSeq, modifyTaskSeq, formData);
  } else {
    yield put(actions.getBuilderData(reloadId || id, modifyWorkSeq, modifyTaskSeq));
  }
}

function* modifyTask({ id, reloadId, callbackFunc }) {
  const workSeq = yield select(selectors.makeSelectWorkSeqById(id));
  const taskSeq = yield select(selectors.makeSelectTaskSeqById(id));
  yield put(actions.modifyTaskBySeq(id, reloadId, workSeq, taskSeq, callbackFunc));
}

function* deleteTask({ id, reloadId, workSeq, taskSeq, changeViewPage, callbackFunc }) {
  // 삭제도 saveTask처럼 reloadId 필요한지 확인
  const workInfo = yield select(selectors.makeSelectWorkInfoById(id));
  const response = yield call(Axios.delete, `/api/builder/v1/work/contents/${workSeq}/${taskSeq}`, {}, { BUILDER: 'deleteTask' });

  // const apiArr = yield select(selectors.makeSelectApiArrById(id));
  // yield put(actions.getExtraApiData(id, apiArr));

  const isTotalDataUsed = !!(
    workInfo &&
    workInfo.OPT_INFO &&
    workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === TOTAL_DATA_OPT_SEQ && opt.ISUSED === 'Y') !== -1
  );
  if (isTotalDataUsed) {
    const totalDataResponse = yield call(
      Axios.delete,
      `/api/builder/v1/work/totalBuildereRemoveHandler/${workSeq}/${taskSeq}`,
      {},
      { BUILDER: 'deleteTotalData' },
    );
  }

  const conditional = yield select(selectors.makeSelectConditionalById(id));
  yield put(actions.getBuilderData(reloadId || id, workSeq, -1, 'LIST', null, conditional));

  if (typeof callbackFunc === 'function') {
    callbackFunc(id, taskSeq);
  } else {
    const changeViewOptIdx = workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === CHANGE_VIEW_OPT_SEQ);
    if (changeViewOptIdx !== -1) {
      const changeViewOpt = workInfo.OPT_INFO[changeViewOptIdx];
      const optValue = JSON.parse(changeViewOpt.OPT_VALUE);
      changeViewPage(id, workSeq, taskSeq, optValue.DELETE);
    } else {
      changeViewPage(id, workSeq, taskSeq, 'LIST');
    }
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

function* revisionTask({ id, workSeq, taskSeq, viewType, revisionType, extraProps, callbackFunc }) {
  const response = yield call(Axios.post, `/api/builder/v1/work/revision/${workSeq}/${taskSeq}`, { PARAM: { revisionType } }, { BUILDER: 'revisionTask' });
  const newTaskSeq = response.data.TASK_SEQ;
  yield put(actions.setTaskSeq(id, newTaskSeq));
  yield put(actions.setDetailData(id, response.data));
  yield put(actions.getBuilderData(id, workSeq, newTaskSeq, viewType, extraProps));
  if (typeof callbackFunc === 'function') {
    callbackFunc(id, workSeq, newTaskSeq, viewType, extraProps);
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

function* getListData({ id, workSeq, conditional }) {
  const searchData = yield select(selectors.makeSelectSearchDataById(id));
  const whereString = [];
  const keySet = Object.keys(searchData);
  keySet.forEach(key => {
    whereString.push(searchData[key]);
  });

  if (conditional && conditional.length > 0) whereString.push(conditional);

  const responseList = yield call(Axios.post, `/api/builder/v1/work/taskList/${workSeq}`, { PARAM: { whereString } }, { BUILDER: 'getTaskList' });
  if (responseList) {
    const { list } = responseList;
    yield put(actions.setListDataByReducer(id, list));
  }
}

function* redirectUrl({ id, url }) {
  history.push(url);
}

function* removeMultiTask({ id, reloadId, callbackFunc }) {
  const removeList = yield select(selectors.makeSelectListSelectRowKeysById(id));
  if (removeList.length > 0) {
    const workInfo = yield select(selectors.makeSelectWorkInfoById(id));
    const viewPageData = yield select(selectors.makeSelectViewPageDataById(id));
    const conditional = yield select(selectors.makeSelectConditionalById(id));
    const { workSeq, taskSeq } = viewPageData;

    const response = yield call(
      Axios.post,
      `/api/builder/v1/work/taskContentsList/-1`,
      { PARAM: { WORK_SEQ: workSeq, taskList: removeList } },
      { BUILDER: 'deleteMultiTask' },
    );

    const isTotalDataUsed = !!(
      workInfo &&
      workInfo.OPT_INFO &&
      workInfo.OPT_INFO.findIndex(opt => opt.OPT_SEQ === TOTAL_DATA_OPT_SEQ && opt.ISUSED === 'Y') !== -1
    );
    if (isTotalDataUsed) {
      const totalDataResponse = yield call(
        Axios.post,
        `/api/builder/v1/work/totalBuildereRemoveHandler/${workSeq}/-1`,
        { PARAM: { WORK_SEQ: workSeq, taskList: removeList } },
        { BUILDER: 'deleteTotalDataMulti' },
      );
    }

    if (response) {
      if (typeof callbackFunc === 'function') {
        callbackFunc(id, workSeq, taskSeq);
      } else {
        yield put(actions.getBuilderData(reloadId || id, workSeq, -1, viewPageData.viewType, null, conditional));
      }
    }
  } else {
    message.warning(<MessageContent>삭제할 컨텐츠를 선택하세요.</MessageContent>);
  }
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
  yield takeEvery(`${actionTypes.GET_LIST_DATA_SAGA}_${arg.sagaKey}`, getListData);
  yield takeEvery(`${actionTypes.SUBMIT_EXTRA}_${arg.sagaKey || arg.id}`, submitExtraHandler);
  yield takeLatest(`${actionTypes.REDIRECT_URL}_${arg.sagaKey || arg.id}`, redirectUrl);
  yield takeLatest(`${actionTypes.REMOVE_MULTI_TASK_SAGA}_${arg.sagaKey}`, removeMultiTask);
  // yield takeLatest(actionTypes.POST_DATA, postData);
  // yield takeLatest(actionTypes.OPEN_EDIT_MODAL, getEditData);
  // yield takeLatest(actionTypes.SAVE_TASK_CONTENTS, saveTaskContents);
  // yield takeLatest(actionTypes.DELETE_TASK, deleteTask);
}
