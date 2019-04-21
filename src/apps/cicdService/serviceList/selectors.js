import { createSelector } from 'reselect';

const serviceList = state => state.get('serviceList');

const makeDataList = () => createSelector(
  serviceList,
  params => params.get('dataList'),
);

export default {
  makeDataList,
};
