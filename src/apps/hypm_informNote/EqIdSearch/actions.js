import * as constants from './constants';

export const loadingTidnParam = param => (
  {
    type: constants.LOADING_TIDNPARAM_SAGA,
    param,
  }
);

export {
  loadingTidnParam as default,
};
