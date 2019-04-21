import * as constants from './constants';


// eslint-disable-next-line import/prefer-default-export
export const loadingGridParam = value => (
  {
    type: constants.LOADING_GRID_PARAM_SAGA,
    value,
  }
);
