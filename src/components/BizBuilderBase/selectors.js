import { createSelector } from 'reselect';

const selectorBizBuilderBase = state => state.get('apps.bizmicro.components.BizBuilderBase');
const selectAuth = state => state.get('auth');

const makeSelectWorkSeq = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'workSeq']) !== undefined ? state.getIn(['bizBuilderBase', id, 'workSeq']) : -1),
  );

const makeSelectWorkSeqById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'workSeq']) !== undefined ? state.getIn(['bizBuilderBase', id, 'workSeq']) : -1,
  );

const makeSelectTaskSeq = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'taskSeq']) !== undefined ? state.getIn(['bizBuilderBase', id, 'taskSeq']) : -1),
  );

const makeSelectTaskSeqById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'taskSeq']) !== undefined ? state.getIn(['bizBuilderBase', id, 'taskSeq']) : -1,
  );

const makeSelectResponseData = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'responseData']) !== undefined ? state.getIn(['bizBuilderBase', id, 'responseData']).toJS() : {}),
  );

const makeSelectExtraApiData = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'extraApiData']) !== undefined ? state.getIn(['bizBuilderBase', id, 'extraApiData']).toJS() : {}),
  );

const makeSelectMetaList = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'metaList']) !== undefined ? state.getIn(['bizBuilderBase', id, 'metaList']).toJS() : []),
  );

const makeSelectFormData = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
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
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => {
      const config = state.getIn(['bizBuilderBase', id, 'workFlow', 'CONFIG']);
      return config ? JSON.parse(config) : { info: { PRC_ID: -1 } };
    },
  );

const makeSelectRevisionHistory = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'revisionHistory']) !== undefined ? state.getIn(['bizBuilderBase', id, 'revisionHistory']).toJS() : []),
  );

const makeSelectValidationDataById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'validationData']) !== undefined ? state.getIn(['bizBuilderBase', id, 'validationData']).toJS() : {},
  );

const makeSelectProcessRule = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'processRule']) !== undefined ? state.getIn(['bizBuilderBase', id, 'processRule']).toJS() : {}),
  );

const makeSelectProcessRuleById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'processRule']) !== undefined ? state.getIn(['bizBuilderBase', id, 'processRule']).toJS() : {},
  );

const makeSelectLoading = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'isLoading']) !== undefined ? state.getIn(['bizBuilderBase', id, 'isLoading']) : false),
  );

const makeSelectDraftProcess = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'draftProcess']) !== undefined ? state.getIn(['bizBuilderBase', id, 'draftProcess']).toJS() : []),
  );

const makeSelectList = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'listData']) !== undefined ? state.getIn(['bizBuilderBase', id, 'listData']).toJS() : []),
  );

const makeSelectViewPageData = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) =>
      state.getIn(['bizBuilderBase', id, 'viewPageData']) !== undefined ? state.getIn(['bizBuilderBase', id, 'viewPageData']).toJS() : { viewType: 'LIST' },
  );

const makeSelectViewPageDataById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'viewPageData']) !== undefined ? state.getIn(['bizBuilderBase', id, 'viewPageData']).toJS() : { viewType: 'LIST' },
  );

const makeSelectWorkInfo = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'workInfo']) !== undefined ? state.getIn(['bizBuilderBase', id, 'workInfo']).toJS() : {}),
  );

const makeSelectWorkInfoById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'workInfo']) !== undefined ? state.getIn(['bizBuilderBase', id, 'workInfo']).toJS() : {},
  );

const makeSelectDataLoading = () => createSelector(selectorBizBuilderBase, state => state.get('dataLoading'));

const makeSelectApiListById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'apiList']) !== undefined ? state.getIn(['bizBuilderBase', id, 'apiList']).toJS() : [],
  );

const makeSelectSearchDataById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'searchData']) !== undefined ? state.getIn(['bizBuilderBase', id, 'searchData']).toJS() : {},
  );

const makeSelectListSelectRowKeys = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) =>
      state.getIn(['bizBuilderBase', id, 'listSelectRowKeys']) !== undefined ? state.getIn(['bizBuilderBase', id, 'listSelectRowKeys']).toJS() : [],
  );

const makeSelectListSelectRowKeysById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'listSelectRowKeys']) !== undefined ? state.getIn(['bizBuilderBase', id, 'listSelectRowKeys']).toJS() : [],
  );

const makeSelectConditionalById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'conditional']) !== undefined ? state.getIn(['bizBuilderBase', id, 'conditional']) : '',
  );

const makeSelectIsBuilderModal = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => state.getIn(['bizBuilderBase', id, 'isBuilderModal']),
  );

const makeSelectBuilderModalSetting = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => state.getIn(['bizBuilderBase', id, 'builderModalSetting']),
  );

const makeSelectViewProcessList = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'viewProcessList']) !== undefined ? state.getIn(['bizBuilderBase', id, 'viewProcessList']).toJS() : []),
  );

const makeSelectViewSeq = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => state.getIn(['bizBuilderBase', id, 'viewSeq']) || -1,
  );

const makeSelectViewLayer = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'viewLayer']) !== undefined ? state.getIn(['bizBuilderBase', id, 'viewLayer']).toJS() : []),
  );

const makeSelectIsSaveModalClose = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => state.getIn(['bizBuilderBase', id, 'isSaveModalClose']),
  );

const makeSelectDraftInfo = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'draftInfo']) ? state.getIn(['bizBuilderBase', id, 'draftInfo']).toJS() : {}),
  );

const makeSelectFieldSelectData = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => (state.getIn(['bizBuilderBase', id, 'fieldSelectData']) !== undefined ? state.getIn(['bizBuilderBase', id, 'fieldSelectData']).toJS() : {}),
  );

const makeSelectIsTaskFavorite = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => state.getIn(['bizBuilderBase', id, 'isTaskFavorite']) || false,
  );

const makeSelectListTotalCnt = () =>
  createSelector(
    selectorBizBuilderBase,
    (state, props) => (props && props.sagaKey ? props.sagaKey : -1),
    (state, id) => state.getIn(['bizBuilderBase', id, 'listTotalCnt']) || 0,
  );

const makeSelectRelTypeById = id =>
  createSelector(selectorBizBuilderBase, state =>
    state.getIn(['bizBuilderBase', id, 'relType']) !== undefined ? state.getIn(['bizBuilderBase', id, 'relType']) : 1,
  );

// auth
const makeSelectProfile = () => createSelector(selectAuth, authState => authState.get('profile'));

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
  makeSelectList,
  // makeSelectBoxes,
  // makeSelectFormStuffs,
  makeSelectWorkFlowConfig,
  makeSelectRevisionHistory,
  makeSelectValidationDataById,
  makeSelectProcessRule,
  makeSelectProcessRuleById,
  makeSelectLoading,
  makeSelectDraftProcess,
  makeSelectViewPageData,
  makeSelectViewPageDataById,
  makeSelectWorkInfo,
  makeSelectDataLoading,
  makeSelectWorkInfoById,
  makeSelectApiListById,
  makeSelectSearchDataById,
  makeSelectListSelectRowKeys,
  makeSelectListSelectRowKeysById,
  makeSelectConditionalById,
  makeSelectIsBuilderModal,
  makeSelectBuilderModalSetting,
  makeSelectViewProcessList,
  makeSelectViewSeq,
  makeSelectViewLayer,
  makeSelectIsSaveModalClose,
  makeSelectDraftInfo,
  makeSelectFieldSelectData,
  makeSelectIsTaskFavorite,
  makeSelectProfile,
  makeSelectListTotalCnt,
  makeSelectRelTypeById,
};
