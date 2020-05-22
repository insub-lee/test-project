import * as actionTypes from './constants';

export const getCallDataHandler = (id, apiArys, callbackFunc) => ({
  type: `${actionTypes.GET_CALLDATA_SAGA}_${id}`,
  id,
  apiArys,
  callbackFunc,
});

export const getCallDataHandlerReturnRes = (id, apiInfo, callbackFunc) => ({
  type: `${actionTypes.GET_CALLDATA_SAGA_RETURN_RES}_${id}`,
  id,
  apiInfo,
  callbackFunc,
});

export const setCallDataHandler = (id, apiKey, response) => ({
  type: `${actionTypes.SET_CALLDATA_SAGA}_${id}`,
  id,
  apiKey,
  response,
});

export const submitHandlerBySaga = (id, httpMethod, apiUrl, submitData, callbackFunc) => ({
  type: `${actionTypes.PUBLIC_ACTIONMETHOD_SAGA}_${id}`,
  id,
  httpMethod,
  apiUrl,
  submitData,
  callbackFunc,
});

export const changeFormData = (id, key, val) => ({
  type: `${actionTypes.CHANGE_FORMDATA}_${id}`,
  id,
  key,
  val,
});

export const setFormData = (id, obj) => ({
  type: `${actionTypes.SET_FORMDATA}_${id}`,
  id,
  obj,
});

export const removeReduxState = id => ({
  type: `${actionTypes.REMOVE_REDUX_STATE}_${id}`,
  id,
});

export const removeStorageReduxState = (id, storage) => ({
  type: `${actionTypes.REMOVE_ID_BYSTORAGE}_${id}`,
  id,
  storage,
});

export const removeResponseDataReduxStateByKey = (id, key) => ({
  type: `${actionTypes.REMOVE_RESPONSE_REDUX_STATE_BYKEY}_${id}`,
  id,
  key,
});

export const removeFormDataReduxStateByKey = (id, key) => ({
  type: `${actionTypes.REMOVE_FORMDATA_REDUX_STATE_BYKEY}_${id}`,
  id,
  key,
});

export const resetCalledData = id => ({
  type: `${actionTypes.RESET_CALLED_DATA}_${id}`,
  id,
});

export const getFileDownload = (id, url, fileName, callbackFunc) => ({
  type: `${actionTypes.GET_FILE_DOWNLOAD}_${id}`,
  url,
  fileName,
  callbackFunc,
});
