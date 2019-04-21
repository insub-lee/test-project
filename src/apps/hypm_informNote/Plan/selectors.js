import { createSelector } from 'reselect';

const selectPlan = state => state.get('Plan');

export const makePlanDataList = () => createSelector(
  selectPlan,
  params => params.get('planDataList'),
);

export const makeResultCode = () => createSelector(
  selectPlan,
  params => params.get('resultCode'),
);

export {
  makePlanDataList as default,
};
