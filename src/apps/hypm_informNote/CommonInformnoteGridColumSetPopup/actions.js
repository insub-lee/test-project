import * as constants from './constants';

export const gridColumnSearch = param => (
  {
    type: constants.LOADING_GRIDCOLUMN_SEARCH_SAGA,
    param,
  }
);

export const gridColumnSave = param => (
  {
    type: constants.LOADING_GRIDCOLUMN_SAVE_SAGA,
    param,
  }
);
