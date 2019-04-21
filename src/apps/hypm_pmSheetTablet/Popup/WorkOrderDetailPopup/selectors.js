import { createSelector } from 'reselect';

const selectInformNote = state => state.get('workOrderDetail');

const workOrderEtTaskDetail = () => createSelector(
  selectInformNote,
  params => params.get('workOrderEtTaskDetail'),
);

const makepopList = () => createSelector(
  selectInformNote,
  params => params.get('workOrderDetail'),
);

const startDate = () => createSelector(
  selectInformNote,
  params => params.get('startDate'),
);
const makeContractorGrid = () => createSelector(
  selectInformNote,
  params => params.get('contractorGrid'),
);
// const RepairTypeList = () => createSelector(
//   selectInformNote,
//   params => params.get('repairTypeList'),
// );

export {
  workOrderEtTaskDetail,
  makepopList,
  startDate,
  makeContractorGrid,
  // RepairTypeList,
};
