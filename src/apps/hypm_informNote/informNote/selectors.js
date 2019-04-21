import { createSelector } from 'reselect';

const selectInformNote = state => state.get('gridsheet');
const selectAuth = state => state.get('auth');
const makeFabList = () => createSelector(
  selectInformNote,
  params => params.get('fabList'),
);

const makeHotList = () => createSelector(
  selectInformNote,
  params => params.get('hotList'),
);

const makeTeamList = () => createSelector(
  selectInformNote,
  params => params.get('teamList'),
);

const makeSdptList = () => createSelector(
  selectInformNote,
  params => params.get('sdptList'),
);

const makeFlList = () => createSelector(
  selectInformNote,
  params => params.get('flList'),
);

const makeModelList = () => createSelector(
  selectInformNote,
  params => params.get('modelList'),
);

const makeDownList = () => createSelector(
  selectInformNote,
  params => params.get('downList'),
);

const makeDownTypeList = () => createSelector(
  selectInformNote,
  params => params.get('downTypeList'),
);

const makeShiftList = () => createSelector(
  selectInformNote,
  params => params.get('shiftList'),
);

const makeSignStatusList = () => createSelector(
  selectInformNote,
  params => params.get('signStatusList'),
);

const makePmSheetDataList = () => createSelector(
  selectInformNote,
  params => params.get('pmSheetDataList').toJS(),
);

const makeInforNoteDataList = () => createSelector(
  selectInformNote,
  params => params.get('informNoteDataList'),
);

const makeSearchParam = () => createSelector(
  selectInformNote,
  params => params.get('param'),
);

const makeTidnList = () => createSelector(
  selectInformNote,
  params => params.get('tidnList'),
);

const makeLclassList = () => createSelector(
  selectInformNote,
  params => params.get('lclassList'),
);

const makeMclassList = () => createSelector(
  selectInformNote,
  params => params.get('mclassList'),
);

const makeSclassList = () => createSelector(
  selectInformNote,
  params => params.get('sclassList'),
);

const makeDangerTaskList = () => createSelector(
  selectInformNote,
  params => params.get('dangerTaskList'),
);

const getEditInformNote = () => createSelector(
  selectInformNote,
  params => params.get('editInformNote'),
);

const makeNoteDatail = () => createSelector(
  selectInformNote,
  params => params.get('moveEqid'),
);

const makeUserGridDefineList = () => createSelector(
  selectInformNote,
  params => params.get('userGridDefineList'),
);

const makeSelectProfile = () => createSelector(
  selectAuth,
  authState => authState.get('profile'),
);

const makeNoteListExcel = () => createSelector(
  selectInformNote,
  params => params.get('userGridDefineList'),
);

export {
  makeFabList,
  makeHotList,
  makeTeamList,
  makeSdptList,
  makeFlList,
  makeModelList,
  makeDownList,
  makeDownTypeList,
  makeShiftList,
  makeSignStatusList,
  makePmSheetDataList,
  makeInforNoteDataList,
  makeSearchParam,
  makeTidnList,
  makeLclassList,
  makeMclassList,
  makeSclassList,
  makeDangerTaskList,
  getEditInformNote,
  makeNoteDatail,
  makeUserGridDefineList,
  makeSelectProfile,
  makeNoteListExcel,
};
