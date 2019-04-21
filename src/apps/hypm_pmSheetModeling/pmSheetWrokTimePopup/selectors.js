import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('pmSheetWrokTimePopup');
const selectUserProfile = state => state.get('auth').get('profile');


const makePmSheetDataList = () => createSelector(
  selectPmsheet,
  params => params.get('pmSheetDataList').toJS(),
);

const makeWrokTimeDataList = () => createSelector(
  selectPmsheet,
  params => params.get('WrokTimeDataList').toJS(),
);
const makeSelectProfile = () => createSelector(
  selectUserProfile,
  // eslint-disable-next-line no-shadow
  selectUserProfile => selectUserProfile,
);
const makeOperationDataList = () => createSelector(
  selectPmsheet,
  params => params.get('OperationDataList').toJS(),
);

export {
  makePmSheetDataList,
  makeWrokTimeDataList,
  makeSelectProfile,
  makeOperationDataList,
};
