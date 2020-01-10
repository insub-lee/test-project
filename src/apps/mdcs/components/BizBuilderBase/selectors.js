import { createSelector } from 'reselect';

const selectorBizBuilderBase = state => state.get('apps.mdcs.components.BizBuilderBase');

const makeSelectWorkSeq = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'workSeq']) !== undefined ? state.getIn(['bizBuilderBase', id, 'workSeq']) : -1),
  );

const makeSelectWorkSeqById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'workSeq']) !== undefined ? state.getIn(['bizBuilderBase', id, 'workSeq']) : -1,
  );

const makeSelectTaskSeq = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'taskSeq']) !== undefined ? state.getIn(['bizBuilderBase', id, 'taskSeq']) : -1),
  );

const makeSelectTaskSeqById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'taskSeq']) !== undefined ? state.getIn(['bizBuilderBase', id, 'taskSeq']) : -1,
  );

const makeSelectResponseData = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'responseData']) !== undefined ? state.getIn(['bizBuilderBase', id, 'responseData']).toJS() : {}),
  );

const makeSelectExtraApiData = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'extraApiData']) !== undefined ? state.getIn(['bizBuilderBase', id, 'extraApiData']).toJS() : {}),
  );

const makeSelectMetaList = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'metaList']) !== undefined ? state.getIn(['bizBuilderBase', id, 'metaList']).toJS() : []),
  );

const makeSelectFormData = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'formData']) !== undefined ? state.getIn(['bizBuilderBase', id, 'formData']).toJS() : {}),
  );

const makeSelectFormDataById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'formData']) !== undefined ? state.getIn(['bizBuilderBase', id, 'formData']).toJS() : {},
  );

const makeSelectApiArrById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'apiArr']) !== undefined ? state.getIn(['bizBuilderBase', id, 'apiArr']).toJS() : {},
  );

const makeSelectWorkFlowConfig = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id) => {
      const config = state.getIn(['bizBuilderBase', id, 'workFlow', 'CONFIG']);
      return config ? JSON.parse(config) : { info: {} };
    },
  );

const makeSelectRevisionHistory = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'revisionHistory']) !== undefined ? state.getIn(['bizBuilderBase', id, 'revisionHistory']).toJS() : []),
  );

const makeSelectValidationDataById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'validationData']) !== undefined ? state.getIn(['bizBuilderBase', id, 'validationData']).toJS() : {},
  );

const makeSelectProcessRule = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'processRule']) !== undefined ? state.getIn(['bizBuilderBase', id, 'processRule']).toJS() : {}),
  );

const makeSelectProcessRuleById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'processRule']) !== undefined ? state.getIn(['bizBuilderBase', id, 'processRule']).toJS() : {},
  );

const makeSelectLoading = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'isLoading']) !== undefined ? state.getIn(['bizBuilderBase', id, 'isLoading']) : true),
  );

const makeSelectDraftProcess = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.id ? props.id : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'draftProcess']) !== undefined ? state.getIn(['bizBuilderBase', id, 'draftProcess']).toJS() : []),
  );

export {
  makeSelectWorkSeq,
  makeSelectWorkSeqById,
  makeSelectTaskSeq,
  makeSelectTaskSeqById,
  makeSelectResponseData,
  makeSelectExtraApiData,
  makeSelectMetaList,
  makeSelectFormData,
  makeSelectFormDataById,
  makeSelectApiArrById,
  // makeSelectColumns,
  // makeSelectList,
  // makeSelectBoxes,
  // makeSelectFormStuffs,
  makeSelectWorkFlowConfig,
  makeSelectRevisionHistory,
  makeSelectValidationDataById,
  makeSelectProcessRule,
  makeSelectProcessRuleById,
  makeSelectLoading,
  makeSelectDraftProcess,
};
