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

export const deleteTask = (id, reloadId, workSeq, taskSeq, callbackFunc) => ({
  type: `${actionTypes.DELETE_TASK}_${id}`,
  id,
  reloadId,
  workSeq,
  taskSeq,
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

export const removeReduxState = id => ({
  type: actionTypes.REMOVE_REDUX_STATE,
  id,
});
