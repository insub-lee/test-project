import { createSelector } from 'reselect';

const selectSample = state => state.get('sample');

const makeSelectSetStart = () => createSelector(
  selectSample,
  sampleState => sampleState.get('setStart'),
);

const makeSelectSetFakelist1 = () => createSelector(
  selectSample,
  sampleState => sampleState.get('setFakelist1').toJS(),
);

export {
  selectSample,
  makeSelectSetStart,
  makeSelectSetFakelist1,
};
