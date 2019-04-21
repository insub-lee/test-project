import * as constants from './constants';

export const loadingPlanParam = param => (
  {
    type: constants.LOADING_PLANPARAM_SAGA,
    param,
  }
);

export {
  loadingPlanParam as default,
};
