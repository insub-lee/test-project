import * as constants from './constants';

export const handleLoadingPopup = value => (
  {
    type: constants.LOADING_FAB_PARAMTEST_SAGA,
    value,
  }
);

export const getRepairTypeList = () => (
  {
    type: constants.LOADING_FAB_DANGER_SAGA,
  }
);
