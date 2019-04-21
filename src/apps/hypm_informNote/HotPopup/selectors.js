import { createSelector } from 'reselect';

const selectHotPop = state => state.get('hotPop');

const makeHotPopDataList = () => createSelector(
  selectHotPop,
  params => params.get('hotPopDataList'),
);

const makeHotPopDataDetailList = () => createSelector(
  selectHotPop,
  params => params.get('hotPopDataDetailList'),
);

const makeTidnList = () => createSelector(
  selectHotPop,
  params => params.get('tidnList'),
);

export {
  makeHotPopDataList,
  makeHotPopDataDetailList,
  makeTidnList,
};
