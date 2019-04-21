import * as constants from './constants';

export const loadingFabParam = () => (
  {
    type: constants.LOADING_FAB_PARAM_SAGA,
  }
);

export const loadingDefaultParam = (beber, stand) => (
  {
    type: constants.LOADING_DEFAULT_PARAM_SAGA,
    beber,
    stand,
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

export const loadingAuartParam = value => (
  {
    type: constants.LOADING_AUARTPARAM_SAGA,
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
    type: constants.LOADING_PMSHEETLISTSEARCH_SAGA,
    param,
  }
);

export const loadingTidnParam = param => (
  {
    type: constants.LOADING_TIDNPARAM_SAGA,
    param,
  }
);

export const getUserCompanyDefine = () => (
  {
    type: constants.GET_USER_COMPANY_DEFINE_SAGA,
  }
)
