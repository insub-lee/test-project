import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('PmSheetDetailPMCardPopup');

const makeOwnCompGrid = () => createSelector(
  selectPmsheet,
  params => params.get('ownCompGrid').toJS(),
);

const makeContractorGrid = () => createSelector(
  selectPmsheet,
  params => params.get('contractorGrid').toJS(),
);

const makeResult = () => createSelector(
  selectPmsheet,
  params => params.get('result'),
);

export {
  makeOwnCompGrid,
  makeContractorGrid,
  makeResult,
};
