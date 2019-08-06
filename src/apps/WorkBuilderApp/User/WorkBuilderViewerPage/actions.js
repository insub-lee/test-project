import * as actionTypes from './constants';

export const getView = id => ({
  type: actionTypes.GET_VIEW,
  id,
});

export const successGetView = (columns, list) => ({
  type: actionTypes.SUCCESS_GET_VIEW,
  columns,
  list,
});

export const openEditModal = (workSeq, taskSeq) => ({
  type: actionTypes.OPEN_EDIT_MODAL,
  workSeq,
  taskSeq,
});

export const closeEditModal = () => ({
  type: actionTypes.CLOSE_EDIT_MODAL,
});

export const successGetFormData = (boxes, formStuffs, workFlow) => ({
  type: actionTypes.SUCCESS_GET_FORM_DATA,
  boxes,
  formStuffs,
  workFlow,
});

export const toggleFormModal = value => ({
  type: actionTypes.TOGGLE_FORM_MODAL,
  value,
});

export const postData = (payload, prcId, processStep) => ({
  type: actionTypes.POST_DATA,
  payload,
  prcId,
  processStep,
});

export const successPostData = () => ({
  type: actionTypes.SUCCESS_POST_DATA,
});

export const getTaskSeq = () => ({
  type: actionTypes.GET_TASK_SEQ,
});

export const successGetTaskSeq = taskSeq => ({
  type: actionTypes.SUCCESS_GET_TASK_SEQ,
  taskSeq,
});

export const successGetEditData = data => ({
  type: actionTypes.SUCCESS_GET_EDIT_DATA,
  data,
});

export const saveTaskContents = ({
  detail, fieldNm, type, contSeq,
}) => ({
  type: actionTypes.SAVE_TASK_CONTENTS,
  data: {
    detail,
    fieldNm,
    type,
    contSeq,
  },
});

export const successSaveTaskContents = ({ taskSeq, fieldNm, contSeq }) => ({
  type: actionTypes.SUCCESS_SAVE_TASK_CONTENTS,
  data: {
    taskSeq,
    fieldNm,
    contSeq,
  },
});

export const updateSignInfo = info => ({
  type: actionTypes.UPDATE_SIGN_INFO,
  info,
});

export const resetData = () => ({
  type: actionTypes.RESET_DATA,
});

export const enableLoading = () => ({
  type: actionTypes.LOADING_ON,
});

export const disableLoading = () => ({
  type: actionTypes.LOADING_OFF,
});

export const enableModalLoading = key => ({
  type: actionTypes.MODAL_LOADING_ON,
  key,
});

export const disableModalLoading = key => ({
  type: actionTypes.MODAL_LOADING_OFF,
  key,
});
