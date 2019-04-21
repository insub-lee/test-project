import * as constants from './constants';

// eslint-disable-next-line import/prefer-default-export
export const loadingFactoryParam = param => (
  {
    type: constants.LOADING_PMSHEET_OPERATION_PARAM_SAGA,
    param,
  }
);

export const loadingSaveYn = value => (
  {
    type: constants.LOADING_SAVE_PARAM_SAGA,
    value,
  }
);

