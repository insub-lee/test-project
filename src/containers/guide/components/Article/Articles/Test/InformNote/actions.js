import * as constants from './constants';

export const loadingFactoryParam = () => ({
  type: constants.LOADING_FACTORY_PARAM_SAGA,
});

export const loadingParam = value => ({
  type: constants.LOADING_PARAM_SAGA,
  value,
});

export const loadingSdptParam = value => ({
  type: constants.LOADING_SDPTPARAM_SAGA,
  value,
});

export const pmSheetSearch = () => ({
  type: constants.LOADING_PMSHEETSEARCH_SAGA,
});
