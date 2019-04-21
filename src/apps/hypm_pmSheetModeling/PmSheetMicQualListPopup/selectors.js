import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('PmSheetMicQualListPopup');

const makeCheckListDataList = () => createSelector(
  selectPmsheet,
  params => params.get('checkListDataList').toJS(),
);

const makePmTypeCombo = () => createSelector(
  selectPmsheet,
  params => params.get('pmTypeCombo')
);

const makeMasseinhswGridCombo = () => createSelector(
  selectPmsheet,
  params => params.get('masseinhswGridCombo'),
);

// eslint-disable-next-line import/prefer-default-export
export { makeCheckListDataList, makePmTypeCombo, makeMasseinhswGridCombo };
