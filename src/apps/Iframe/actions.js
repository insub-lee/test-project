import * as action from './constants';

export const setUrl = (url, WIDGET_ID) => ({
  type: action.SET_URL,
  url,
  WIDGET_ID,
});
export const deleteUrl = payload => ({
  type: action.DELETE_URL,
  payload,
});
