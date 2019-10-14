import { createSelector } from 'reselect';

const selectWorkBuilderDetailOption = state => state.get('work-builder-detail-option');

const makeSelectWorkSeq = () =>
  createSelector(
    selectWorkBuilderDetailOption,
    viewState => viewState.get('workSeq'),
  );

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

const makeSelectIsLoading = () =>
  createSelector(
    selectWorkBuilderDetailOption,
    viewState => viewState.get('isLoading'),
  );

const makeSelectWorkFlowInfo = () =>
  createSelector(
    selectWorkBuilderDetailOption,
    viewState => viewState.get('workFlowInfo').toJS(),
  );

const makeSelectUseRevision = () =>
  createSelector(
    selectWorkBuilderDetailOption,
    viewState => viewState.get('useRevision'),
  );

const makeSelectRevisionInfo = () =>
  createSelector(
    selectWorkBuilderDetailOption,
    viewState => viewState.get('revisionInfo').toJS(),
  );

export {
  makeSelectWorkSeq,
  makeSelectUseWorkFlow,
  makeSelectUseDynamicWorkFlow,
  makeSelectIsLoading,
  makeSelectWorkFlowInfo,
  makeSelectUseRevision,
  makeSelectRevisionInfo,
};
