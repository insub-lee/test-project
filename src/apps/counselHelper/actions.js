import * as action from './constants';

export const saveDetail = (detail, WIDGET_ID) => ({
  type: action.SAVE_DETAIL,
  detail,
  WIDGET_ID,
});

export const getDetail = (detail, WIDGET_ID) => ({
  type: action.GET_DETAIL,
  detail,
  WIDGET_ID,
});
