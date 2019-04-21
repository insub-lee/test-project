import { createSelector } from 'reselect';

const selectColumSetSearch = state => state.get('CommonInformnoteGridColumSetPopup');

const makeUserGridDefineList = () => createSelector(
  selectColumSetSearch,
  params => params.get('userGridDefineList'),
);

const makeResultCode = () => createSelector(
  selectColumSetSearch,
  params => params.get('resultCode'),
);

export {
  makeUserGridDefineList,
  makeResultCode,
};
