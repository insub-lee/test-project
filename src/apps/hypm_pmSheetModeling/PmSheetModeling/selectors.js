import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('PmSheetModeling');
const selectUserProfile = state => state.get('auth').get('profile');

const makeFabList = () => createSelector(
  selectPmsheet,
  params => params.get('fabList'),
);

const makeTeamList = () => createSelector(
  selectPmsheet,
  params => params.get('teamList'),
);

const makeSdptList = () => createSelector(
  selectPmsheet,
  params => params.get('sdptList'),
);

const makeFlList = () => createSelector(
  selectPmsheet,
  params => params.get('flList'),
);

const makeModelList = () => createSelector(
  selectPmsheet,
  params => params.get('modelList'),
);

const makeVersionList = () => createSelector(
  selectPmsheet,
  params => params.get('versionList'),
);

const makeSignStatusList = () => createSelector(
  selectPmsheet,
  params => params.get('signStatusList'),
);

const makePmSheetDataList = () => createSelector(
  selectPmsheet,
  params => params.get('pmSheetDataList').toJS(),
);

const makePmTypeCombo = () => createSelector(
  selectPmsheet,
  params => params.get('pmTypeCombo'),
);

const makeStratCombo = () => createSelector(
  selectPmsheet,
  params => params.get('stratCombo').toJS(),
);

const makeSelectProfile = () => createSelector(
  selectUserProfile,
  userProfile => userProfile,
);

const makeSearchSuccess = () => createSelector(
  selectPmsheet,
  params => params.get('searchSuccess'),
);

const makeCopySdptCombo = () => createSelector(
  selectPmsheet,
  params => params.get('copySdptCombo'),
);

const makeCopyModelCombo = () => createSelector(
  selectPmsheet,
  params => params.get('copyModelCombo'),
);

export {
  makeFabList,
  makeTeamList,
  makeSdptList,
  makeFlList,
  makeModelList,
  makeVersionList,
  makeSignStatusList,
  makePmSheetDataList,
  makePmTypeCombo,
  makeSelectProfile,
  makeStratCombo,
  makeSearchSuccess,
  makeCopySdptCombo,
  makeCopyModelCombo
};
