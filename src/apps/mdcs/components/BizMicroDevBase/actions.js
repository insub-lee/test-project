import * as actionTypes from './constants';

export const getCallDataHandler = (id, apiArys, callbackFunc) => ({
  type: `${actionTypes.GET_CALLDATA_SAGA}_${id}`,
  id,
  apiArys,
  callbackFunc,
});

export const setCallDataHandler = (id, apiKey, response) => ({
  type: actionTypes.SET_CALLDATA_SAGA,
  id,
  apiKey,
  response,
});

export const removeReduxState = id => ({
  type: actionTypes.REMOVE_REDUX_STATE,
  id,
});

export const removeReduxStateByKey = (id, key) => ({
  type: actionTypes.REMOVE_REDUX_STATE_BYKEY,
  id,
  key,
});
