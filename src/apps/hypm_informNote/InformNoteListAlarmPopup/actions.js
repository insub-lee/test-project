import * as constants from './constants';

export const loadingParam = param => (
  {
    type: constants.LOADING_PARAM_SAGA,
    param,
  }
);

export const loadingSdptParam = value => (
  {
    type: constants.LOADING_SDPT_PARAM_SAGA,
    value,
  }
);

export const loadingFlParam = param => (
  {
    type: constants.LOADING_FL_PARAM_SAGA,
    param,
  }
);

export const alarmSearch = param => (
  {
    type: constants.LOADING_ALARM_SEARCH_SAGA,
    param,
  }
);

export const alarmSave = param => (
  {
    type: constants.LOADING_ALARM_SAVE_SAGA,
    param,
  }
);
