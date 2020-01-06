import { createSelector } from 'reselect';

const selectWorkBuilderDetailProcessDesigner = state => state.get('work-builder-detail-process-designer');

const makeSelectWorkSeq = () => createSelector(selectWorkBuilderDetailProcessDesigner, viewState => viewState.get('workSeq'));

const makeSelectUseWorkFlow = () => createSelector(selectWorkBuilderDetailProcessDesigner, viewState => viewState.get('useWorkFlow'));

const makeSelectIsLoading = () => createSelector(selectWorkBuilderDetailProcessDesigner, viewState => viewState.get('isLoading'));

const makeSelectWorkFlowInfo = () => createSelector(selectWorkBuilderDetailProcessDesigner, viewState => viewState.get('workFlowInfo').toJS());

const makeSelectWorkFlowInfoConfig = () =>
  createSelector(selectWorkBuilderDetailProcessDesigner, viewState => {
    const config = viewState.getIn(['workFlowInfo', 'CONFIG']);
    return config ? JSON.parse(config) : { info: {} };
  });

export { makeSelectWorkSeq, makeSelectUseWorkFlow, makeSelectIsLoading, makeSelectWorkFlowInfo, makeSelectWorkFlowInfoConfig };
