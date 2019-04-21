import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('PmSheetList');

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

const makeAuartList = () => createSelector(
  selectPmsheet,
  params => params.get('auartList'),
);

const makeDownTypelList = () => createSelector(
  selectPmsheet,
  params => params.get('downTypeList'),
);

const makeInspLotStatusList = () => createSelector(
  selectPmsheet,
  params => params.get('inspLotStatusList'),
);

const makeCreateGbList = () => createSelector(
  selectPmsheet,
  params => params.get('createGbList'),
);

const makePmSheetDataList = () => createSelector(
  selectPmsheet,
  params => params.get('pmSheetDataList').toJS(),
);

const makeTidnList = () => createSelector(
  selectPmsheet,
  params => params.get('tidnList'),
);

const userDefine = () => createSelector(
  selectPmsheet,
  params => params.get('userDefine'),
);

export {
  makeFabList,
  makeTeamList,
  makeSdptList,
  makeFlList,
  makeModelList,
  makeAuartList,
  makeDownTypelList,
  makeInspLotStatusList,
  makeCreateGbList,
  makePmSheetDataList,
  makeTidnList,
  userDefine,
};
