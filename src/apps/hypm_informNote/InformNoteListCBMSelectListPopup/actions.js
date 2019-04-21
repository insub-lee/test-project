import * as constants from './constants';

export const loadingFabParam = () => (
  {
    type: constants.LOADING_FAB_PARAM_SAGA,
  }
);


export const loadingGridParam = value => (
  {
    type: constants.LOADING_GRID_PARAM_SAGA,
    value,
  }
);
