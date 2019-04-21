import { createSelector } from 'reselect';

const selectInformNote = state => state.get('gridsheet');
const selectAuth = state => state.get('auth');

const makeUnitList = () => createSelector(
  selectInformNote,
  params => params.get('unitList'),
);

const makeTypeList = () => createSelector(
  selectInformNote,
  params => params.get('typeList'),
);

const makeCauseList = () => createSelector(
  selectInformNote,
  params => params.get('causeList'),
);

const makePartList = () => createSelector(
  selectInformNote,
  params => params.get('partList'),
);

const makeUnitCode = () => createSelector(
  selectInformNote,
  params => params.get('unitCode'),
);

const makeTypeCode = () => createSelector(
  selectInformNote,
  params => params.get('typeCode'),
);

const makeCauseCode = () => createSelector(
  selectInformNote,
  params => params.get('causeCode'),
);

const makePartCode = () => createSelector(
  selectInformNote,
  params => params.get('partCode'),
);

const makeSelectProfile = () => createSelector(
  selectAuth,
  authState => authState.get('profile'),
);

const makeUpdateRepairList = () => createSelector(
  selectInformNote,
  params => params.get('updateRepairList'),
);

const makeDeleteRepairList = () => createSelector(
  selectInformNote,
  params => params.get('deleteRepairList'),
);

const makeUpdateTechSafeList = () => createSelector(
  selectInformNote,
  params => params.get('updateTechSafeList'),
);

const makeDeleteTechSafeList = () => createSelector(
  selectInformNote,
  params => params.get('deleteTechSafeList'),
);

const makeUpdateSafeWorkList = () => createSelector(
  selectInformNote,
  params => params.get('updateSafeWorkList'),
);

const makeDeleteSafeWorkList = () => createSelector(
  selectInformNote,
  params => params.get('deleteSafeWorkList'),
);

const makeSearchUnitList = () => createSelector(
  selectInformNote,
  params => params.get('searchUnitList'),
);

const makeSearchTypeList = () => createSelector(
  selectInformNote,
  params => params.get('searchTypeList'),
);

const makeSearchCauseList = () => createSelector(
  selectInformNote,
  params => params.get('searchCauseList'),
);

const makeSearchPartList = () => createSelector(
  selectInformNote,
  params => params.get('searchPartList'),
);

const makeSafeWorkPopData = () => createSelector(
  selectInformNote,
  params => params.get('safeWorkPopData'),
);

const makeBtnType = () => createSelector(
  selectInformNote,
  params => params.get('btnType'),
);

export {
  makeUnitList,
  makeTypeList,
  makeCauseList,
  makePartList,
  makeUnitCode,
  makeTypeCode,
  makeCauseCode,
  makePartCode,
  makeSelectProfile,
  makeUpdateRepairList,
  makeDeleteRepairList,
  makeUpdateTechSafeList,
  makeDeleteTechSafeList,
  makeUpdateSafeWorkList,
  makeDeleteSafeWorkList,
  makeSearchUnitList,
  makeSearchTypeList,
  makeSearchCauseList,
  makeSearchPartList,
  makeSafeWorkPopData,
  makeBtnType,
};
