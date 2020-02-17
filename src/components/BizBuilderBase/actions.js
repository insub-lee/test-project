import * as actionTypes from './constants';

export const getBuilderData = (id, workSeq, taskSeq, viewType, changeWorkflowFormData) => ({
  type: `${actionTypes.GET_BUILDER_DATA}_${id}`,
  id,
  workSeq,
  taskSeq,
  viewType,
  changeWorkflowFormData,
});

export const setBuilderData = (id, response, work, metaList, workFlow, apiList, formData, validationData) => ({
  type: actionTypes.SET_BUILDER_DATA,
  id,
  response,
  work,
  metaList,
  workFlow,
  apiList,
  formData,
  validationData,
});

export const getExtraApiData = (id, apiArr, callback) => ({
  type: `${actionTypes.GET_EXTRA_API_DATA}_${id}`,
  id,
  apiArr,
  callback,
});

export const submitExtraHandler = (id, httpMethod, apiUrl, submitData, callbackFunc) => ({
  type: `${actionTypes.SUBMIT_EXTRA}_${id}`,
  id,
  httpMethod,
  apiUrl,
  submitData,
  callbackFunc,
});

export const setExtraApiData = (id, apiKey, response) => ({
  type: actionTypes.SET_EXTRA_API_DATA,
  id,
  apiKey,
  response,
});

export const getDetailData = (id, workSeq, taskSeq, viewType, changeWorkflowFormData) => ({
  type: `${actionTypes.GET_DETAIL_DATA}_${id}`,
  id,
  workSeq,
  taskSeq,
  viewType,
  changeWorkflowFormData,
});

export const setDetailData = (id, data) => ({
  type: actionTypes.SET_DETAIL_DATA,
  id,
  data,
});

export const getProcessRule = (id, payload) => ({
  type: `${actionTypes.GET_PROCESS_RULE}_${id}`,
  id,
  payload,
});

export const setProcessRule = (id, processRule) => ({
  type: actionTypes.SET_PROCESS_RULE,
  id,
  processRule,
});

export const setProcessStep = (id, processStep) => ({
  type: actionTypes.SET_PROCESS_STEP,
  id,
  processStep,
});

export const getTaskSeq = (id, workSeq) => ({
  type: `${actionTypes.GET_TASK_SEQ}_${id}`,
  id,
  workSeq,
});

export const setTaskSeq = (id, taskSeq) => ({
  type: actionTypes.SET_TASK_SEQ,
  id,
  taskSeq,
});

// export const saveTempContents = (id, detail, fieldName, compType, contSeq) => ({
//   type: `${actionTypes.SAVE_TEMP_CONTENTS}_${id}`,
//   id,
//   detail,
//   fieldName,
//   compType,
//   contSeq,
// });

// export const successSaveTempContents = (id, CONT_SEQ, FIELD_NAME) => ({
//   type: actionTypes.SUCCESS_SAVE_TEMP_CONTENTS,
//   id,
//   CONT_SEQ,
//   FIELD_NAME,
// });

export const tempSaveTask = (id, callbackFunc) => ({
  type: `${actionTypes.TEMP_SAVE_TASK}_${id}`,
  id,
  callbackFunc,
});

export const successTempSaveTask = id => ({
  type: `${actionTypes.SUCCESS_TEMP_SAVE_TASK}`,
  id,
});

export const saveTask = (id, reloadId, callbackFunc) => ({
  type: `${actionTypes.SAVE_TASK}_${id}`,
  id,
  reloadId,
  callbackFunc,
});

export const successSaveTask = id => ({
  type: actionTypes.SUCCESS_SAVE_TASK,
  id,
});

export const modifyTask = (id, callbackFunc) => ({
  type: `${actionTypes.MODIFY_TASK}_${id}`,
  id,
  callbackFunc,
});

export const modifyTaskBySeq = (id, workSeq, taskSeq, callbackFunc) => ({
  type: `${actionTypes.MODIFY_TASK_BY_SEQ}_${id}`,
  id,
  workSeq,
  taskSeq,
  callbackFunc,
});

export const deleteTask = (id, reloadId, workSeq, taskSeq, changeViewPage, callbackFunc) => ({
  type: `${actionTypes.DELETE_TASK}_${id}`,
  id,
  reloadId,
  workSeq,
  taskSeq,
  changeViewPage,
  callbackFunc,
});

