import { createSelector } from 'reselect';

const selectWorkBuilderDetailInfo = state => state.get('work-builder-detail-info');

const makeSelectInfo = () =>
  createSelector(
    selectWorkBuilderDetailInfo,
    state => state.get('info').toJS(),
  );

export { makeSelectInfo };
