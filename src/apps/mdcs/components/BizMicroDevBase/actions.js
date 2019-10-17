import * as actionTypes from './constants';

export const getCallDataHandler = (id, apiArys) => ({
  type: `${actionTypes.GET_CALLDATA_SAGA}_${id}`,
  id,
  apiArys,
});

export const setCallDataHandler = (id, apiKey, response) => ({
  type: actionTypes.SET_CALLDATA_SAGA,
  id,
  apiKey,
  response,
});
