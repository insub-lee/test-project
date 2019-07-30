import * as constantTypes from './constants';

export const setPageModeByReducr = (pageType, categoryIdx, manualIdx) => ({
  type: constantTypes.SET_PAGEMODE_REDUCR,
  pageType,
  categoryIdx,
  manualIdx,
});
