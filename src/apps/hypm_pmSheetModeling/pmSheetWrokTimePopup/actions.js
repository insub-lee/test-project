import * as constants from './constants';


// eslint-disable-next-line import/prefer-default-export
export const loadingGridParam = value => (
  {
    type: constants.LOADING_GRID_PARAM_SAGA,
    value,
  }
);

export const saveDataList = (value,returnParam) => (
  {
    type: constants.LOADING_SAVE_WORKTIME_SAGA,
    value,
    returnParam,
  }
);
export const OperationParam = value => (
  {
    type: constants.LOADING_GRID_PARAM_SAGA,
    value,
  }
);




