import { createSelector } from 'reselect';

const selectInformNote = state => state.get('gridsheet');

const makeTechSafeDetail = () => createSelector(
  selectInformNote,
  params => params.get('techSafeDetail'),
);

export {
  makeTechSafeDetail,
};
