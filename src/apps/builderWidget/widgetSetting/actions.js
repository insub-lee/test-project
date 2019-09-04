import * as actionTypes from './constants';

export const getWorkList = () => ({
  type: actionTypes.GET_WORK_LIST,
});

export const setWorkList = workList => ({
  type: actionTypes.SET_WORK_LIST,
  workList,
});

export const changeWorkSeq = workSeq => ({
  type: actionTypes.CHANGE_WORK_SEQ,
  workSeq,
});

export const getBuilderWidgetConfig = payload => ({
  type: actionTypes.GET_BUILDER_WIDGET_CONFIG,
  payload,
});

export const setBuilderWidgetConfig = ITEM_VALUE => ({
  type: actionTypes.SET_BUILDER_WIDGET_CONFIG,
  ITEM_VALUE,
});

export const saveBuilderWidgetConfig = payload => ({
  type: actionTypes.SAVE_BUILDER_WIDGET_CONFIG,
  payload,
});

export const initSettingData = () => ({
  type: actionTypes.INIT_SETTING_DATA,
});
