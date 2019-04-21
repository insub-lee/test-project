import { createSelector } from 'reselect';

const selectApl = state => state.get('menuapplypage');

const makeApplyStatus = () => createSelector(
  selectApl,
  menupage => menupage.get('success'),
);

export {
  selectApl,
  makeApplyStatus,
};
