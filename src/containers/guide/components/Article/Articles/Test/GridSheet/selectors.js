import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('gridsheet');

const makeFabList = () => createSelector(selectPmsheet, params => params.get('fabList'));

const makeTeamList = () => createSelector(selectPmsheet, params => params.get('teamList'));

const makeSdptList = () => createSelector(selectPmsheet, params => params.get('sdptList'));

const makeFlList = () => createSelector(selectPmsheet, params => params.get('flList'));

const makeModelList = () => createSelector(selectPmsheet, params => params.get('modelList'));

const makeVersionList = () => createSelector(selectPmsheet, params => params.get('versionList'));

const makeSignStatusList = () => createSelector(selectPmsheet, params => params.get('signStatusList'));

const makePmSheetDataList = () => createSelector(selectPmsheet, params => params.get('pmSheetDataList').toJS());

export { makeFabList, makeTeamList, makeSdptList, makeFlList, makeModelList, makeVersionList, makeSignStatusList, makePmSheetDataList };
