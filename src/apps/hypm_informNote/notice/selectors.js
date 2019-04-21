import { createSelector } from 'reselect';

const selectPmsheet = state => state.get('gridsheet');

const makeInformNoticeList = () => createSelector(
  selectPmsheet,
  params => params.get('informNoteDataList'),
);
const makeInformList = () => createSelector(
  selectPmsheet,
  params => params.get('informNoteDataList'),
);


export {
  makeInformList,
  makeInformNoticeList,
};
