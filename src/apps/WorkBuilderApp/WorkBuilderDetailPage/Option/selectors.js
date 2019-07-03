import { createSelector } from 'reselect';

const selectWorkBuilderDetailOption = state => state.get('work-builder-detail-option');

const makeSelectUseWorkFlow = () =>
  createSelector(
    selectWorkBuilderDetailOption,
    viewState => viewState.get('useWorkFlow'),
  );

const makeSelectUseDynamicWorkFlow = () =>
  createSelector(
    selectWorkBuilderDetailOption,
    viewState => viewState.get('useDynamicWorkFlow'),
  );

export { makeSelectUseWorkFlow, makeSelectUseDynamicWorkFlow };
