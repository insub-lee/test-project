import * as constants from './constants';

export const fncSearchList = param => (
  {
    type: constants.LOADING_FNC_SEARCH_LIST_SAGA,
    param,
  }
);


export const loadingGridParam = value => (
  {
    type: constants.LOADING_GRID_PARAM_SAGA,
    value,
  }
);
