import { createSelector } from 'reselect';

const selectInformNote = state => state.get('DelayCausePopup');

const makedangerList = () => createSelector(
  selectInformNote,
  params => params.get('dangerTaskList'),
);

const makepopList = () => createSelector(
  selectInformNote,
  params => params.get('delayCauseDetail'),
);

export {
  makedangerList,
  makepopList,
};
