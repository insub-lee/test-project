import * as constantTypes from './constants';

export const getTotalManualList = categoryIdx => ({
  type: constantTypes.GET_TOTALMANUALIST,
  categoryIdx,
});

export const setTotalManualList = totalManualList => ({
  type: constantTypes.SET_TOTALMANUALIST,
  totalManualList,
});
