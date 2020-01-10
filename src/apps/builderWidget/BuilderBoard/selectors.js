import { createSelector } from 'reselect';

const selectWorkBuilderDetailPage = state => state.get('apps.BuilderWidget.BuilderBoard');

const makeSelectColumns = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : -1),
    (state, widgetId) => (state.getIn(['builderList', widgetId, 'columns']) !== undefined ? state.getIn(['builderList', widgetId, 'columns']).toJS() : []),
  );

const makeSelectList = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : -1),
    (state, widgetId) => (state.getIn(['builderList', widgetId, 'list']) !== undefined ? state.getIn(['builderList', widgetId, 'list']).toJS() : []),
  );

const makeSelectBoxes = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : -1),
    (state, widgetId) => (state.getIn(['builderList', widgetId, 'boxes']) !== undefined ? state.getIn(['builderList', widgetId, 'boxes']).toJS() : []),
  );

const makeSelectFormStuffs = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : -1),
    (state, widgetId) =>
      state.getIn(['builderList', widgetId, 'formStuffs']) !== undefined ? state.getIn(['builderList', widgetId, 'formStuffs']).toJS() : [],
  );

const makeSelectWorkFlow = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : -1),
    (state, widgetId) => (state.getIn(['builderList', widgetId, 'workFlow']) !== undefined ? state.getIn(['builderList', widgetId, 'workFlow']).toJS() : {}),
  );

const makeSelectWorkFlowConfig = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => {
      const config = state.getIn(['workFlow', 'CONFIG']);
      return config ? JSON.parse(config) : { info: {} };
    },
  );

const makeSelectIsOpenFormModal = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : -1),
    (state, widgetId) =>
      state.getIn(['builderList', widgetId, 'isOpenFormModal']) !== undefined ? state.getIn(['builderList', widgetId, 'isOpenFormModal']) : false,
  );

const makeSelectIsOpenEditModal = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : -1),
    (state, widgetId) =>
      state.getIn(['builderList', widgetId, 'isOpenEditModal']) !== undefined ? state.getIn(['builderList', widgetId, 'isOpenEditModal']) : false,
  );

const makeSelectWorkSeq = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : -1),
    (state, widgetId) => (state.getIn(['builderList', widgetId, 'workSeq']) !== undefined ? state.getIn(['builderList', widgetId, 'workSeq']) : -1),
  );

const makeSelectWorkSeqByWidgetId = widgetId =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => (state.getIn(['builderList', widgetId, 'workSeq']) !== undefined ? state.getIn(['builderList', widgetId, 'workSeq']) : -1),
  );
const makeSelectTaskSeq = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : -1),
    (state, widgetId) => (state.getIn(['builderList', widgetId, 'taskSeq']) !== undefined ? state.getIn(['builderList', widgetId, 'taskSeq']) : -1),
  );

const makeSelectTaskSeqByWidgetId = widgetId =>
  createSelector(
    selectWorkBuilderDetailPage,
    state => (state.getIn(['builderList', widgetId, 'taskSeq']) !== undefined ? state.getIn(['builderList', widgetId, 'taskSeq']) : -1),
  );
const makeSelectResultFormStuffs = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : -1),
    (state, widgetId) =>
      state.getIn(['builderList', widgetId, 'resultFormStuffs']) !== undefined ? state.getIn(['builderList', widgetId, 'resultFormStuffs']).toJS() : [],
  );

const makeSelectSignLineInfo = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : -1),
    (state, widgetId) => (state.getIn(['builderList', widgetId, 'signLineInfo']) !== undefined ? state.getIn(['builderList', widgetId, 'signLineInfo']) : []),
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : -1),
    (state, widgetId) => (state.getIn(['builderList', widgetId, 'isLoading']) !== undefined ? state.getIn(['builderList', widgetId, 'isLoading']) : false),
  );

const makeSelectIsModalLoading = () =>
  createSelector(
    selectWorkBuilderDetailPage,
    (state, props) => (props && props.item && props.item.WIDGET_ID ? props.item.WIDGET_ID : -1),
    (state, widgetId) =>
      state.getIn(['builderList', widgetId, 'isModalLoading']) !== undefined ? state.getIn(['builderList', widgetId, 'isModalLoading']).toJS() : {},
  );

export {
  makeSelectColumns,
  makeSelectList,
  makeSelectBoxes,
  makeSelectFormStuffs,
  makeSelectIsOpenFormModal,
  makeSelectWorkSeq,
  makeSelectWorkSeqByWidgetId,
  makeSelectTaskSeq,
  makeSelectTaskSeqByWidgetId,
  makeSelectIsOpenEditModal,
  makeSelectResultFormStuffs,
  makeSelectWorkFlow,
  makeSelectWorkFlowConfig,
  makeSelectSignLineInfo,
  makeSelectIsLoading,
  makeSelectIsModalLoading,
};
