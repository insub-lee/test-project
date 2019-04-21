import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('pmSheetPlanChangeListPopup');


const makePmSheetDataList = () => createSelector(
  selectPmsheet,
  params => params.get('pmSheetDataList').toJS(),
);

const makePlanChangeDataList = () => createSelector(
  selectPmsheet,
  params => params.get('PlanChangeDataList').toJS(),
);

export {
  makePmSheetDataList,
  makePlanChangeDataList,
};
