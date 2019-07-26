import { createSelector } from 'reselect';
const makeSelectStateCSManualList = state => state.get('apps-manual-user-CSManualList-reducer');

const makeSelectCSManualList = () =>
  createSelector(
    makeSelectStateCSManualList,
    state => state.get('totalManualList'),
  );

export default {
  makeSelectCSManualList,
};
