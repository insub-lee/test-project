import * as actionTypes from './constants';

export const getBuilderData = (id, workSeq, taskSeq) => ({
  type: `${actionTypes.GET_BUILDER_DATA}_${id}`,
  id,
  workSeq,
  taskSeq,
});

export const setBuilderData = (id, response, metaList, workFlow) => ({
  type: actionTypes.SET_BUILDER_DATA,
  id,
  response,
  metaList,
  workFlow,
});

export const getExtraApiData = (id, apiArr) => ({
  type: `${actionTypes.GET_EXTRA_API_DATA}_${id}`,
  id,
  apiArr,
});

export const setExtraApiData = (id, apiKey, response) => ({
  type: actionTypes.SET_EXTRA_API_DATA,
  id,
  apiKey,
  response,
});

export const getDetailData = (id, workSeq, taskSeq) => ({
  type: `${actionTypes.GET_DETAIL_DATA}_${id}`,
  id,
  workSeq,
  taskSeq,
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

export const deleteTask = (id, reloadId, workSeq, taskSeq, callbackFunc) => ({
  type: `${actionTypes.DELETE_TASK}_${id}`,
  id,
  reloadId,
  workSeq,
  taskSeq,
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

export const initFormData = (id, workSeq, metaList) => ({
  type: actionTypes.INIT_FORMDATA,
  id,
  workSeq,
  metaList,
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

export const revisionTask = (id, workSeq, taskSeq, callbackFunc) => ({
  type: `${actionTypes.REVISION_TASK}_${id}`,
  id,
  workSeq,
  taskSeq,
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