export const deleteExtraTask = (id, url, params, apiArr) => ({
  type: `${actionTypes.DELETE_EXTRA_TASK}_${id}`,
  id,
  url,
  params,
  apiArr,
});

export const deleteFav = (id, apiArr, callbackFunc) => ({
  type: `${actionTypes.DELETE_FAV}_${id}`,
  id,
  apiArr,
  callbackFunc,
});

export const initFormData = (id, workSeq, formData) => ({
  type: actionTypes.INIT_FORMDATA,
  id,
  workSeq,
  formData,
});

export const changeFormData = (id, key, val) => ({
  type: actionTypes.CHANGE_FORMDATA,
  id,
  key,
  val,
});

export const addNotifyBuilder = (id, workSeq, taskSeq, titleKey, contentKey) => ({
  type: `${actionTypes.ADD_NOTIFY_BUILDER}_${id}`,
  id,
  workSeq,
  taskSeq,
  titleKey,
  contentKey,
});

export const revisionTask = (id, workSeq, taskSeq, viewType, revisionType, callbackFunc) => ({
  type: `${actionTypes.REVISION_TASK}_${id}`,
  id,
  workSeq,
  taskSeq,
  viewType,
  revisionType,
  callbackFunc,
});

export const getRevisionHistory = (id, workSeq, taskSeq, callbackFunc) => ({
  type: `${actionTypes.GET_REVISION_HISTORY}_${id}`,
  id,
  workSeq,
  taskSeq,
  callbackFunc,
});

export const setRevisionHistory = (id, list) => ({
  type: actionTypes.SET_REVISION_HISTORY,
  id,
  list,
});

export const removeReduxState = id => ({
  type: actionTypes.REMOVE_REDUX_STATE,
  id,
});

export const changeValidationDataByReducr = (id, key, flag, msg) => ({
  type: actionTypes.CHANGE_VALIDATIONDATA_REDUCR,
  id,
  key,
  flag,
  msg,
});

export const getDraftProcess = (id, draftId) => ({
  type: `${actionTypes.GET_DRAFT_PROCESS}_${id}`,
  id,
  draftId,
});

export const setDraftProcess = (id, draftProcess) => ({
  type: actionTypes.SET_DRAFT_PROCESS,
  id,
  draftProcess,
});

export const setViewPageDataByReducer = (id, workSeq, taskSeq, viewType) => ({
  type: actionTypes.SET_VIEWPAGEDATA_REDUCER,
  id,
  workSeq,
  taskSeq,
  viewType,
});

export const setViewTypeByReducer = (id, viewType) => ({
  type: actionTypes.SET_VIEWTYPE_REDUCER,
  id,
  viewType,
});

export const enableDataLoading = () => ({
  type: actionTypes.ENABLE_DATA_LOADING,
});

export const disableDataLoading = () => ({
  type: actionTypes.DISABLE_DATA_LOADING,
});

export const setListDataByReducer = (id, listData) => ({
  type: actionTypes.SET_LIST_DATA_REDUCER,
  id,
  listData,
});

export const changeSearchDataByReducer = (id, key, val) => ({
  type: actionTypes.CHANGE_SEARCH_DATA_REDUCER,
  id,
  key,
  val,
});

export const getListDataBySaga = (id, workSeq) => ({
  type: `${actionTypes.GET_LIST_DATA_SAGA}_${id}`,
  id,
  workSeq,
});

export const redirectUrl = (id, url) => ({
  type: `${actionTypes.REDIRECT_URL}_${id}`,
  id,
  url,
});

export const destroyReducerByReducer = id => ({
  type: actionTypes.DESTROY_REDUCER,
  id,
});

export const setListSelectRowKeysByReducer = (id, list) => ({
  type: actionTypes.SET_LIST_SELECT_ROW_KEYS_REDUCER,
  id,
  list,
});

export const removeMultiTaskBySaga = (id, reloadId, callbackFunc) => ({
  type: `${actionTypes.REMOVE_MULTI_TASK_SAGA}_${id}`,
  id,
  reloadId,
  callbackFunc,
});
