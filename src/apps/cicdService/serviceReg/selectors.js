import { createSelector } from 'reselect';

const selectServiceReg = state => state.get('cicdServiceReg');

const dupCheck = () => createSelector(
  selectServiceReg,
  params => params.get('dupCheck'),
);

const saveCheck = () => createSelector(
  selectServiceReg,
  params => params.get('saveCheck'),
);

export default {
  dupCheck,
  saveCheck,
};
