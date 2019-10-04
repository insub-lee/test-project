import { createSelector } from 'reselect';

const makeSelectBizBuilderWidgetState = state => state.get('apps-manual-user-BizBuilderWidget-ConfigBizBuilder-reducer');

const makeSelectBizBuilderConfigInfo = () =>
  createSelector(
    makeSelectBizBuilderWidgetState,
    (state, props) => (props && props.item && props.item.id ? props.item.id : (props && props.item && props.item.id) || 11627),
    (state, widgetId) => state.getIn(['BizBuilderWidget', `${widgetId}`, 'BizBuilderConfigInfo', 'data']),
  );

const makeSelectWorkList = () =>
  createSelector(
    makeSelectBizBuilderWidgetState,
    (state, props) => (props && props.item && props.item.id ? props.item.id : (props && props.item && props.item.id) || 11627),
    // (state, widgetId) => state.getIn(['BizBuilderWidget', `${widgetId}`, 'workList']),
    (state, widgetId) => state.getIn(['BizBuilderWidget', `${widgetId}`, 'workList']),
  );

const makeSelectWorkMeta = () =>
  createSelector(
    makeSelectBizBuilderWidgetState,
    (state, props) => (props && props.item && props.item.id ? props.item.id : (props && props.item && props.item.id) || 11627),
    (state, widgetId) => state.getIn(['BizBuilderWidget', `${widgetId}`, 'workMeta']),
  );
export default {
  makeSelectBizBuilderConfigInfo,
  makeSelectWorkList,
  makeSelectWorkMeta,
};
