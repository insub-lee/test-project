import * as actionTypes from './constants';

export const fetchData = id => ({
  type: actionTypes.FETCH_DATA,
  id,
});

export const successFetchData = info => ({
  type: actionTypes.SUCCESS_FETCH_DATA,
  info,
});
