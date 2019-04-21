import { createSelector } from 'reselect';

const informNoteCreatePopup = state => state.get('InformNoteListCreatePopup');
const selectUserProfile = state => state.get('auth').get('profile');
const selectInformNote = state => state.get('gridsheet');
const selectAuth = state => state.get('auth');

const makeSdptList = () => createSelector(
  informNoteCreatePopup,
  params => params.get('sdptList'),
);

const makeDownList = () => createSelector(
  informNoteCreatePopup,
  params => params.get('downList'),
);

const makeDownTypeList = () => createSelector(
  informNoteCreatePopup,
  params => params.get('downTypeList'),
);

const makeTotalTimeInformNotePopup = () =>   createSelector(
  informNoteCreatePopup,
  params => params.get('TotalTimeCal'),
);

const makeSelectProfile1 = () => createSelector(
  selectUserProfile,
  // eslint-disable-next-line no-shadow
  selectUserProfile => selectUserProfile,
);
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

// const makeUnitCode = () => createSelector(
//   selectInformNote,
//   params => params.get('unitCode'),
// );

// const makeTypeCode = () => createSelector(
//   selectInformNote,
//   params => params.get('typeCode'),
// );

// const makeCauseCode = () => createSelector(
//   selectInformNote,
//   params => params.get('causeCode'),
// );

// const makePartCode = () => createSelector(
//   selectInformNote,
//   params => params.get('partCode'),
// );

const makeSelectProfile = () => createSelector(
  selectAuth,
  authState => authState.get('profile'),
);

export {
  makeSdptList,
  makeDownList,
  makeDownTypeList,
  makeTotalTimeInformNotePopup,
  makeSelectProfile1,
  makeUnitList,
  makeTypeList,
  makeCauseList,
  makePartList,
  // makeUnitCode,
  // makeTypeCode,
  // makeCauseCode,
  // makePartCode,
  makeSelectProfile,
};

