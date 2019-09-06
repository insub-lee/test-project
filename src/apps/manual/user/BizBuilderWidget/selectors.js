import { createSelector } from 'reselect';

const makeSelectBizBuilderWidgetState = state => state.get('apps-manual-user-BizBuilderWidget-reducer');

const makeSelectBizBuilderList = () =>
  createSelector(
    makeSelectBizBuilderWidgetState,
    (state, props) => (props && props.item && props.item.id ? props.item.id : (props && props.item && props.item.id) || 11128),
    (state, widgetId) => state.getIn(['BizBuilderWidget', `${widgetId}`, 'bizBuilderList']),
  );

const makeSelectBizBuilderConfigInfo = () =>
  createSelector(
    makeSelectBizBuilderWidgetState,
    (state, props) => (props && props.item && props.item.id ? props.item.id : (props && props.item && props.item.id) || 11128),
    (state, widgetId) => state.getIn(['BizBuilderWidget', `${widgetId}`, 'ConfigInfo']),
  );

const makeSelectBizBuilderViewInfo = () =>
  createSelector(
    makeSelectBizBuilderWidgetState,
    (state, props) => (props && props.item && props.item.id ? props.item.id : (props && props.item && props.item.id) || 11128),
    (state, widgetId) => state.getIn(['BizBuilderWidget', `${widgetId}`, 'viewInfo']),
  );
export default {
  makeSelectBizBuilderList,
  makeSelectBizBuilderConfigInfo,
  makeSelectBizBuilderViewInfo,
};
