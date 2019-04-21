import * as constants from './constants';

export const loadingFabParam = () => (
  {
    type: constants.LOADING_FAB_PARAM_SAGA,
  }
);

export const loadingParam = value => (
  {
    type: constants.LOADING_PARAM_SAGA,
    value,
  }
);

export const loadingSdptParam = value => (
  {
    type: constants.LOADING_SDPTPARAM_SAGA,
    value,
  }
);

export const loadingTeamParam = value => (
  {
    type: constants.LOADING_TEAMPARAM_SAGA,
    value,
  }
);

export const pmSheetSearch = param => (
  {
    type: constants.LOADING_PMSHEETSEARCH_SAGA,
    param,
  }
);

export const handleSave = (param, returnParam) => (
  {
    type: constants.GRID_SAVE,
    param,
    returnParam,
  }
);

export const getCopySdptCombe = param => (
  {
    type: constants.GET_COPY_SDPT_COMBO,
    param,
  }
);

export const getCopyModelCombe = param => (
  {
    type: constants.GET_COPY_MODEL_COMBO,
    param,
  }
);

export const masterPmSheetCopy = (param, returnParam) => (
  {
    type: constants.MASTERPM_PM_SHEET_COPY,
    param,
    returnParam,
  }
);
