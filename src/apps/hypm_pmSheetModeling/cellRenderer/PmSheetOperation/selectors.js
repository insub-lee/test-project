import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('PmSheetOperationModeling');

const makePmSheetDataList = () => createSelector(
  selectPmsheet,
  params => params.get('pmSheetDataList'),
);
const makeSavelKeyData = () => createSelector(
  selectPmsheet,
  params => params.get('save'),
);
// eslint-disable-next-line import/prefer-default-export
export { makePmSheetDataList, makeSavelKeyData };
