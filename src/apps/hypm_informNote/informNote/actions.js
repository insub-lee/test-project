import * as constants from './constants';

export const loadingFabParam = () => (
  {
    type: constants.LOADING_FAB_PARAM_SAGA,
  }
);

export const loadingHotParam = value => (
  {
    type: constants.LOADING_HOT_PARAM_SAGA,
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

export const loadingFlParam = value => (
  {
    type: constants.LOADING_FLPARAM_SAGA,
    value,
  }
);

export const loadingModelParam = value => (
  {
    type: constants.LOADING_MODELPARAM_SAGA,
    value,
  }
);

export const loadingDownParam = () => (
  {
    type: constants.LOADING_DOWNPARAM_SAGA,
  }
);

export const loadingDownTypeParam = value => (
  {
    type: constants.LOADING_DOWNTYPEPARAM_SAGA,
    value,
  }
);

export const loadingLclassParam = value => (
  {
    type: constants.LOADING_LCLASSPARAM_SAGA,
    value,
  }
);

export const loadingMclassParam = value => (
  {
    type: constants.LOADING_MCLASSPARAM_SAGA,
    value,
  }
);

export const loadingSclassParam = value => (
  {
    type: constants.LOADING_SCLASSPARAM_SAGA,
    value,
  }
);

export const loadingDangerTask = () => (
  {
    type: constants.LOADING_DANGERTASK_SAGA,
  }
);

export const initInformNoteList = () => (
  {
    type: constants.INIT_INFORMNOTELIST,
  }
)
export const fabInformNoteListSearchNew = param => (
  {
    type: constants.LOADING_FABINFORMNOTELISTSEARCHNEW,
    param,
  }
);

export const pmSheetSearch = param => (
  {
    type: constants.LOADING_PMSHEETSEARCH_SAGA,
    param,
  }
);

export const loadingTidnParam = param => (
  {
    type: constants.LOADING_TIDNPARAM_SAGA,
    param,
  }
);

export const loadingShiftParam = param => (
  {
    type: constants.LOADING_SHIFTPARAM_SAGA,
    param,
  }
);

export const fabInformNoteEditDetail = (param, method) => (
  {
    type: constants.LOADING_FABINFORMNOTEEDITDETAIL_SAGA,
    param,
    method,
  }
);

export const moveNoteDetail = eqid => (
  {
    type: constants.MOVE_NOTEDETAIL,
    eqid,
  }
);

export const gridColumnSearch = param => (
  {
    type: constants.LOADING_GRIDCOLUMN_SEARCH_SAGA,
    param,
  }
);

