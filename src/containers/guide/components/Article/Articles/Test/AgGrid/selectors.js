import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('aggrid');

const makeFactoryList = () => createSelector(
  selectPmsheet,
  params => params.get('factoryList'),
);

const makedetailFactory = () => createSelector(
  selectPmsheet,
  params => params.get('detailFactoryList'),
);

const makeSdptList = () => createSelector(
  selectPmsheet,
  params => params.get('sdptList'),
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
  params => params.get('pmSheetDataList'),
);

export {
  makeFactoryList,
  makedetailFactory,
  makeSdptList,
  makeModelList,
  makeVersionList,
  makeSignStatusList,
  makePmSheetDataList,
};
