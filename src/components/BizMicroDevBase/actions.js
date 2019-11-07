import * as actionTypes from './constants';

export const getCallDataHandler = (id, apiArys, callbackFunc) => ({
  type: `${actionTypes.GET_CALLDATA_SAGA}_${id}`,
  id,
  apiArys,
  callbackFunc,
});

export const setCallDataHandler = (id, apiKey, response) => ({
  type: `${actionTypes.SET_CALLDATA_SAGA}_${id}`,
  id,
  apiKey,
  response,
});

export const submitHadnlerBySaga = (id, httpMethod, apiUrl, submitData, callbackFunc) => ({
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

export const removeReduxState = id => ({
  type: `${actionTypes.REMOVE_REDUX_STATE}_${id}`,
  id,
});

export const removeReduxStateByKey = (id, key) => ({
  type: `${actionTypes.REMOVE_REDUX_STATE_BYKEY}_${id}`,
  id,
  key,
});
