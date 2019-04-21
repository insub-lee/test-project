import * as constants from './constants';

export const loadingGridParam = value => (
  {
    type: constants.LOADING_GRID_PARAM_SAGA,
    value,
  }
);
export const LoadingSaveYn = value => (
  {
    type: constants.LOADING_SAVE_PARAM_SAGA,
    value,
  }
);

export const LoadingModal = value => (
  {
    type: constants.LOADING_MODAL_PARAM_SAGA,
    value,
  }
);


export const LoadingBomList = value => (
  {
    type: constants.LOADING_BOM_PARAM_SAGA,
    value,
  }
);


export const savePmsheetSpList = (value, returnParam) => (
  {
    type: constants.LOADING_SAVE_PMSHEETSPLIST_PARAM_SAGA,
    value,
    returnParam,
  }
);
