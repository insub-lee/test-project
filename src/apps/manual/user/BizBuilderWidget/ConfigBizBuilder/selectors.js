import { createSelector } from 'reselect';

const makeSelectBizBuilderWidgetState = state => state.get('apps-manual-user-BizBuilderWidget-ConfigBizBuilder-reducer');

const makeSelectBizBuilderConfigInfo = () =>
  createSelector(
    makeSelectBizBuilderWidgetState,
    state => state.getIn(['BizBuilderWidget', 'BizBuilderConfigInfo', 'data']),
  );

const makeSelectWorkList = () =>
  createSelector(
    makeSelectBizBuilderWidgetState,
    state => state.getIn(['BizBuilderWidget', 'workList']),
  );
export default {
  makeSelectBizBuilderConfigInfo,
  makeSelectWorkList,
};
