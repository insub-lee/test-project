import * as actionTypes from './constants';

export const getView = (widgetId, id) => ({
  type: actionTypes.GET_VIEW,
  widgetId,
  id,
});

export const successGetView = (widgetId, columns, list) => ({
  type: actionTypes.SUCCESS_GET_VIEW,
  widgetId,
  columns,
  list,
});

export const successGetFormData = (widgetId, boxes, formStuffs, workFlow) => ({
  type: actionTypes.SUCCESS_GET_FORM_DATA,
  widgetId,
  boxes,
  formStuffs,
  workFlow,
});

export const openEditModal = (widgetId, workSeq, taskSeq) => ({
  type: actionTypes.OPEN_EDIT_MODAL,
  widgetId,
  workSeq,
  taskSeq,
});

export const closeEditModal = widgetId => ({
  type: actionTypes.CLOSE_EDIT_MODAL,
  widgetId,
});

export const toggleFormModal = (widgetId, value) => ({
  type: actionTypes.TOGGLE_FORM_MODAL,
  widgetId,
  value,
});

export const postData = (widgetId, payload, prcId, processStep) => ({
  type: actionTypes.POST_DATA,
  widgetId,
  payload,
  prcId,
  processStep,
});

export const successPostData = () => ({
  type: actionTypes.SUCCESS_POST_DATA,
});

export const getTaskSeq = (widgetId, workSeq) => ({
  type: actionTypes.GET_TASK_SEQ,
  widgetId,
  workSeq,
});

export const successGetTaskSeq = (widgetId, taskSeq) => ({
  type: actionTypes.SUCCESS_GET_TASK_SEQ,
  widgetId,
  taskSeq,
});

export const successGetEditData = (widgetId, data) => ({
  type: actionTypes.SUCCESS_GET_EDIT_DATA,
  widgetId,
  data,
});

export const saveTaskContents = (widgetId, { detail, fieldNm, type, contSeq }) => ({
  type: actionTypes.SAVE_TASK_CONTENTS,
  widgetId,
  data: {
    detail,
    fieldNm,
    type,
    contSeq,
  },
});

export const successSaveTaskContents = (widgetId, { taskSeq, fieldNm, contSeq }) => ({
  type: actionTypes.SUCCESS_SAVE_TASK_CONTENTS,
  widgetId,
  data: {
    taskSeq,
    fieldNm,
    contSeq,
  },
});

export const updateSignInfo = (widgetId, info) => ({
  type: actionTypes.UPDATE_SIGN_INFO,
  widgetId,
  info,
});

export const resetData = () => ({
  type: actionTypes.RESET_DATA,
});

// export const enableLoading = () => ({
//   type: actionTypes.LOADING_ON,
// });

// export const disableLoading = () => ({
//   type: actionTypes.LOADING_OFF,
// });

export const enableModalLoading = (widgetId, key) => ({
  type: actionTypes.MODAL_LOADING_ON,
  widgetId,
  key,
});

export const disableModalLoading = (widgetId, key) => ({
  type: actionTypes.MODAL_LOADING_OFF,
  widgetId,
  key,
});

export const deleteTask = (widgetId, workSeq, taskSeq) => ({
  type: actionTypes.DELETE_TASK,
  widgetId,
  workSeq,
  taskSeq,
});
