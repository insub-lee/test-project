import { createSelector } from 'reselect';

const selectInformNote = state => state.get('InformNoteDetailPopup');

const makedangerList = () => createSelector(
  selectInformNote,
  params => params.get('dangerTaskList'),
);

const makepopList = () => createSelector(
  selectInformNote,
  params => params.get('informDetail'),
);

export {
  makedangerList,
  makepopList,
};
