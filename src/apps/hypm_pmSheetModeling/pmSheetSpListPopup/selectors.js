import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('pmSheetSpListPopup');
const selectUserProfile = state => state.get('auth').get('profile');

const makePmSheetDataList = () => createSelector(
  selectPmsheet,
  params => params.get('pmSheetDataList').toJS(),
);

const makeMaterialDataList = () => createSelector(
  selectPmsheet,
  params => params.get('MaterialDataList').toJS(),
);
const makeSavelKeyData = () => createSelector(
  selectPmsheet,
  params => params.get('save'),
);
const makeModalListData = () => createSelector(
  selectPmsheet,
  params => params.get('ModalDataList'),
);
const makeactiveKeyData = () => createSelector(
  selectPmsheet,
  params => params.get('ACTIVE'),
);

const makeSelectProfile = () => createSelector(
  selectUserProfile,
  // eslint-disable-next-line no-shadow
  selectUserProfile => selectUserProfile,
);
const makePmBomTreeList = () => createSelector(
  selectPmsheet,
  params => params.get('pmBomTreeList').toJS(),
);
const makePmBomTitle = () => createSelector(
  selectPmsheet,
  params => params.get('titleStr'),
);

export {
  makePmSheetDataList,
  makeMaterialDataList,
  makeSavelKeyData,
  makeModalListData,
  makeactiveKeyData,
  makeSelectProfile,
  makePmBomTreeList,
  makePmBomTitle,
};
