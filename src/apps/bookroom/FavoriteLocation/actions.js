import * as constants from './constants';

export const loadingParam = () => (
  {
    type: constants.LOADING_PARAM_SAGA,
  }
);

export const loadingFavLoc = () => (
  {
    type: constants.LOADING_FAV_LOC_SAGA,
  }
);

export const saveFavLoc = (favLocList, history) => (
  {
    type: constants.SAVE_FAV_LOC_SAGA,
    payload: {
      favLocList, 
      history, 
    }
  }
);
