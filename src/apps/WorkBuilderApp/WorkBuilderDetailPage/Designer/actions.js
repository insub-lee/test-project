import * as actionTypes from './constants';

export const activeTab = tabId => ({
  type: actionTypes.ACTIVE_TAB,
  tabId,
});

export const addBox = () => ({
  type: actionTypes.ADD_BOX,
});

export const successAddBox = box => ({
  type: actionTypes.SUCCESS_ADD_BOX,
  box,
});

export const addFormStuff = formStuffType => ({
  type: actionTypes.ADD_FORM_STUFF,
  formStuffType,
});

export const successAddFormStuff = formStuff => ({
  type: actionTypes.SUCCESS_ADD_FORM_STUFF,
  formStuff,
});

export const removeLayer = (id, layerType) => ({
  type: actionTypes.REMOVE_PANEL,
  id,
  layerType,
});

export const activeLayer = (id, layerType) => ({
  type: actionTypes.ACTIVE_LAYER,
  id,
  layerType,
});

export const disableLayers = () => ({
  type: actionTypes.DISABLE_LAYERS,
});

export const changeLabel = (step, label) => ({
  type: actionTypes.CHANGE_LABEL,
  step,
  label,
});

export const changeBoxType = (index, value) => ({
  type: actionTypes.CHANGE_BOX_TYPE,
  index,
  value,
});

export const successChangeBoxType = (index, value) => ({
  type: actionTypes.SUCCESS_CHANGE_BOX_TYPE,
  index,
  value,
});

export const changeFormStuffSpan = (index, value) => ({
  type: actionTypes.CHANGE_FORM_STUFF_SPAN,
  index,
  value,
});

export const successChangeFormStuffSpan = (index, value) => ({
  type: actionTypes.SUCCESS_CHANGE_FORM_STUFF_SPAN,
  index,
  value,
});

export const changeBoxColumnCount = (index, value) => ({
  type: actionTypes.CHANGE_BOX_COLUMN_COUNT,
  index,
  value,
});

export const successChangeBoxColumnCount = (index, value) => ({
  type: actionTypes.SUCCESS_CHANGE_BOX_COLUMN_COUNT,
  index,
  value,
});

export const changeId = ({ type, index, value }) => ({
  type: actionTypes.CHANGE_ID,
  payload: {
    type,
    index,
    value,
  },
});

export const successChangeId = ({ type, index, value, id }) => ({
  type: actionTypes.SUCCESS_CHANGE_ID,
  payload: {
    type,
    index,
    value,
    id,
  },
});

export const changeTitle = ({ type, index, value }) => ({
  type: actionTypes.CHANGE_TITLE,
  payload: {
    type,
    index,
    value,
  },
});

export const successChangeTitle = ({ type, index, value }) => ({
  type: actionTypes.SUCCESS_CHANGE_TITLE,
  payload: {
    type,
    index,
    value,
  },
});

export const changeName = ({ type, index, value }) => ({
  type: actionTypes.CHANGE_NAME,
  payload: {
    type,
    index,
    value,
  },
});

export const successChangeName = ({ type, index, value }) => ({
  type: actionTypes.SUCCESS_CHANGE_NAME,
  payload: {
    type,
    index,
    value,
  },
});

export const changeUseLabel = ({ type, index, value }) => ({
  type: actionTypes.CHANGE_USE_LABEL,
  payload: {
    type,
    index,
    value,
  },
});

export const successChangeUseLabel = ({ type, index, value }) => ({
  type: actionTypes.SUCCESS_CHANGE_USE_LABEL,
  payload: {
    type,
    index,
    value,
  },
});

export const toggleBlockOpenStatus = blockType => ({
  type: actionTypes.TOGGLE_BLOCK_OPEN_STATUS,
  blockType,
});

export const onDragEnd = dropResult => ({
  type: actionTypes.ON_DRAG_END,
  dropResult,
});

export const clearLayers = () => ({
  type: actionTypes.CLEAR_LAYERS,
});

export const saveLayers = () => ({
  type: actionTypes.SAVE_LAYERS,
});

export const saveTemporary = () => ({
  type: actionTypes.SAVE_TEMPORARY,
});

export const fetchData = id => ({
  type: actionTypes.FETCH_DATA,
  id,
});

export const successFetchData = data => ({
  type: actionTypes.SUCCESS_FETCH_DATA,
  data,
});

export const openPreview = () => ({
  type: actionTypes.ON_PREVIEW,
});

export const closePreview = () => ({
  type: actionTypes.OFF_PREVIEW,
});
