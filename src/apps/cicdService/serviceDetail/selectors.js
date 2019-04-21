import { createSelector } from 'reselect';

const selectServiceDetail = state => state.get('cicdServiceDetail');

const serviceData = () => createSelector(
  selectServiceDetail,
  params => params.get('serviceData'),
);

const updateCheckVal = () => createSelector(
  selectServiceDetail,
  params => params.get('updateCheck'),
);

export default {
  serviceData,
  updateCheckVal,
};
