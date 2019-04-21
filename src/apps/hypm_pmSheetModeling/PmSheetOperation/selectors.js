import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('PmSheetOperationModeling');
const selectUserProfile = state => state.get('auth').get('profile');

const makePmSheetDataList = () => createSelector(
  selectPmsheet,
  params => params.get('pmSheetDataList').toJS(),
);
const makeSavelKeyData = () => createSelector(
  selectPmsheet,
  params => params.get('save'),
);

const makeSelectProfile = () => createSelector(
  selectUserProfile,
  // eslint-disable-next-line no-shadow
  selectUserProfile => selectUserProfile,
);

const makePmTypeCombo = () => createSelector(
  selectPmsheet,
  params => params.get('pmTypeCombo'),
);

const makePmTypeCombo2 = () => createSelector(
  selectPmsheet,
  params => params.get('pmTypeCombo2'),
);
// eslint-disable-next-line import/prefer-default-export
export { makePmSheetDataList, makeSavelKeyData, makeSelectProfile, makePmTypeCombo, makePmTypeCombo2 };
